import api from "@cectf/api/api";
import { store } from "@cectf/state";
import * as actions from "@cectf/state/actions";

import fetchMock = require("fetch-mock");

var dispatch: jest.Mock<any, any>;

beforeEach(() => {
  dispatch = jest.fn();
  store.dispatch = dispatch;
});

afterEach(() => {
  fetchMock.reset();
});

const url = "/api";
const json = { a: "b" };
const notJson = 666;
const error = "ERROR!";
const file: File = { lastModified: 1, name: "name", type: "type", size: 0, slice: () => new Blob() };

const mockResponse = (method: string, response: any) => {
  fetchMock.mock({ method: method, url: url, repeat: 1 },
    () => {
      expect(dispatch.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[0]).toEqual([actions.startRequest(url)]);
      return response;
    });
}

const expectStatusToBe = (status: any) => {
  return (response: Response) => {
    expect(fetchMock.calls().length).toEqual(1);
    expect(fetchMock.calls()[0][0]).toEqual(url);
    expect(response.status).toEqual(status);
    expect(dispatch.mock.calls.length).toEqual(2);
    expect(dispatch.mock.calls[0]).toEqual([actions.startRequest(url)]);
    expect(dispatch.mock.calls[1]).toEqual([actions.finishRequest(url)]);
    return response;
  }
}

const expectJsonToBe = (expectedJson: any) => {
  return async (response: Response) => {
    return response.json()
      .then(actualJson => {
        expect(actualJson).toEqual(json);
        return response;
      });
  }
}

const expectErrorToBe = (expectedError: string) => {
  return (actualError: string) => {
    expect(fetchMock.calls().length).toEqual(1);
    expect(fetchMock.calls()[0][0]).toEqual(url);
    expect(actualError).toEqual(expectedError);
    expect(dispatch.mock.calls.length).toEqual(2);
    expect(dispatch.mock.calls[0]).toEqual([actions.startRequest(url)]);
    expect(dispatch.mock.calls[1]).toEqual([actions.finishRequest(url)]);
    return
  }
}

it("get 204 no content", async () => {
  expect.assertions(8);

  mockResponse("GET", 204);

  return api.get(url)
    .then(expectStatusToBe(204));
});

it("get 200 JSON response", async () => {
  expect.assertions(9);

  mockResponse("GET", json);

  return api.get(url)
    .then(expectStatusToBe(200))
    .then(expectJsonToBe(json));
});

it("get 200 with no JSON", async () => {
  expect.assertions(8);

  mockResponse("GET", 200);

  return api.get(url)
    .catch(expectErrorToBe("Server did not return a valid response"));
});

it("get 400", async () => {
  expect.assertions(8);

  mockResponse("GET", 400);

  return api.get(url)
    .then(expectStatusToBe(400));
});

it("get 400 with JSON", async () => {
  expect.assertions(8);

  mockResponse("GET", { body: json, status: 400 });

  return api.get(url)
    .catch(expectErrorToBe("Error parsing JSON response"));
});

it("get 400 with error in JSON", async () => {
  expect.assertions(8);

  mockResponse("GET", { body: { error: error }, status: 400 });

  return api.get(url)
    .catch(expectErrorToBe(error));
});

it("get 500", async () => {
  expect.assertions(8);

  mockResponse("GET", 500);

  return api.get(url)
    .catch(expectErrorToBe("internal server error :("));
});

it("get 504", async () => {
  expect.assertions(8);

  mockResponse("GET", { status: 504 });

  return api.get(url)
    .catch(expectErrorToBe("Server did not return a valid response"));
});

it("post 204 no content", async () => {
  expect.assertions(8);

  mockResponse("POST", 204);

  return api.post(url, json)
    .then(expectStatusToBe(204));
});

it("post 200 JSON response", async () => {
  expect.assertions(9);

  mockResponse("POST", json);

  return api.post(url, json)
    .then(expectStatusToBe(200))
    .then(expectJsonToBe(json));
});

it("post 400", async () => {
  expect.assertions(8);

  mockResponse("POST", 400);

  return api.post(url, json)
    .then(expectStatusToBe(400));
});

it("delete 204 no content", async () => {
  expect.assertions(8);

  mockResponse("DELETE", 204);

  return api.deleteHttp(url)
    .then(expectStatusToBe(204));
});

it("upload 204 no content", async () => {
  expect.assertions(8);

  mockResponse("POST", 204);

  return api.upload(url, file)
    .then(expectStatusToBe(204));
});
