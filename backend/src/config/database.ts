import { Sequelize } from "sequelize";
import { config } from "dotenv";

config({
  path: ".env"
});

const sequelize = new Sequelize(
  process.env.DB_TABLE_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: "postgres",
    port: parseInt(process.env.DB_PORT as string, 10) || 5432,
  }
);

export default sequelize;
