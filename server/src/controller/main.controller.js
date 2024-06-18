import ApiResponse from "../utils/ApiResponse.js";
import { AppError } from "../utils/AppError.js";

export const testGetFunction = async (req, res, next) => {
  res.send(new ApiResponse(200, [], "test get function"));
};
