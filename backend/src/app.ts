import express from "express";
import vendhingMachineRoutes from "./routes/vendingMachine.routes";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());

app.use("/api", vendhingMachineRoutes);
app.use("/api/user-balance", userRoutes);

export default app;
