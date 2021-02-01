import http from "./httpService";
import jwtDecode from "jwt-decode";
import { apiUrl } from "./../config.json";

http.setJwt(getJwt());

export const login = (user) => {
  return http.post(`${apiUrl}/auth`, {
    email: user.username,
    password: user.password,
  });
};

export const loginWithJwt = (jwt) => {
  localStorage.setItem("token", jwt);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  const jwt = localStorage.getItem("token");
  try {
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};

export function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
};
