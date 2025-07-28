import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface ChocolateAttributes {
  id?: number;
  name: string;
  price: number;
  quantity: number;
}
export class Chocolate
  extends Model<ChocolateAttributes>
  implements ChocolateAttributes
{
  public id!: number;
  public name!: string;
  public price!: number;
  public quantity!: number;
}

Chocolate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    sequelize,
    modelName: "Chocolate",
    tableName: "chocolates",
    timestamps: false,
  }
);
