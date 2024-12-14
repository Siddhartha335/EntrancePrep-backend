import prisma from "../utils/db.js";

export async function checkDatabaseConnection() {
    try {
        await prisma.$connect();
        console.log("Database connected");
    } catch(error) {
        console.log(`Error connecting to database: ${error}`);
    } finally {
        await prisma.$disconnect();
    }
}