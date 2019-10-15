import api from "@cectf/api/challenges.api";
import service from "@cectf/services/challenges.service";
import { store } from "@cectf/state";
import * as actions from "@cectf/state/actions";
import { Challenge, SubmissionStatus } from "@cectf/types";

var challenge: Challenge = {
  id: 1,
  title: "First",
  category: "crypto",
  body: "Do it",
  hint: "hint",
  solution: "CTF{flag}",
  hinted: false,
  solved: true
};

it("updateChallenges", async () => {
  var getChallenges = jest.fn(() => Promise.resolve([challenge]));
  api.getChallenges = getChallenges;
  var dispatch = jest.fn();
  store.dispatch = dispatch;

  expect.assertions(3);
  return service.updateChallenges().then(() => {
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
  var dispatch = jest.fn();
  store.dispatch = dispatch;

  expect.assertions(4);
  return service.submitFlag(1, "CTF{flag}").then(submissionStatus => {
    expect(submissionStatus).toEqual(SubmissionStatus.CORRECT);
    expect(submitFlag.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0]).toEqual([actions.ctfUpdateChallenge(challenge)]);
  });
});

it("submitFlag incorrect", () => {
  var submitFlag = jest.fn(() =>
    Promise.resolve({ status: SubmissionStatus.INCORRECT })
  );
  api.submitFlag = submitFlag;
  var dispatch = jest.fn();
  store.dispatch = dispatch;

  expect.assertions(3);
  return service.submitFlag(1, "CTF{flag}").then(submissionStatus => {
    expect(submissionStatus).toEqual(SubmissionStatus.INCORRECT);
    expect(submitFlag.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls.length).toEqual(0);
  });
});

it("submitFlag already solved", () => {
  var submitFlag = jest.fn(() =>
    Promise.resolve({ status: SubmissionStatus.ALREADY_SOLVED })
  );
  api.submitFlag = submitFlag;
  var dispatch = jest.fn();
  store.dispatch = dispatch;

  expect.assertions(3);
  return service.submitFlag(1, "CTF{flag}").then(submissionStatus => {
    expect(submissionStatus).toEqual(SubmissionStatus.ALREADY_SOLVED);
    expect(submitFlag.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls.length).toEqual(0);
  });
});