import api from "@cectf/api/api";
import { store } from "@cectf/state";
import { Popup } from "@cectf/types";

async function login(
  username: string,
  password: string
): Promise<void> {
  return api
    .post("/api/auth/login", {
      username: username,
      password: password,
      csrf_token: store.getState().csrf
    })
    .then(response => {
      if (response.ok) {
        return;
      } else {
        return response.json()
          .catch(error => {
            throw "error parsing response";
          })
          .then(json => {
            if (json.error) {
              throw json.error;
            }
            throw "weirdly formatted response";
          });
      }
    });
}

async function logout(): Promise<void> {
  return api.get("/api/auth/logout").then();
}

async function register(
  email: string,
  username: string,
  password: string
): Promise<void> {
  return api
    .post("/api/auth/register", {
      email: email,
      username: username,
      password: password,
      csrf_token: store.getState().csrf
    })
    .then(response => {
      if (response.ok) {
        return;
      } else {
        return response.json()
          .catch(error => {
            throw "error parsing response";
          }).then(json => {
            if (json.error) {
              throw json.error;
            }
            throw "weirdly formatted response";
          });
      }
    });
}

export default { login, logout, register };
