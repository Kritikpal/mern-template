import { Router } from "express";
import { TEST_API_1 } from "../constants/routeConstants.js";
import { testGetFunction } from "../controller/main.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const mainRouter = Router();
mainRouter.get(TEST_API_1, asyncHandler(testGetFunction));
export default mainRouter;
