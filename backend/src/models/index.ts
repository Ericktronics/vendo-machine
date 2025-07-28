import sequelize from "../config/database";
import { Chocolate } from "./chocolate.model";
import { UserBalance } from "./userBalance.model";

const db = { sequelize, Chocolate, UserBalance };
export default db;
