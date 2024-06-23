import { Router } from "express";
import { USER } from "../constants/routeConstants.js";
import { authenticateJwt } from "../middlewares/jwtAuth.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getUserDetails } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.get(USER, authenticateJwt, asyncHandler(getUserDetails));
export default userRouter;