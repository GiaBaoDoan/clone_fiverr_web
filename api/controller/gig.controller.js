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
  const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
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
export const saveLoveList = async (req, res, next) => {
  try {
    const item = await Gig.findOne({ _id: req.params.id });
    const user = await User.findOne({ _id: req.body.userId });
    const userLoveList = [...user.myLoveList];
    const newLoveList = [...item.loveSave];
    const gigIndex = newLoveList.findIndex((item) => item === req.body.userId);
    const userIndex = userLoveList.findIndex((item) => item === req.params.id);
    if (gigIndex === -1) {
      newLoveList.push(req.body.userId);
    } else {
      newLoveList.splice(gigIndex, 1);
    }
    if (userIndex === -1) {
      userLoveList.push(req.params.id);
    } else {
      userLoveList.splice(userIndex, 1);
    }
    const saveLoveList = await Gig.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          loveSave: newLoveList,
        },
      },
      {
        new: true,
        timestamps: false,
      }
    );
    const updateUser = await User.findOneAndUpdate(
      {
        _id: req.body.userId,
      },
      {
        $set: {
          myLoveList: userLoveList,
        },
      },
      {
        new: true,
        timestamps: false,
      }
    );
    return res.status(200).send(updateUser);
  } catch (err) {
    next(err);
  }
};
