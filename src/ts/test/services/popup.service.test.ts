import service from "@cectf/services/popup.service";
import { store } from "@cectf/state";
import * as actions from "@cectf/state/actions";
import { Popup, PopupLevel, PopupLocation } from "@cectf/types";

const message = "informative error";
const locationKey = 666;

it("info", async () => {

  var dispatch = jest.fn();
  store.dispatch = dispatch;

  service.info(PopupLocation.TOP_BAR, message);

  expect(dispatch.mock.calls.length).toEqual(1);
  expect(dispatch.mock.calls[0]).toEqual([actions.addPopup({
    level: PopupLevel.INFO,
    text: message,
    location: PopupLocation.TOP_BAR,
    locationKey: undefined
  })]);
});

it("info with locationKey", async () => {

  var dispatch = jest.fn();
  store.dispatch = dispatch;

  service.info(PopupLocation.TOP_BAR, message, locationKey);

  expect(dispatch.mock.calls.length).toEqual(1);
  expect(dispatch.mock.calls[0]).toEqual([actions.addPopup({
    level: PopupLevel.INFO,
    text: message,
    location: PopupLocation.TOP_BAR,
    locationKey: locationKey
  })]);
});

it("error", async () => {

  var dispatch = jest.fn();
  store.dispatch = dispatch;

  service.error(PopupLocation.TOP_BAR, message);

  expect(dispatch.mock.calls.length).toEqual(1);
  expect(dispatch.mock.calls[0]).toEqual([actions.addPopup({
    level: PopupLevel.ERROR,
    text: message,
    location: PopupLocation.TOP_BAR,
    locationKey: undefined
  })]);
});

it("error with locationKey", async () => {

  var dispatch = jest.fn();
  store.dispatch = dispatch;

  service.error(PopupLocation.TOP_BAR, message, locationKey);

  expect(dispatch.mock.calls.length).toEqual(1);
  expect(dispatch.mock.calls[0]).toEqual([actions.addPopup({
    level: PopupLevel.ERROR,
    text: message,
    location: PopupLocation.TOP_BAR,
    locationKey: locationKey
  })]);
});

it("remove", async () => {

  var dispatch = jest.fn();
  store.dispatch = dispatch;

  service.remove(PopupLocation.TOP_BAR);

  expect(dispatch.mock.calls.length).toEqual(1);
  expect(dispatch.mock.calls[0]).toEqual([actions.removePopup(PopupLocation.TOP_BAR)]);
});