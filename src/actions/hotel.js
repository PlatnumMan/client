import axios from "axios";
import { apiUrl } from "../environment";

export const createHotel = async (token, data) =>
  await axios.post(`${apiUrl}/create-hotel`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
