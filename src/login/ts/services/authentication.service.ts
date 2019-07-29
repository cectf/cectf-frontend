import { BehaviorSubject } from "rxjs";
import * as JWT from "jsonwebtoken";
// import cookie from "react-cookies";

//const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
localStorage.getItem("currentUser");
const currentUserSubject = new BehaviorSubject({});

export const authenticationService = {
  login,
  currentUser: currentUserSubject.asObservable()
};

async function login(username: string, password: string): Promise<Response> {
  return await fetch("http://127.0.0.1:5000/auth", {
    method: "POST",
    mode: "same-origin",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ username: username, password: password })
  }).then(async response => {
    if (!response.ok) {
      return Promise.reject("Unauthorized");
    }
    return response.json().then(json => {
      //console.log("Token", json.access_token);
      //console.log(JWT.decode(json.access_token));
      // cookie.save("token", json.access_token);
      return json.access_token;
    });
  });
}
