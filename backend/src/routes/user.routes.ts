import route from "express";
import {
  getUserBalance,
  updateUserBalance,
} from "../controllers/user.controller";

const router = route.Router();

router.get("", getUserBalance);
router.patch("", updateUserBalance);

export default router;
