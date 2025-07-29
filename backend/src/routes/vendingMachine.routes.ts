import { Router } from "express";
import {
  getInvertory,
  buyChocolate,
  restockChocolate,
} from "../controllers/vendingMachine.controller";

const router = Router();

router.get("/getInventory", getInvertory);
router.patch("/buyChocolate", buyChocolate);
router.patch("/restockChocolate", restockChocolate);

export default router;
