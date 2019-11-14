import { store, startRequest, finishRequest } from "@cectf/state";


const handleError = async function (response: Response): Promise<Response> {
  if (response.status == 500) {
    throw "internal server error :("
  }
  if (response.status != 204 && response.status != 400) {
    const contentType = response.headers.get("content-type");
    if (!contentType || contentType.indexOf("application/json") === -1) {
      throw "Server did not return a valid response";
    }
  }
  return response;
}

const get = async function (url: string): Promise<Response> {
  store.dispatch(startRequest(url))
  return fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "X-CSRFToken": store.getState().csrf
    }
  }).finally(() => {
    store.dispatch(finishRequest(url));
  }).then(response => {
    return handleError(response);
  });
};

const post = async function (url: string, body: any): Promise<Response> {
  store.dispatch(startRequest(url))
  return fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": store.getState().csrf
    },
    body: JSON.stringify(body)
  }).finally(() => {
    store.dispatch(finishRequest(url));
  }).then(response => {
    return handleError(response);
  });
};

const upload = async function (url: string, file: File): Promise<Response> {
  store.dispatch(startRequest(url))
  var formData = new FormData();
  formData.append("file", file);
  return fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "X-CSRFToken": store.getState().csrf
    },
    body: formData
  }).finally(() => {
    store.dispatch(finishRequest(url));
  }).then(response => {
    return handleError(response);
  });
};

const deleteHttp = async function (url: string): Promise<Response> {
  store.dispatch(startRequest(url))
  return fetch(url, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": store.getState().csrf
    }
  }).finally(() => {
    store.dispatch(finishRequest(url));
  }).then(response => {
    return handleError(response);
  });
};

export default { get, post, upload, deleteHttp };
