export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:4000";

export const PATH_PREFIX = "/api/v1";
export const TEST_API_1 = BACKEND_URL + PATH_PREFIX + "/TEST";
export const LOGIN_API = BACKEND_URL + PATH_PREFIX + "/login";
export const SIGN_UP = BACKEND_URL + PATH_PREFIX + "/signup";
export const USER_INFO = BACKEND_URL + PATH_PREFIX + "/user";
export const GENERATE_FORGOT_PASSWORD_LINK = BACKEND_URL + PATH_PREFIX + "/generateForgotPasswordLink";
export const RESET_PASSWORD = BACKEND_URL + PATH_PREFIX + "/resetPassword";
