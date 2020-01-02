import api from "@cectf/api/api";
import { store } from "@cectf/state";

/**
 * Performs a login. The session token will be updated by the server to reflect this.
 * 
 * @param username the username/email to log in with. Both are accepted by the server.
 * @param password the password to log in with
 */
async function login(username: string, password: string): Promise<void> {
  return api
    .post("/api/auth/login", {
      username: username,
      password: password,
      csrf_token: store.getState().csrf
    })
    .then();
}

/**
 * Performs a logout. The session token will be updated by the server to reflect this.
 */
async function logout(): Promise<void> {
  return api.get("/api/auth/logout").then();
}

/**
 * Registers a new user. After registration the user will be logged in just as if `login` had been called.
 * 
 * @param email the email of the new user
 * @param username the username of the new user
 * @param password the password of the new user
 */
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
    .then();
}

export default { login, logout, register };
