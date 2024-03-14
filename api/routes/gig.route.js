import express from "express";
import { verifyToken } from "../middelware/jwt.js";
import {
  createGig,
  deleteGig,
  getAllGig,
  getGig,
  myGig,
} from "../controller/gig.controller.js";
const router = express.Router();
router.post("/createGig", verifyToken, createGig);
router.delete("/deleteGig/:id", verifyToken, deleteGig);
router.get("/singleGig/:id", getGig);
router.get("/myGig/:id", myGig);
router.get("/getAllGig", getAllGig);
export default router;
