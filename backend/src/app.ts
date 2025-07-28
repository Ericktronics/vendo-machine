import express from "express";
import vendhingMachineRoutes from "./routes/vendingMachine.routes";

const app = express();
app.use(express.json());

app.use("/api", vendhingMachineRoutes);

export default app;
