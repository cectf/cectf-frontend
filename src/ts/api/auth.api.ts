import api from "api/api";
import { store } from "state";

interface AuthResponse {
  succeeded: boolean;
  message?: string;
}

async function login(
  username: string,
  password: string
): Promise<AuthResponse> {
  return api
    .post("/api/login", {
      username: username,
      password: password,
      csrf_token: store.getState().csrf
    })
    .then(response => {
      if (!response.ok) {
        return { succeeded: false, message: "Login Failed!" };
      }
      return { succeeded: true };
    });
}

async function logout(): Promise<void> {
  return api.get("/api/logout").then();
}

async function register(
  email: string,
  username: string,
  password: string
): Promise<AuthResponse> {
  return api
    .post("/api/register", {
      email: email,
      username: username,
      password: password,
      csrf_token: store.getState().csrf
    })
    .then(response => {
      if (!response.ok) {
        return { succeeded: false, message: "Registration Failed!" };
      }
      return { succeeded: true };
    });
}

export default { login, logout, register };
