import axios from "axios";

const apiCall = async (apiUrl, method, data = null, headers = {}) => {
  const config = {
    method: method,
    url: apiUrl,
    headers: headers,
    data: data,
  };
  const response = await axios(config);
  return response.data;
};

export default apiCall;
