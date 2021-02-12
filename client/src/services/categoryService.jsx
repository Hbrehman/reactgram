import httpService from "./httpService";
import { apiUrl } from "../config.json";

export async function getCategories() {
  return httpService.get(`${apiUrl}/categories`);
}
