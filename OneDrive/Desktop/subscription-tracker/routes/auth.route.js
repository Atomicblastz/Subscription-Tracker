import { Router } from "express";
import { signUp, signIn, logOut } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);

authRouter.post("/sign-in", signIn);

authRouter.post("/logout", logOut);

export default authRouter;
