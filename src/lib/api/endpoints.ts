import type { CardDto, LoginRequest, SignupRequest, UserDto } from "../../types/api";
import { apiRequest } from "./client";

export const authApi = {
  signup: (data: SignupRequest) => apiRequest<UserDto>("/users", { method: "POST", body: JSON.stringify(data) }),
  login: (data: LoginRequest) => apiRequest<UserDto>("/users/login", { method: "POST", body: JSON.stringify(data) }),
  me: () => apiRequest<UserDto>("/users/me"),
  logout: () => apiRequest<void>("/users/logout", { method: "POST" }),
};

export const cardsApi = {
  list: () => apiRequest<CardDto[]>("/cards"),
};
