import api from "@cectf/api/challenges.api";
import service from "@cectf/services/challenges.service";
import popupService from "@cectf/services/popup.service";
import { store } from "@cectf/state";
import * as actions from "@cectf/state/actions";
import { Challenge, SubmissionStatus, PopupLocation } from "@cectf/types";

var challenge: Challenge = {
  id: 1,
  title: "First",
  category: "crypto",
  author: "ad4m",
  body: "Do it",
  solved: true
};

it("updateChallenges", async () => {
  var getChallenges = jest.fn(() => Promise.resolve([challenge]));
  api.getChallenges = getChallenges;
  var dispatch = jest.fn();
  store.dispatch = dispatch;

  expect.assertions(3);
  return service.updateChallenges()
    .then(() => {
      expect(getChallenges.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[0]).toEqual([actions.ctfSetChallenges([challenge])]);
    });
});

it("submitFlag correct", () => {
  var submitFlag = jest.fn(() =>
    Promise.resolve({ status: SubmissionStatus.CORRECT, challenge: challenge })
  );
  api.submitFlag = submitFlag;
  var getChallenges = jest.fn(() => Promise.resolve([challenge]));
  api.getChallenges = getChallenges;
  var dispatch = jest.fn();
  store.dispatch = dispatch;
  var info = jest.fn();
  popupService.info = info;

  expect.assertions(6);
  return service.submitFlag(1, "CTF{flag}")
    .then(() => {
      expect(submitFlag.mock.calls.length).toEqual(1);
      expect(getChallenges.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[0]).toEqual([actions.ctfSetChallenges([challenge])]);
      expect(info.mock.calls.length).toEqual(1);
      expect(info.mock.calls[0]).toEqual([PopupLocation.CHALLENGE_TILE, "You did it!", challenge.id]);
    });
});

it("submitFlag incorrect", () => {
  var submitFlag = jest.fn(() =>
    Promise.resolve({ status: SubmissionStatus.INCORRECT })
  );
  api.submitFlag = submitFlag;
  var dispatch = jest.fn();
  store.dispatch = dispatch;
  var error = jest.fn();
  popupService.error = error;

  expect.assertions(4);
  return service.submitFlag(1, "CTF{flag}")
    .then(() => {
      expect(submitFlag.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls.length).toEqual(0);
      expect(error.mock.calls.length).toEqual(1);
      expect(error.mock.calls[0]).toEqual([PopupLocation.CHALLENGE_TILE, "That ain't right. n00b.", challenge.id]);
    });
});

it("submitFlag already solved", () => {
  var submitFlag = jest.fn(() =>
    Promise.resolve({ status: SubmissionStatus.ALREADY_SOLVED })
  );
  api.submitFlag = submitFlag;
  var dispatch = jest.fn();
  store.dispatch = dispatch;
  var info = jest.fn();
  popupService.info = info;

  expect.assertions(4);
  return service.submitFlag(1, "CTF{flag}")
    .then(() => {
      expect(submitFlag.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls.length).toEqual(0);
      expect(info.mock.calls.length).toEqual(1);
      expect(info.mock.calls[0]).toEqual([PopupLocation.CHALLENGE_TILE, "You already solved this one!", challenge.id]);
    });
});

it("submitFlag unknown submission status", () => {
  var submitFlag = jest.fn(() =>
    Promise.resolve({ status: 666 })
  );
  api.submitFlag = submitFlag;
  var dispatch = jest.fn();
  store.dispatch = dispatch;
  var error = jest.fn();
  popupService.error = error;

  expect.assertions(4);
  return service.submitFlag(1, "CTF{flag}")
    .then(() => {
      expect(submitFlag.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls.length).toEqual(0);
      expect(error.mock.calls.length).toEqual(1);
      expect(error.mock.calls[0]).toEqual([PopupLocation.CHALLENGE_TILE, "Unknown server error :O", challenge.id]);
    });
});

it("setChallengeIsOpen true", () => {
  var dispatch = jest.fn();
  store.dispatch = dispatch;

  expect.assertions(2);
  return service.setChallengeIsOpen(challenge, true)
    .then(() => {
      expect(dispatch.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[0]).toEqual([actions.ctfUpdateChallenge({ data: challenge, open: true })]);
    });
});

it("setChallengeIsOpen false", () => {
  var dispatch = jest.fn();
  store.dispatch = dispatch;

  expect.assertions(2);
  return service.setChallengeIsOpen(challenge, false)
    .then(() => {
      expect(dispatch.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[0]).toEqual([actions.ctfUpdateChallenge({ data: challenge, open: false })]);
    });
});