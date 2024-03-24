import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import stripe, { Stripe } from "stripe";
export const createOrder = async (req, res, next) => {
  const gig = await Gig.findById(req.params.id);
  try {
    return res.status(200).send("Create order Successfully");
  } catch (err) {
    next(err);
  }
};

export const getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.payload.isSeller
        ? { sellerId: req.payload.id }
        : { buyerId: req.payload.id }),
      isCompleted: true,
    });
    return res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
export const intent = async (req, res, next) => {
  const stripe = new Stripe(
    "sk_test_51Om99hBwETQT04KZx50j1dBX3WJGc7P9mKG5cUMzViEZHekmAvkhNx4KMv12z0vcD8DAZ0B9SGc6RL1lrfl6gBKf00zeOEF1mW"
  );
  const gig = await Gig.findById(req.params.id);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.payload.id,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  });
  await newOrder.save();
  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};
export const comfirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};
