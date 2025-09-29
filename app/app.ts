import express, { Application } from "express";
import cors from "cors";
import bookRouter from "./controllers/books.controller";
import borrowRouter from "./controllers/borrow.controller";
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api", bookRouter);
app.use("/api", borrowRouter);

export default app;
