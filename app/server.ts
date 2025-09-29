import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";

const port = 5000;
let server: Server;

async function startServer() {
  try {
    await mongoose.connect("mongodb://localhost:27017/assignment-3");
    server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
