import { Router } from "express";
import {
  getInvertory,
  buyChocolate,
  restockChocolate,
} from "../controllers/vendingMachine.controller";

const router = Router();

router.get("/getInventory", getInvertory);
router.post("/buyChocolate", buyChocolate);
router.post("/restockChocolate", restockChocolate);

export default router;
