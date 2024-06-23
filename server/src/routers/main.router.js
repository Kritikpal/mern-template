import { Router } from "express";
import {
  GENERATE_ACCESSTOKEN_FROM_REFRESHTOKEN,
  GENERATE_FORGOT_PASSWORD_LINK,
  LOGIN,
  RESET_PASSWORD,
  SIGN_UP,
  TEST_API_1,
} from "../constants/routeConstants.js";
import {
  generateAccessTokenFromRefreshToken,
  generateForgotPasswordLink,
  loginUser,
  resetPassword,
  signupUser,
  testGetFunction,
} from "../controller/main.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const mainRouter = Router();
mainRouter.get(TEST_API_1, asyncHandler(testGetFunction));
mainRouter.post(SIGN_UP, asyncHandler(signupUser));
mainRouter.post(LOGIN, asyncHandler(loginUser));
mainRouter.post(
  GENERATE_FORGOT_PASSWORD_LINK,
  asyncHandler(generateForgotPasswordLink)
);
mainRouter.post(RESET_PASSWORD, asyncHandler(resetPassword));
mainRouter.post(
  GENERATE_ACCESSTOKEN_FROM_REFRESHTOKEN,
  asyncHandler(generateAccessTokenFromRefreshToken)
);
export default mainRouter;
