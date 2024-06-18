export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:4000";

export const PATH_PREFIX = "/api/v1";
export const TEST_API_1 = BACKEND_URL + PATH_PREFIX + "/TEST";
