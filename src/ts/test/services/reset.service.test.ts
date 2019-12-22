import api from "@cectf/api/reset.api";
import resetService from "@cectf/services/reset.service";
import services from "@cectf/services";
import { store } from "@cectf/state";
import * as actions from "@cectf/state/actions";


it("resetApp", async () => {
  var dispatch = jest.fn();
  store.dispatch = dispatch;
  var updateConfig = jest.fn(() => Promise.resolve());
  services.config.updateConfig = updateConfig;
  var refreshCsrf = jest.fn(() => Promise.resolve());
  services.csrf.refreshCsrf = refreshCsrf;

  expect.assertions(4);
  return resetService.resetApp().then(() => {
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0]).toEqual([actions.reset()]);
    expect(updateConfig.mock.calls.length).toEqual(1);
    expect(refreshCsrf.mock.calls.length).toEqual(1);
  });
});


it("resetApp failed during updateConfig", async () => {
  var dispatch = jest.fn();
  store.dispatch = dispatch;
  var updateConfig = jest.fn(() => Promise.reject());
  services.config.updateConfig = updateConfig;
  var refreshCsrf = jest.fn(() => Promise.resolve());
  services.csrf.refreshCsrf = refreshCsrf;
  var popupError = jest.fn();
  services.popup.error = popupError;

  expect.assertions(5);
  return resetService.resetApp().then(() => {
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0]).toEqual([actions.reset()]);
    expect(updateConfig.mock.calls.length).toEqual(1);
    expect(refreshCsrf.mock.calls.length).toEqual(0);
    expect(popupError.mock.calls.length).toEqual(1);
  });
});

it("resetApp failed during refreshCsrf", async () => {
  var dispatch = jest.fn();
  store.dispatch = dispatch;
  var updateConfig = jest.fn(() => Promise.resolve());
  services.config.updateConfig = updateConfig;
  var refreshCsrf = jest.fn(() => Promise.reject());
  services.csrf.refreshCsrf = refreshCsrf;
  var popupError = jest.fn();
  services.popup.error = popupError;

  expect.assertions(5);
  return resetService.resetApp().then(() => {
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0]).toEqual([actions.reset()]);
    expect(updateConfig.mock.calls.length).toEqual(1);
    expect(refreshCsrf.mock.calls.length).toEqual(1);
    expect(popupError.mock.calls.length).toEqual(1);
  });
});


it("resetDatabase", async () => {
  var resetDatabase = jest.fn(() => Promise.resolve());
  api.resetDatabase = resetDatabase;
  var dispatch = jest.fn();
  store.dispatch = dispatch;
  var updateConfig = jest.fn(() => Promise.resolve());
  services.config.updateConfig = updateConfig;
  var refreshCsrf = jest.fn(() => Promise.resolve());
  services.csrf.refreshCsrf = refreshCsrf;
  var popupInfo = jest.fn();
  services.popup.info = popupInfo;

  expect.assertions(6);
  return resetService.resetDatabase().then(() => {
    expect(resetDatabase.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0]).toEqual([actions.reset()]);
    expect(updateConfig.mock.calls.length).toEqual(1);
    expect(refreshCsrf.mock.calls.length).toEqual(1);
    expect(popupInfo.mock.calls.length).toEqual(1);
  });
});

it("resetDatabase failed", async () => {
  var resetDatabase = jest.fn(() => Promise.reject());
  api.resetDatabase = resetDatabase;
  var popupError = jest.fn();
  services.popup.error = popupError;

  expect.assertions(2);
  return resetService.resetDatabase().then(() => {
    expect(resetDatabase.mock.calls.length).toEqual(1);
    expect(popupError.mock.calls.length).toEqual(1);
  });
});