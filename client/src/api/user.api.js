import {
  GENERATE_FORGOT_PASSWORD_LINK,
  LOGIN_API,
  RESET_PASSWORD,
  SIGN_UP,
  USER_INFO,
} from "../constants/backendUrl";
import apiCall from "../utils/apiCall";
import { setItemInLocalStorage } from "../utils/localStorageUtill";

export const userLogin = async (email, password) => {
  let formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);
  const response = await apiCall(LOGIN_API, "POST", formdata);
  setItemInLocalStorage("accessToken", response.data.accessToken);
  setItemInLocalStorage("refreshToken", response.data.refreshToken);
  return response;
};
export const createUser = async (
  title,
  email,
  password,
  firstName,
  lastName
) => {
  let formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);
  formdata.append("firstName", firstName);
  formdata.append("lastName", lastName);
  formdata.append("title", title);
  const response = await apiCall(SIGN_UP, "POST", formdata);
  setItemInLocalStorage("accessToken", response.data.accessToken);
  setItemInLocalStorage("refreshToken", response.data.refreshToken);
  return response;
};

export const getUserData = async () => {
  return await apiCall(USER_INFO, "GET", null, null, true);
};

export const forgotPassword = async (email) => {
  let formdata = new FormData();
  formdata.append("email", email);
  return await apiCall(GENERATE_FORGOT_PASSWORD_LINK, "POST", formdata);
};
export const resetPassword = async (password,resetPasswordToken) => {
  let formdata = new FormData();
  formdata.append("password", password);
  formdata.append("resetPasswordToken", resetPasswordToken);
  return await apiCall(RESET_PASSWORD, "POST", formdata);
};
