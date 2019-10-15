import { store } from "@cectf/state";


const handleError = async function (response: Response): Promise<Response> {
  if (response.status == 500) {
    throw "Request failed due to an internal server error :("
  }
  return response;
}

const get = async function (url: string): Promise<Response> {
  return fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "X-CSRFToken": store.getState().csrf
    }
  }).then(response => {
    return handleError(response);
  });
};

const post = async function (url: string, body: any): Promise<Response> {
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
  }).then(response => {
    return handleError(response);
  });
};

const upload = async function (url: string, file: File): Promise<Response> {
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
  }).then(response => {
    return handleError(response);
  });
};

const deleteHttp = async function (url: string): Promise<Response> {
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
  }).then(response => {
    return handleError(response);
  });
};

export default { get, post, upload, deleteHttp, handleError };
