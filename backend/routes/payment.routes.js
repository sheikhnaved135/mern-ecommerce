import { Router } from "express";
import { requireSignIn } from "../middleware/auth.middleware.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);
const router = Router();

router.post("/checkout", async (req, res) => {
  try {
    const { products } = req.body;
    console.log("products from frontend", products);
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(product.price) * 100,
      },
      quantity: product.count,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: process.env.SUCCESS_URL,
      cancel_url: process.env.CANCEL_URL,
    });

    res.status(200).send({
      message: "Payment process initiated",
      success: true,
      id: session.id,
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: "Payment processing failed" });
  }
});

export default router;
