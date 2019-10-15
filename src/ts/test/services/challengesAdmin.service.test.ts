import api from "@cectf/api/challengesAdmin.api";
import service from "@cectf/services/challengesAdmin.service";
import { store } from "@cectf/state";
import * as actions from "@cectf/state/actions";
import { AdminChallenge, NewAdminChallenge } from "@cectf/types";

var challenge: AdminChallenge = {
  id: 1,
  title: "First",
  category: "crypto",
  body: "Do it",
  hint: "hint",
  solution: "CTF{flag}"
};

var newChallenge: NewAdminChallenge = {
  title: "First",
  category: "crypto",
  body: "Do it",
  hint: "hint",
  solution: "CTF{flag}"
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
    expect(dispatch.mock.calls[0]).toEqual([actions.adminSetChallenges([challenge])]);
  });
});

it("addChallenge", async () => {
  var createChallenge = jest.fn((newChallenge: NewAdminChallenge) => Promise.resolve(challenge));
  api.createChallenge = createChallenge;
  var dispatch = jest.fn();
  store.dispatch = dispatch;

  expect.assertions(3);
  return service.createChallenge(challenge).then(() => {
    expect(createChallenge.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0]).toEqual([actions.adminAddChallenge(challenge)]);
  });
});

it("updateChallenge", async () => {
  var updateChallenge = jest.fn((challengeId: number, newChallenge: NewAdminChallenge) => Promise.resolve(challenge));
  api.updateChallenge = updateChallenge;
  var dispatch = jest.fn();
  store.dispatch = dispatch;

  expect.assertions(4);
  return service.updateChallenge(challenge.id, newChallenge).then(() => {
    expect(updateChallenge.mock.calls.length).toEqual(1);
    expect(updateChallenge.mock.calls[0]).toEqual([challenge.id, newChallenge])
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0]).toEqual([actions.adminUpdateChallenge(challenge)]);
  });
});

it("deleteChallenge", async () => {
  var deleteChallenge = jest.fn((challengeId: number) => Promise.resolve());
  api.deleteChallenge = deleteChallenge;
  var dispatch = jest.fn();
  store.dispatch = dispatch;

  expect.assertions(4);
  return service.deleteChallenge(challenge).then(() => {
    expect(deleteChallenge.mock.calls.length).toEqual(1);
    expect(deleteChallenge.mock.calls[0]).toEqual([challenge.id])
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0]).toEqual([actions.adminDeleteChallenge(challenge)]);
  });
});