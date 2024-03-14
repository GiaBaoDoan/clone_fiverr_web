import express from "express";
import {
  login,
  logout,
  register,
  resetPassword,
} from "../controller/auth.controller.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/reset-password", resetPassword);
router.post("/logout", logout);
export default router;
