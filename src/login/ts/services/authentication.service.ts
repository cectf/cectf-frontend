import { BehaviorSubject } from "rxjs";
// import * as JWT from "jsonwebtoken";
// import cookie from "react-cookies";

//const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
//localStorage.getItem("currentUser");
//const currentUserSubject = new BehaviorSubject({});

var config = require("config");

var token = localStorage.getItem("token");

export const authenticationService = {
  login,
  token
  //currentUser: currentUserSubject.asObservable()
};

async function login(username: string, password: string): Promise<Response> {
  return await fetch("/auth", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
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
      localStorage.setItem("token", json.access_token);
      location.pathname = "/app";
      //location.reload();
      return json.access_token;
    });
  });
}
