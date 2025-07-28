import { Request, Response } from "express";
import { ResponseBuilder } from "../utils/responseBuilder";
import db from "../models";

export const getInvertory = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const chocolates = await db.Chocolate.findAll();
    if (chocolates.length === 0) {
      response
        .status(404)
        .json(ResponseBuilder.error("No chocolates found", 404));
      return;
    }
    response.status(200).json(ResponseBuilder.success(chocolates));
  } catch (error) {
    response
      .status(500)
      .json(ResponseBuilder.error("Internal server error", 500));
  }
};

export const buyChocolate = async (request: Request, response: Response) => {
  const { chocolateName, cash, quantity } = request.body;

  // Default quantity to 1 if not provided
  const buyQuantity = quantity ?? 1;

  if (!chocolateName || cash === undefined) {
    return response
      .status(400)
      .json(
        ResponseBuilder.badRequest("Chocolate name and cash are required.")
      );
  }

  try {
    const chocolate = await db.Chocolate.findOne({
      where: { name: chocolateName },
    });

    const balance = await db.UserBalance.findOne({ where: { id: 1 } });

    if (!balance) {
      return response
        .status(404)
        .json(ResponseBuilder.notFound("User balance not found"));
    }

    if (!chocolate) {
      return response
        .status(404)
        .json(ResponseBuilder.notFound("Chocolate not found"));
    }

    if (chocolate.quantity < buyQuantity) {
      return response
        .status(400)
        .json(ResponseBuilder.error("Not enough stock available."));
    }

    const totalPrice = Number(chocolate.dataValues.price) * buyQuantity;

    if (cash < totalPrice) {
      return response
        .status(400)
        .json(ResponseBuilder.error("Insufficient cash."));
    }

    const change = cash - totalPrice;

    // Update stock and user balance
    await chocolate.update({
      quantity: chocolate.dataValues.quantity - buyQuantity,
    });

    await chocolate.save();

    await balance!.update({
      cash: Number(balance?.dataValues.cash) - totalPrice,
    });

    await balance!.save();

    return response.status(200).json(
      ResponseBuilder.success({
        message: `Dispensed ${buyQuantity} ${chocolateName}(s)`,
        change: change.toFixed(2),
      })
    );
  } catch (err) {
    console.error(err);
    return response
      .status(500)
      .json(ResponseBuilder.error("Failed to process purchase"));
  }
};

export const restockChocolate = async (
  request: Request,
  response: Response
) => {
  const { chocolateName, quantity } = request.body;

  if (!chocolateName || quantity === undefined) {
    return response
      .status(400)
      .json(
        ResponseBuilder.badRequest("Chocolate name and quantity are required.")
      );
  }

  try {
    const chocolate = await db.Chocolate.findOne({
      where: { name: chocolateName },
    });

    if (!chocolate) {
      return response
        .status(404)
        .json(ResponseBuilder.notFound("Chocolate not found"));
    }

    const newQuantity = Math.min(chocolate.dataValues.quantity + quantity, 10);
    console.log(newQuantity);
    await chocolate.update({ quantity: +newQuantity });
    await chocolate.save();

    return response.json(
      ResponseBuilder.success(
        `${chocolateName} restocked. New quantity: ${newQuantity}.`
      )
    );
  } catch (err) {
    console.error(err);
    return response
      .status(500)
      .json(ResponseBuilder.error("Failed to restock chocolate"));
  }
};
