import api from "api/api";
import state from "state";

async function login(username: string, password: string): Promise<Response> {
  return api.post("/api/login", {
    username: username,
    password: password,
    csrf_token: state.csrf.state
  });
}

async function logout(): Promise<Response> {
  return api.get("/api/logout");
}

async function register(
  email: string,
  username: string,
  password: string
): Promise<Response> {
  return api.post("/api/register", {
    email: email,
    username: username,
    password: password,
    csrf_token: state.csrf.state
  });
}

export default { login, logout, register };
