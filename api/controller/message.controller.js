import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const createMessage = async (req, res, next) => {
  try {
    const newMessages = await Message({
      conversationId: req.body.conversationId,
      userId: req.body.userId,
      desc: req.body.desc,
    });
    const saveMessage = await newMessages.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.payload.isSeller,
          readByBuyer: !req.payload.isSeller,
          lastMessage: req.body.desc,
          userId: req.payload.id,
        },
      },
      { new: true }
    );
    return res.status(201).send(saveMessage);
  } catch (err) {
    next(err);
  }
};
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    return res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
};
