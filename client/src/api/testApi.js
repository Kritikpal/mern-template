import { TEST_API_1 } from "../constants/backendUrl";
import apiCall from "../utils/apiCall";

export const getTestApiData = async () => {
  const respose = await apiCall(TEST_API_1, "GET");
  return respose;
};
