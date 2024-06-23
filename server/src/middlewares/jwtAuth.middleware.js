import { verifyJwtToken } from "../config/JWTConfig.js";
import ApiResponse from "../utils/ApiResponse.js";
import { AppError } from "../utils/AppError.js";

export const authenticateJwt = async (req, res, next) => {
  // get cookies
  const token = req.headers["authorization"] || req.cookies["accessToken"];
  try {
    if (!token) {
      throw new AppError("Access token is missing", 401);
    }
    const decoded = await verifyJwtToken(token.split(" ")[1]); // Assuming 'Bearer <token>' format
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
