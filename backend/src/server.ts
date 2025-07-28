import app from "./app";
import { Request, Response } from "express";
import dotenv from "dotenv";
import db from "./models";
import { ResponseBuilder } from "./utils/responseBuilder";

dotenv.config();

const port = process.env.PORT || 3000;
const connectToDB = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log("Connection to PostgreSQL has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectToDB();

app.get("/api/healthcheck", (request: Request, response: Response) => {
  response.status(200).json(ResponseBuilder.success(undefined, "API is running"));
});

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
