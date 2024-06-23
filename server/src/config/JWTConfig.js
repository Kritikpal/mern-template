import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const ACCESS_TOKEN_EXPIRES_IN =
  process.env.ACCESS_TOKEN_EXPIRES_IN || "15m";
export const REFRESH_TOKEN_EXPIRES_IN =
  process.env.REFRESH_TOKEN_EXPIRES_IN || "1d";
export const FORGOT_PASSWORD_EXPIRES_IN = "1d";

export const generateJwtToken = async (payload, expiresIn) => {
  try {
    return await jwt.sign(payload, JWT_SECRET, {
      expiresIn: expiresIn,
    });
  } catch (err) {
    throw new Error(`Failed to generate access token: ${err.message}`);
  }
};

export const verifyJwtToken = async (token) => {
  try {
    return await jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AppError(`Failed to verify access token`, 401);
  }
};

export const decodeJwtToken = async (token) => {
  try {
    return await jwt.decode(token);
  } catch (err) {
    throw new Error(`Failed to decode access token: ${err.message}`);
  }
};
