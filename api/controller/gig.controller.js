import Gig from "../models/gig.model.js";
import User from "../models/user.models.js";
import { createError } from "../untils/createError.js";

export const getAllGig = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  const gigs = await Gig.find(filters).sort({ price: -1 });
  return res.status(200).send(gigs);
};
export const createGig = async (req, res, next) => {
  if (!req.payload.isSeller) {
    return next(createError(403, "Only sellers can create gig"));
  }
  const newGig = new Gig({
    userId: req.payload.id,
    ...req.body,
  });
  try {
    const saveGig = await newGig.save();
    return res.status(200).send("Create sucessfully !!");
  } catch (err) {
    next(err);
  }
};
export const deleteGig = async (req, res, next) => {
  try {
    await Gig.findByIdAndDelete(req.params.id);
    return res.status(200).send("Delete Successfully");
  } catch (err) {
    next(err);
  }
};
export const getGig = async (req, res, next) => {
  const gig = await Gig.findById(req.params.id);
  if (!gig) return next(createError(400, "Gig not found !!"));
  return res.status(200).send(gig);
};
export const myGig = async (req, res, next) => {
  const gig = await Gig.find({ userId: req.params.id });
  if (!gig) return next(createError(400, "Gig not found !!"));
  return res.status(200).send(gig);
};
