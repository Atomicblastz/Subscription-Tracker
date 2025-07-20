import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
  try {
    // Destructure only the expected fields from the body for security
    const {
      name,
      price,
      currency,
      frequency,
      category,
      paymentMethod,
      startDate,
    } = req.body;

    const subscription = await Subscription.create({
      name,
      price,
      currency,
      frequency,
      category,
      paymentMethod,
      startDate,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "Content-Type": "application/json",
      },
      retries: 0,
    });

    res.status(201).json({
      success: true,
      data: { subscription, workflowRunId },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscription = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      const error = new Error(
        "You are not authorized to view this subscription"
      );
      error.statusCode = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({
      user: req.params.userId,
    });

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};
