import { store, startRequest, finishRequest } from "@cectf/state";

/**
 * Handles any unexpected errors that might have occured during the API request.
 * Any response with status code 200 or 400 is assumed to be valid, while status code 500 is assumed to be invalid.
 * Any a response without those status codes that contains a JSON content-type is assumed to contain some kind of error messaging.
 * Any other response is assumed to be invalid.
 * Invalid responses are handled by throwing a string error message.
 * If the response is valid, it is simply returned in a promise.
 * 
 * Returns a handler that can be used in a `Promise<Response>` chain to wrap up an API request.
 * Every method in this class (GET, POST, DELETE, etc.) should call this method after getting the response.
 * This method will always dispatch a `finishRequest` action so the app is aware the request completed.
 *
 * If the status code is 204, the response is returned.
 * If the status code is 200 and there is no JSON, an error is thrown.
 * If the status code is 400 and there is no JSON, the response is returned so the service calling the API is aware that the response failed intentionally. If there is JSON, an error is thrown. If the JSON includes an error field, that error is thrown instead.
 * If the status code is 500, an error is thrown.
 * Any JSON parsing errors will result in an error.
 * 
 * @param response the response to handle errors on
 */
const handleResponse = function (url: string) {
  return (response: Response) => {
    store.dispatch(finishRequest(url));
    if (response.status == 500) {
      throw "internal server error :("
    }

    if (response.status == 204) {
      return response;
    }

    const contentType = response.headers.get("content-type");
    const hasJson = contentType != null && contentType.indexOf("application/json") !== -1;

    if (response.status == 200) {
      if (hasJson) {
        return response;
      } else {
        throw "Server did not return a valid response";
      }
    }

    if (response.status == 400 && !hasJson) {
      // let the service deal with the error
      return response;
    }

    if (hasJson) {
      return response.json()
        .then(json => {
          if (json.error) {
            throw json.error;
          } else {
            throw "Error parsing JSON response";
          }
        });
    } else {
      throw "Server did not return a valid response";
    }
  }
}

/**
 * Performs a GET request. The CSRF token will be automatically included.
 * 
 * @param url the url to request
 */
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
  }).then(handleResponse(url));
};

/**
 * Performs a POST request with the given body. The CSRF token will be automatically included.
 * 
 * @param url the url to request
 * @param body the object to post
 */
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
  }).then(handleResponse(url));
};

/**
 * Performs a POST request to upload the given file. The CSRF token will be automatically included.
 * 
 * @param url the url to request
 * @param file the file to upload
 */
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
  }).then(handleResponse(url));
};

/**
 * Performs a DELETE request. The CSRF token will be automatically included.
 * This method is not named `delete` because of a naming conflict with the `delete` operator in Javascript.
 * 
 * @param url the url to request
 */
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
  }).then(handleResponse(url));
};

export default { get, post, upload, deleteHttp };
