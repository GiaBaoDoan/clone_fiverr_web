import express from "express";
import {
  createOrder,
  getAllOrder,
  comfirm,
  intent,
} from "../controller/order.controller.js";
import { verifyToken } from "../middelware/jwt.js";
const router = express.Router();
router.get("/", verifyToken, getAllOrder);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, comfirm);
export default router;
