import * as log from 'loglevel';
import api from "@cectf/api/config.api";
import services from "@cectf/services";
import { store } from "@cectf/state";
import * as actions from "@cectf/state/actions";
import { Config } from "@cectf/types";


it("updateConfig production", async () => {
  var config: Config = { "production": true };
  
  var getConfig = jest.fn(() => Promise.resolve(config));
  api.getConfig = getConfig;
  var dispatch = jest.fn();
  store.dispatch = dispatch;

  expect.assertions(4);
  return services.config.updateConfig().then(() => {
    expect(getConfig.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0]).toEqual([actions.updateConfig(config)]);
    expect(log.getLevel()).toEqual(3);
  });
});

it("updateConfig not production", async () => {
  var config: Config = { "production": false };
  
  var getConfig = jest.fn(() => Promise.resolve(config));
  api.getConfig = getConfig;
  var dispatch = jest.fn();
  store.dispatch = dispatch;

  expect.assertions(4);
  return services.config.updateConfig().then(() => {
    expect(getConfig.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0]).toEqual([actions.updateConfig(config)]);
    expect(log.getLevel()).toEqual(1);
  });
});

it("updateConfig error", async () => {
  var error = "error!";
  
  var getConfig = jest.fn(() => Promise.reject(error));
  api.getConfig = getConfig;
  var popupError = jest.fn();
  services.popup.error = popupError;

  expect.assertions(4);
  return services.config.updateConfig().then(() => {
    expect(getConfig.mock.calls.length).toEqual(1);
    expect(popupError.mock.calls.length).toEqual(1);
    expect(popupError.mock.calls[0]).toEqual([error]);
    expect(log.getLevel()).toEqual(1);
  });
});