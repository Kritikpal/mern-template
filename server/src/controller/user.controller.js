import User from "../models/UserModel.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getUserDetails = async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  res.send(new ApiResponse(200, user, "User fetched successfully"));
};
