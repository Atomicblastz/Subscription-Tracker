import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => {
  res.send({ message: "Update user details" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ message: "Update user details" });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ message: "Delete user details" });
});

export default userRouter;
