import challengesAdminApi from "@cectf/api/challengesAdmin.api";
import { AdminChallenge, NewAdminChallenge } from "@cectf/types";

import fetchMock = require("fetch-mock");

afterEach(() => {
  fetchMock.reset();
});

const challenges: AdminChallenge[] = [
  {
    id: 1,
    title: "First",
    category: "crypto",
    author: "ad4m",
    body: "Do it harder",
    solution: "CECTF{1}",
    previousChallenge: null
  }, {
    id: 2,
    title: "Second",
    category: "reversing",
    author: "b0b",
    body: "Do it better",
    solution: "CECTF{2}",
    previousChallenge: null
  }, {
    id: 1,
    title: "Third",
    category: "binary",
    author: "c4rl4",
    body: "Do it faster",
    solution: "CECTF{3}",
    previousChallenge: 2
  },
];

const newChallenge: NewAdminChallenge = {
  title: "First",
  category: "crypto",
  author: "ad4m",
  body: "Do it harder",
  solution: "CECTF{1}",
  previousChallenge: null
}

it("getChallenges", async () => {
  fetchMock.getOnce("/api/admin/challenges", challenges);

  expect.assertions(3);
  return challengesAdminApi.getChallenges()
    .then(actualChallenges => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/admin/challenges");
      expect(actualChallenges).toEqual(challenges);
    });
});

it("getChallenges failed", async () => {
  fetchMock.getOnce("/api/admin/challenges", 400);

  expect.assertions(3);
  return challengesAdminApi.getChallenges()
    .then(actualChallenges => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/admin/challenges");
      expect(actualChallenges).toEqual([]);
    });
});

it("createChallenge", async () => {
  fetchMock.postOnce("/api/admin/challenges", challenges[0]);

  expect.assertions(3);
  return challengesAdminApi.createChallenge(newChallenge)
    .then(actualNewChallenge => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/admin/challenges");
      expect(actualNewChallenge).toEqual(challenges[0]);
    });
});

it("updateChallenge", async () => {
  fetchMock.postOnce("/api/admin/challenges/" + challenges[0].id, challenges[1]);

  expect.assertions(3);
  return challengesAdminApi.updateChallenge(challenges[0].id, challenges[1])
    .then(updatedChallenge => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/admin/challenges/" + challenges[0].id);
      expect(updatedChallenge).toEqual(challenges[1]);
    });
});


it("deleteChallenge", async () => {
  fetchMock.deleteOnce("/api/admin/challenges/" + challenges[0].id, 204);

  expect.assertions(2);
  return challengesAdminApi.deleteChallenge(challenges[0].id)
    .then(() => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/admin/challenges/" + challenges[0].id);
    });
});