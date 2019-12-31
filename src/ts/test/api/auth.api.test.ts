import authApi from "@cectf/api/auth.api";

import fetchMock = require("fetch-mock");

afterEach(() => {
  fetchMock.reset();
});

const email = "email@email.com";
const username = "username";
const password = "password";
const error = "ERROR";

it("login success", async () => {
  fetchMock.postOnce("/api/auth/login",
    { authentication_token: "token" }
  );

  expect.assertions(2);
  return authApi.login(username, password)
    .then(() => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/auth/login");
    });
});

it("login failed with error", async () => {
  fetchMock.postOnce("/api/auth/login",
    { body: { error: error }, status: 400 }
  );

  expect.assertions(3);
  return authApi.login(username, password)
    .catch(actualError => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/auth/login");
      expect(actualError).toEqual(error);
    });
});

it("login failed with malformed JSON", async () => {
  fetchMock.postOnce("/api/auth/login",
    { body: "not json", status: 400 }
  );

  expect.assertions(3);
  return authApi.login(username, password)
    .catch(actualError => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/auth/login");
      expect(actualError).toEqual("error parsing response");
    });
});

it("login failed with incorrect JSON", async () => {
  fetchMock.postOnce("/api/auth/login",
    { body: {}, status: 400 }
  );

  expect.assertions(3);
  return authApi.login(username, password)
    .catch(actualError => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/auth/login");
      expect(actualError).toEqual("weirdly formatted response");
    });
});

it("logout", async () => {
  fetchMock.getOnce("/api/auth/logout", 204);

  expect.assertions(2);
  return authApi.logout()
    .then(() => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/auth/logout");
    });
});

it("register success", async () => {
  fetchMock.postOnce("/api/auth/register",
    { authentication_token: "token" }
  );

  expect.assertions(2);
  return authApi.register(email, username, password)
    .then(() => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/auth/register");
    });
});

it("register failed with error", async () => {
  fetchMock.postOnce("/api/auth/register",
    { body: { error: error }, status: 400 }
  );

  expect.assertions(3);
  return authApi.register(email, username, password)
    .catch(actualError => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/auth/register");
      expect(actualError).toEqual(error);
    });
});

it("register failed with malformed JSON", async () => {
  fetchMock.postOnce("/api/auth/register",
    { body: "not json", status: 400 }
  );

  expect.assertions(3);
  return authApi.register(email, username, password)
    .catch(actualError => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/auth/register");
      expect(actualError).toEqual("error parsing response");
    });
});

it("register failed with incorrect JSON", async () => {
  fetchMock.postOnce("/api/auth/register",
    { body: {}, status: 400 }
  );

  expect.assertions(3);
  return authApi.register(email, username, password)
    .catch(actualError => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/auth/register");
      expect(actualError).toEqual("weirdly formatted response");
    });
});