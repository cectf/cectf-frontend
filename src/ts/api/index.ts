import * as State from "state";

export const get = async function(url: string): Promise<Response> {
  return fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "X-CSRFToken": State.csrf.state.csrf_token
    }
  });
};

export const post = async function(url: string, body: any): Promise<Response> {
  console.log("posting with csrf");
  console.log(State.csrf.state.csrf_token);
  return fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": State.csrf.state.csrf_token
    },
    body: JSON.stringify(body)
  });
};
