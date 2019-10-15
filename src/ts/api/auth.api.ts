import api from "@cectf/api/api";
import { store } from "@cectf/state";
import { Popup } from "@cectf/types";

async function login(
  username: string,
  password: string
): Promise<void> {
  return api
    .post("/api/login", {
      username: username,
      password: password,
      csrf_token: store.getState().csrf
    })
    .then(response => {
      if (response.ok) {
        return;
      } else {
        return response.json().then(json => {
          if (json.response.errors.email) {
            throw json.response.errors.email;
          }
          if (json.response.errors.password) {
            throw json.response.errors.password;
          }
          throw "Login failed";
        });
      }
    });
}

async function logout(): Promise<void> {
  return api.get("/api/logout").then();
}

async function register(
  email: string,
  username: string,
  password: string
): Promise<void> {
  return api
    .post("/api/register", {
      email: email,
      username: username,
      password: password,
      csrf_token: store.getState().csrf
    })
    .then(response => {
      if (response.ok) {
        return;
      } else {
        return response.json().then(json => {
          if (json.response.errors.email) {
            throw json.response.errors.email;
          }
          if (json.response.errors.password) {
            throw json.response.errors.password;
          }
          throw "Registration failed";
        });
      }
      return;
    });
}

export default { login, logout, register };
