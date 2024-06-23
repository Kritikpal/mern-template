import path from "path";
import User from "../models/UserModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import { AppError } from "../utils/AppError.js";
import { sendEmail } from "../utils/emailUtill.js";
import ejs from "ejs";
import { log } from "console";
import { decodeJwtToken } from "../config/JWTConfig.js";

export const testGetFunction = async (req, res, next) => {
  res.send(new ApiResponse(200, [], "test get function"));
};

export const signupUser = async (req, res, next) => {
  // save the user in database
  const user = new User({
    ...req.body,
  });
  await user.save();
  res.send(
    new ApiResponse(
      201,
      {
        refreshToken: await user.generateRefreshToken(),
        accessToken: await user.generateAccessToken(),
      },
      "User added successfully"
    )
  );
};
export const loginUser = async (req, res, next) => {
  // get the email and password form the request body
  const { email, password } = req.body;
  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found", 400);
  }
  // check if password is correct
  if (!(await user.verifyPassword(password))) {
    throw new AppError("Incorrect password", 401);
  }
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.send(
    new ApiResponse(
      200,
      {
        refreshToken: await user.generateRefreshToken(),
        accessToken: await user.generateAccessToken(),
      },
      "User logged in successfully"
    )
  );
};

export const generateForgotPasswordLink = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    throw new AppError("Email is required", 400);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found", 400);
  }
  const forgotPasswordToken = await user.generateForgotPasswordToken();
  user.resetPasswordToken = forgotPasswordToken;
  const currentDate = new Date();
  const expiryDate = new Date(currentDate.getTime() + 10 * 60 * 1000);
  user.resetPasswordExpires = expiryDate;
  await user.save();
  const forgotPasswordLink = `http://localhost:5173/resetPassword?token=${forgotPasswordToken}`;

  const templatePath = path.resolve("private/resetPasswordEmailTemplate.ejs");
  const forgotPasswordContent = await ejs.renderFile(templatePath, {
    forgotPasswordLink,
  });

  await sendEmail("Password Reset Link", forgotPasswordContent, user.email);
  res.send(new ApiResponse(200, null, "Password reset link sent successfully"));
};

export const resetPassword = async (req, res, next) => {
  const { password, resetPasswordToken } = req.body;
  if (!password || !resetPasswordToken) {
    throw new AppError("Password and resetPasswordToken are required", 400);
  }
  const user = await User.findOne({
    resetPasswordToken,
  });
  if (!user) {
    throw new AppError("Password reset token is invalid or has expired", 400);
  }
  const currentDate = new Date();
  if (currentDate > user.resetPasswordExpires) {
    throw new AppError("Password reset token is invalid or has expired", 400);
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.send(new ApiResponse(200, null, "Password reset successfully"));
};

export const generateAccessTokenFromRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 400);
  }
  const payload = await decodeJwtToken(refreshToken);
  if (!payload) {
    throw new AppError("Invalid refresh token", 400);
  }
  const user = await User.findById(payload._id.toString());
  if (!user) {
    throw new AppError("User not found", 400);
  }
  const accessToken = await user.generateAccessToken();
  res.send(
    new ApiResponse(200, { accessToken }, "Access token generated successfully")
  );
};
