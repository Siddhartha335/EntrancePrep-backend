import express from "express";
import { Request,Response,Express } from "express";
import { checkDatabaseConnection } from "./config/index.js";

const app:Express = express();

const PORT:number = Number(process.env.PORT);

//database connection
checkDatabaseConnection();

app.get("/", (req:Request, res:Response) : void => {
    res.send("Welcome to EntrancePrep Backend API");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});