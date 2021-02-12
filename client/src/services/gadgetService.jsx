import httpService from "./httpService";
import { apiUrl } from "../config.json";

export async function getGadgets() {
  return httpService.get(`${apiUrl}/gadgets`);
}

export async function deleteGadget(gadgetId) {
  return httpService.delete(`${apiUrl}/gadgets/${gadgetId}`);
}

export async function getGadget(gadgetId) {
  return httpService.get(`${apiUrl}/gadgets/${gadgetId}`);
}

export async function saveGadget(gadget) {
  let { _id: gadgetId, ...body } = gadget;
  if (gadgetId) {
    return httpService.put(`${apiUrl}/gadgets/${gadgetId}`, body);
  }

  return httpService.post(`${apiUrl}/gadgets`, body);
}
