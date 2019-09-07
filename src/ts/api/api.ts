import state from "state";

const get = async function(url: string): Promise<Response> {
  return fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "X-CSRFToken": state.csrf.state
    }
  });
};

const post = async function(url: string, body: any): Promise<Response> {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": state.csrf.state
    },
    body: JSON.stringify(body)
  });
};

const deleteHttp = async function(url: string): Promise<Response> {
  return fetch(url, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": state.csrf.state
    }
  });
};

export default { get, post, deleteHttp };
