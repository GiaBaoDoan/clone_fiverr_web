import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";
import { createError } from "../untils/createError.js";
export const createReview = async (req, res, next) => {
  //  if seller can create new review
  if (req.payload.isSeller) {
    return res.status(403).send("Sellers can't create review");
  }
  console.log(req.body);
  const newReview = new Review({
    userId: req.payload.id,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });
  try {
    // check if your review exist in this gig you can't create more
    const review = await Review.findOne({
      gigId: req.body.id,
      userId: req.payload.userId,
    });
    if (review) {
      next(createError(403, "You created review for this gig"));
    }
    const saveReviews = await newReview.save();
    res.status(201).send(saveReviews);
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.stars, starNumber: 1 },
    });
  } catch (err) {
    next(err);
  }
};
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.id });
    return res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
    if (req.payload.id !== req.params.userId)
      return next(createError(403, "You can just delete yout review !!"));
    await Review.deleteMany({
      gigId: req.params.gigId,
      userId: req.params.userId,
    });
    return res.status(200).send("Deleted your comment !!");
  } catch (err) {
    next(err);
  }
};
export const addLike = async (req, res, next) => {
  try {
    const reviews = await Review.findOne({
      ...req.params,
    });
    const likes = [...reviews.likes];
    const dislikes = [...reviews.dislike];
    const check = dislikes.indexOf(req.payload.id);
    if (check !== -1) {
      dislikes.splice(check, 1);
    }
    const index = likes.findIndex((i) => {
      return i === req.payload.id;
    });
    if (index === -1) {
      likes.push(req.payload.id);
    } else {
      likes.splice(index, 1);
    }
    await Review.updateOne(
      {
        ...req.params,
      },
      {
        likes: likes,
        dislike: dislikes,
      }
    );
    return res.status(200).send("Ok");
  } catch (err) {
    next(err);
  }
};
export const dislike = async (req, res, next) => {
  // check if like then remove like and add dislike
  try {
    const reviews = await Review.findOne({
      ...req.params,
    });
    const dislikes = [...reviews.dislike];
    const likes = [...reviews.likes];
    const index = dislikes.findIndex((i) => {
      return i === req.payload.id;
    });
    const check = likes.indexOf(req.payload.id);
    if (check !== -1) {
      likes.splice(check, 1);
    }
    if (index === -1) {
      dislikes.push(req.payload.id);
    } else {
      dislikes.splice(index, 1);
    }
    await Review.updateOne(
      {
        ...req.params,
      },
      {
        dislike: dislikes,
        likes: likes,
      }
    );
    return res.status(200).send("isOke");
  } catch (err) {
    next(err);
  }
};
export const replyComment = async (req, res, next) => {
  // check if yoyu are the owner of this gig only u can reply the review and just reply onece
  try {
    const gig = await Gig.findById(req.params.gigId);
    if (gig.userId !== req.payload.id)
      return next(createError(403, "Just own this gig can reply"));
    const review = await Review.findOneAndUpdate(
      {
        ...req.params,
      },
      {
        replyByOwner: req.body.desc,
      }
    );
    return res.status(200).send("ok");
  } catch (err) {
    next(err);
  }
};
export const editComment = async (req, res, next) => {
  try {
    if (req.payload.id !== req.params.userId)
      return next(createError(403, "You just update your comment !!"));
    const updateReview = await Review.findOneAndUpdate(
      {
        ...req.params,
      },
      {
        desc: req.body.desc,
        star: req.body.star,
      }
    );
    await updateReview.save();
    return res.status(200).send("Update successfully !!");
  } catch (err) {
    next(err);
  }
};
