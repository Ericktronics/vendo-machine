import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
interface UserBalanceAttributes {
  id?: number;
  cash: number;
}

export class UserBalance
  extends Model<UserBalanceAttributes>
  implements UserBalanceAttributes
{
  public id!: number;
  public cash!: number;
}

UserBalance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cash: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    sequelize,
    modelName: "UserBalance",
    tableName: "user_balance",
    timestamps: false,
  }
);

// Associations
