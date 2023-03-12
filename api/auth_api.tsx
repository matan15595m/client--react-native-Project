import apiClient from "./api_client";
import { registerUser } from "../models/register_model";
import { loginUser } from "../models/auth_model";

const register = async (user: registerUser) => {
  return apiClient.post("/auth/register", user);
};
const login = async (user: loginUser) => {
  return apiClient.post("/auth/login", user);
};
const logout = async (refreshToken: string) => {
  return apiClient.get("/auth/logout", refreshToken);
};
const updateUser = async (userJson: any, accessToken: string) => {
  apiClient.setHeaders({ Authorization: "JWT " + accessToken });
  return apiClient.put("/auth/update", userJson);
};
const getUser = async (userJson: any, accessToken: string) => {
  apiClient.setHeaders({ Authorization: "JWT " + accessToken });
  return apiClient.get("/auth/user", userJson);
};

export default { register, login, logout, updateUser ,getUser};
