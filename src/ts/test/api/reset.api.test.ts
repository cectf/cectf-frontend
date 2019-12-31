import resetApi from "@cectf/api/reset.api";

import fetchMock = require("fetch-mock");

afterEach(() => {
  fetchMock.reset();
});

it("resetDatabase testing environment", async () => {
  fetchMock.getOnce("/api/test/reset", 204);

  expect.assertions(2);
  return resetApi.resetDatabase()
    .then(() => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/test/reset");
    });
});

it("resetDatabase production environment", async () => {
  fetchMock.getOnce("/api/test/reset", 400);

  expect.assertions(2);
  return resetApi.resetDatabase()
    .then(() => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/test/reset");
    });
});
