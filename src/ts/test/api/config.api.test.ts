import configApi from "@cectf/api/config.api";
import { Config } from "@cectf/types";

import fetchMock = require("fetch-mock");

afterEach(() => {
  fetchMock.reset();
});

const config: Config = {
  production: true
}

it("getConfig success", async () => {
  fetchMock.getOnce("/api/config/config.json", config);

  expect.assertions(3);
  return configApi.getConfig()
    .then(actualConfig => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/config/config.json");
      expect(actualConfig).toEqual(config);
    });
});

it("getConfig failure", async () => {
  fetchMock.getOnce("/api/config/config.json", 400);

  expect.assertions(3);
  return configApi.getConfig()
    .catch(errorMessage => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/config/config.json");
      expect(errorMessage).toEqual("Failed to get configuration");
    });
});