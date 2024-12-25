import axios from "axios";

const API_URL = "http://localhost:3001/api/interact";

export const sendMessage = async (message: string) => {
  const response = await axios.post(API_URL, { message });
  return response.data.response;
};
