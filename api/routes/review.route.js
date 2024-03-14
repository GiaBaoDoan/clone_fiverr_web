import express from "express";
import {
  addLike,
  createReview,
  deleteReview,
  dislike,
  editComment,
  getReviews,
  replyComment,
} from "../controller/review.controller.js";
import { verifyToken } from "../middelware/jwt.js";
const router = express.Router();
router.post("/createReview", verifyToken, createReview);
router.post("/addLike/:gigId/:userId", verifyToken, addLike);
router.post("/dislike/:gigId/:userId", verifyToken, dislike);
router.post("/reply/:gigId/:userId", verifyToken, replyComment);
router.post("/update/:gigId/:userId", verifyToken, editComment);
router.get("/:id", getReviews);
router.delete("/:gigId/:userId", verifyToken, deleteReview);

export default router;
