import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
  createSubscription,
  getUserSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({ message: "Get all subscriptions" });
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send({ message: "Get subscription details" });
});

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) => {
  res.send({ message: "Update subscriptions" });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ message: "Delete all subscriptions" });
});

subscriptionRouter.get("/user/:userId", authorize, getUserSubscription);

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ message: "Cancel subscriptions" });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ message: "Get upcoming renewals" });
});

export default subscriptionRouter;
