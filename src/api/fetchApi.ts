import axios from "axios";
import { ACCESS_TOKEN, API_BASE_URL } from "../constants";

export const fetchApi = <T>(endpoint: string) => {
  return axios.get<T>(API_BASE_URL + endpoint, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
};
