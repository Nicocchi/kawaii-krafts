import dotenv from "dotenv";
import Stripe from "stripe";
import Product from "../models/productSchema.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const toCents = (value) => {
  return Math.round((Math.abs(value) / 100) * 10000);
};

export const checkout = async (req, res) => {
  try {
    const { cart, customerId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      // ui_mode: "embedded",
      customer: customerId,
      customer_update: {
        shipping: "auto",
      },
      invoice_creation: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      line_items: cart.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product: "prod_PMTMAwe39QQLsP",
            unit_amount: item.price,
          },
          quantity: item.quantity,
        };
      }),
      // return_url: `${process.env.SERVER_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
      success_url: `${process.env.SERVER_URL}/success`,
      cancel_url: `${process.env.SERVER_URL}/cancel`,
    });

    res
      .status(200)
      .json({ success: true, message: "session started", url: session.url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const paymentHistory = async (req, res) => {
  try {
    const paymentIntent = await stripe.invoices.list({
      limit: 10,
      customer: req.params.id,
    });
    
    res
      .status(200)
      .json({
        success: true,
        message: "found payments",
        data: paymentIntent.data,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
