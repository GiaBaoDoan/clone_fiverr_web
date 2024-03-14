import Conversation from "../models/conversation.model.js";
import { createError } from "../untils/createError.js";

export const getConversations = async (req, res, next) => {
  const conversations = await Conversation.find({
    ...(req.payload.isSeller
      ? { sellerId: req.payload.id }
      : { buyerId: req.payload.id }),
  }).sort({ updatedAt: -1 });
  return res.status(200).send(conversations);
};
export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.payload.isSeller
      ? req.payload.id + req.body.to
      : req.body.to + req.payload.id,
    sellerId: req.payload.isSeller ? req.payload.id : req.body.to,
    buyerId: req.payload.isSeller ? req.body.to : req.payload.id,
    readBySeller: req.payload.isSeller,
    readByBuyer: !req.payload.isSeller,
  });
  const saveConversation = await newConversation.save();
  return res.status(201).send(saveConversation);
};
export const updateConversation = async (req, res, next) => {
  try {
    const item = await Conversation.findOne({ id: req.params.id });
    const updatedConversations = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          ...(req.payload.isSeller
            ? { readBySeller: !item.readBySeller }
            : { readByBuyer: !item.readByBuyer }),
        },
      },
      { new: true, timestamps: false }
    );
    return res.status(200).send(updatedConversations);
  } catch (err) {
    next(err);
  }
};
export const getSingleConversation = async (req, res, next) => {
  try {
    const conversations = await Conversation.findOne({ id: req.params.id });
    if (!conversations) return next(createError(404, "conversation not found"));
    return res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};
