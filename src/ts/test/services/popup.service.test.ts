import * as log from 'loglevel';
import api from "@cectf/api/config.api";
import service from "@cectf/services/popup.service";
import { store } from "@cectf/state";
import * as actions from "@cectf/state/actions";
import { Popup, PopupLevel } from "@cectf/types";

var shortTimeout: number = 50;

it("info popup", async () => {

  service.setPopupTimeout(shortTimeout);

  var infoMessage: string = "Info!";

  var dispatch = jest.fn();
  store.dispatch = dispatch;

  service.info(infoMessage);

  expect.assertions(10);

  // verify 1 call to dispatch with 1 argument
  expect(dispatch.mock.calls.length).toEqual(1);
  expect(dispatch.mock.calls[0].length).toEqual(1);

  // verify argument was an ADD_POPUP action
  var action = dispatch.mock.calls[0][0];
  expect(action.type).toEqual(actions.ActionId.ADD_POPUP);

  // verify popup properties, except for date
  var popup: Popup = action.value;
  expect(popup.level).toEqual(PopupLevel.INFO);
  expect(popup.text).toEqual(infoMessage);

  // wait for the popup to dismiss itself
  return new Promise(resolve => {
    setTimeout(() => {
      // verify 2 calls to dispatch, 2nd with 1 argument
      expect(dispatch.mock.calls.length).toEqual(2);
      expect(dispatch.mock.calls[1].length).toEqual(1);

      // verify argument was a REMOVE_POPUP action
      var action = dispatch.mock.calls[1][0];
      expect(action.type).toEqual(actions.ActionId.REMOVE_POPUP);

      // verify popup properties, except for date
      var popup: Popup = action.value;
      expect(popup.level).toEqual(PopupLevel.INFO);
      expect(popup.text).toEqual(infoMessage);
      resolve();
    }, shortTimeout);
  });
});

it("error popup", async () => {

  service.setPopupTimeout(shortTimeout);

  var errorMessage: string = "Error!";

  var dispatch = jest.fn();
  store.dispatch = dispatch;

  service.error(errorMessage);

  expect.assertions(10);

  // verify 1 call to dispatch with 1 argument
  expect(dispatch.mock.calls.length).toEqual(1);
  expect(dispatch.mock.calls[0].length).toEqual(1);

  // verify argument was an ADD_POPUP action
  var action = dispatch.mock.calls[0][0];
  expect(action.type).toEqual(actions.ActionId.ADD_POPUP);

  // verify popup properties, except for date
  var popup: Popup = action.value;
  expect(popup.level).toEqual(PopupLevel.ERROR);
  expect(popup.text).toEqual(errorMessage);

  // wait for the popup to dismiss itself
  return new Promise(resolve => {
    setTimeout(() => {
      // verify 2 calls to dispatch, 2nd with 1 argument
      expect(dispatch.mock.calls.length).toEqual(2);
      expect(dispatch.mock.calls[1].length).toEqual(1);

      // verify argument was a REMOVE_POPUP action
      var action = dispatch.mock.calls[1][0];
      expect(action.type).toEqual(actions.ActionId.REMOVE_POPUP);

      // verify popup properties, except for date
      var popup: Popup = action.value;
      expect(popup.level).toEqual(PopupLevel.ERROR);
      expect(popup.text).toEqual(errorMessage);
      resolve();
    }, shortTimeout);
  });
});
