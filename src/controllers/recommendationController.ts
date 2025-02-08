import { Request,Response } from "express";
import prisma from "../utils/db.js";
import { spawn } from "child_process"; 
import { Prisma } from "@prisma/client";

export async function createRecommendation(req: Request, res: Response) {
    const { user_id } = req.body;
    try {
        // Step 1: Check if the user has taken any tests
        const userTests = await prisma.user_Test.findMany({
            where: { user_id: user_id },
            select: { test_id: true },  // Only fetch test_id
        });

        // If no tests are found, return an error response
        if (userTests.length === 0) {
            return res.status(400).json({ message: "User has not taken any tests." });
        }

        // Step 2: Spawn Python process to generate recommendations
        const pythonScriptPath = '/app/src/scripts/combined_recommendations.py';  // Absolute path
        const pythonProcess = spawn('python3', [pythonScriptPath, user_id]);

        let output = "";

        // Capture the output from Python script
        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        // Handle the end of the Python script execution
        pythonProcess.on('close', async (code) => {
            if (code === 0) {
                // Clean the output to extract the JSON array
                const cleanedOutput = output.replace("Recommended Questions: ", "").trim();
                let recommendedQuestions: number[] = [];

                try {
                    // Step 3: Parse the cleaned output as JSON (list of recommended question IDs)
                    recommendedQuestions = JSON.parse(cleanedOutput);
                } catch (jsonError) {
                    console.error("Error parsing JSON:", jsonError);
                    return res.status(500).json({ message: "Error parsing recommendations data." });
                }

                // If no recommendations are generated, return a message
                if (recommendedQuestions.length === 0) {
                    return res.status(400).json({ message: "No recommendations generated." });
                }

                // Step 4: Insert recommendations into the table, avoiding duplicates
                try {
                    const recommendationPromises = recommendedQuestions.map((question_id: number) => {
                        // SQL query with WHERE NOT EXISTS to prevent duplicate recommendations
                        return prisma.$queryRaw`
                            INSERT INTO "user_recommendations" ("user_id", "question_id", "recommended_on")
                            SELECT ${user_id}::uuid, ${question_id}, CURRENT_TIMESTAMP
                            WHERE NOT EXISTS (
                                SELECT 1
                                FROM "user_recommendations"
                                WHERE "user_id" = ${user_id}::uuid AND "question_id" = ${question_id}
                            )
                        `;
                    });

                    // Execute all insertions in parallel
                    await Promise.all(recommendationPromises);

                    return res.status(200).json({ message: "Recommendations generated and saved successfully." });
                } catch (dbError) {
                    console.error("Error inserting recommendations:", dbError);
                    return res.status(500).json({ message: "Error saving recommendations to the database." });
                }
            } else {
                return res.status(500).json({ message: "Error generating recommendations." });
            }
        });

    } catch (error) {
        console.error("Error in creating recommendation:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}


export async function getRecommendation(req: Request, res: Response): Promise<void> {
    const { user_id } = req.params;
    let recommendedQuestions: number[] = [];
    try {
        // Step 1: Fetch recommended question IDs from user_recommendations using raw SQL
        const fetchedQuestions = await prisma.$queryRaw`
            SELECT question_id
            FROM "user_recommendations"
            WHERE "user_id" = ${user_id}::uuid  -- Cast user_id to UUID
        `;

        // Extract only question_ids (ensure it is an array of integers)
        recommendedQuestions = (fetchedQuestions as any).map((item: { question_id: number }) => item.question_id);

        // If no recommendations are found for the user, return a message
        if (recommendedQuestions.length === 0) {
            res.status(400).json({ message: "No recommendations found for this user." });
            return;
        }

        // Step 2: Get all question details by joining with the questions and categories tables using raw SQL
        // Explicitly cast the array to an integer array using Prisma.sql to avoid jsonb issues
        const questions = await prisma.$queryRaw`
            SELECT 
                q."question_id", 
                q."question_text", 
                q."category_id", 
                q."difficulty_level",
                q."question_type",
                q."answers",
                q."right_answer",
                q."explanation",
                q."marks_of_question",
                q."has_explanation",
                c."name"  -- Category name from the categories table
            FROM "questions" q
            JOIN "categories" c ON c."category_id" = q."category_id"  -- Join categories table on category_id
            WHERE q."question_id" = ANY(${Prisma.sql`ARRAY[${Prisma.join(recommendedQuestions)}]::integer[]`})  -- Explicitly cast to integer[]
        `;

        // If no questions are found, return a message
        if ((questions as any).length === 0) {
            res.status(400).json({ message: "No questions found for the recommended question IDs." });
            return;
        }

        // Step 3: Return the questions details along with category information as the response
        res.status(200).json({ questions });

    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}
