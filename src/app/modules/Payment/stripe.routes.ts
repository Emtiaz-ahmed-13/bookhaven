import express from "express";
import Stripe from "stripe";
// Removed incorrect/unnecessary config import

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

router.post("/create-checkout-session", async (req, res, next) => {
  try {
    const { items, successUrl, cancelUrl, customerEmail } = req.body as {
      items: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
      }>;
      successUrl: string;
      cancelUrl: string;
      customerEmail?: string;
    };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customerEmail,
      line_items: items.map((it) => ({
        price_data: {
          currency: "usd",
          unit_amount: Math.round(it.price * 100),
          product_data: { name: it.name },
        },
        quantity: it.quantity,
      })),
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res
      .status(200)
      .json({ success: true, data: { id: session.id, url: session.url } });
  } catch (err) {
    next(err);
  }
});

// Verify a checkout session's payment status without using webhooks
router.post("/verify", async (req, res, next) => {
  try {
    const { sessionId } = req.body as { sessionId?: string };
    if (!sessionId) {
      return res
        .status(400)
        .json({ success: false, message: "sessionId is required" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const paid = session.payment_status === "paid";

    return res.status(200).json({
      success: true,
      data: {
        paid,
        payment_status: session.payment_status,
        status: session.status,
        id: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
      },
    });
  } catch (err) {
    next(err);
  }
});

export const StripeRoutes = router;
