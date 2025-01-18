import express from "express";
import { Request,Response,Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { checkDatabaseConnection } from "./config/index.js";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddleware.js";
import routes from "./routes/index.js";

const app:Express = express();

const PORT:number = Number(process.env.PORT);

//database connection
checkDatabaseConnection();

//cors
app.use(cors({
    origin: ["http://localhost:3000","http://localhost:3001"],
    methods: ["GET","POST","PUT","DELETE","PATCH"],
    credentials: true
}))

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req:Request, res:Response) : void => {
    res.send("Welcome to EntrancePrep Backend API");
});

app.use("/api/v1",routes)

//error handling and route not found error
app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});