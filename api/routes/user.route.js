import express from "express";
import {
  addMoreInfor,
  deleteUser,
  deletedLan,
  deletedSkill,
  getAllUser,
  getUser,
  updateUser,
} from "../controller/user.controller.js";
import { verifyToken } from "../middelware/jwt.js";
const router = express.Router();
router.delete("/deleteUser/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.put("/:userId", verifyToken, addMoreInfor);
router.delete("/lans/:userId/:id", verifyToken, deletedLan);
router.delete("/skills/:id", verifyToken, deletedSkill);
router.get("/", getAllUser);
export default router;
