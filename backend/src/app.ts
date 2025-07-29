import express from "express";
import cors from "cors";
import vendhingMachineRoutes from "./routes/vendingMachine.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.use("/api", vendhingMachineRoutes);
app.use("/api/user-balance", userRoutes);

export default app;
