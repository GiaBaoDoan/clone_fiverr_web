import express from "express";
import { verifyToken } from "../middelware/jwt.js";
import {
  createGig,
  deleteGig,
  getAllGig,
  getGig,
  myGig,
  saveLoveList,
} from "../controller/gig.controller.js";
const router = express.Router();
router.post("/createGig", verifyToken, createGig);
router.delete("/deleteGig/:id", verifyToken, deleteGig);
router.get("/singleGig/:id", getGig);
router.get("/myGig/:id", myGig);
router.get("/getAllGig", getAllGig);
router.put("/loveList/:id", saveLoveList);

export default router;
