import { Request, Response } from "express";
import { ResponseBuilder } from "../utils/responseBuilder";
import db from "../models";

export const getUserBalance = async (request: Request, response: Response) => {
  try {
    const balance = await db.UserBalance.findOne({ where: { id: 1 } });
    if (!balance) {
      response
        .status(404)
        .json(ResponseBuilder.notFound("User balance not found"));
      return;
    }
    response.status(200).json(ResponseBuilder.success(balance));
  } catch (error) {
    response
      .status(500)
      .json(ResponseBuilder.error("Internal server error", 500));
  }
};

export const updateUserBalance = async (
  request: Request,
  response: Response
) => {
  const { cash } = request.body;

  if (cash === undefined) {
    return response
      .status(400)
      .json(ResponseBuilder.badRequest("Cash amount is required."));
  }

  if (cash < 0) {
    return response
      .status(400)
      .json(ResponseBuilder.badRequest("Cash amount cannot be negative."));
  }

  if (typeof cash !== "number") {
    return response
      .status(400)
      .json(ResponseBuilder.badRequest("Cash amount must be a number."));
  }

  try {
    const balance = await db.UserBalance.findOne({ where: { id: 1 } });

    if (!balance) {
      return response
        .status(404)
        .json(ResponseBuilder.notFound("User balance not found"));
    }

    const existingCash = parseFloat(`${balance.dataValues.cash}`);
    const newCash = existingCash + cash;

    await balance.update({ cash: newCash });
    await balance.save();

    return response
      .status(200)
      .json(ResponseBuilder.success(`User balance updated to ${cash}.`));
  } catch (err) {
    console.error(err);
    return response
      .status(500)
      .json(ResponseBuilder.error("Failed to update user balance"));
  }
};
