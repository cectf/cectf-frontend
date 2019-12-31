import challengesApi from "@cectf/api/challenges.api";
import { Challenge, SubmissionStatus } from "@cectf/types";

import fetchMock = require("fetch-mock");

afterEach(() => {
  fetchMock.reset();
});

const challenge: Challenge = {
  id: 1,
  title: "First",
  category: "crypto",
  author: "ad4m",
  body: "Do it",
  solved: true
};

it("getChallenges found", async () => {
  fetchMock.getOnce("/api/ctf/challenges", [challenge]);

  expect.assertions(3);
  return challengesApi.getChallenges()
    .then(body => {
      expect(body).toEqual([challenge]);
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/ctf/challenges");
    });
});

it("getChallenges not found", async () => {
  fetchMock.getOnce("/api/ctf/challenges", 400);

  expect.assertions(3);
  return challengesApi.getChallenges()
    .then(body => {
      expect(body).toEqual([]);
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/ctf/challenges");
    });
});

it("submitFlag correct", async () => {
  fetchMock.postOnce("/api/ctf/challenges/1",
    { status: SubmissionStatus.CORRECT, challenge: challenge }
  );

  expect.assertions(3);
  return challengesApi.submitFlag(1, "CTF{flag}")
    .then(body => {
      expect(body).toEqual({
        status: SubmissionStatus.CORRECT,
        challenge: challenge
      });
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/ctf/challenges/1");
    });
});

it("submitFlag incorrect", async () => {
  fetchMock.postOnce("/api/ctf/challenges/1",
    { status: SubmissionStatus.INCORRECT }
  );

  expect.assertions(3);
  return challengesApi.submitFlag(1, "CTF{FLAG}")
    .then(body => {
      expect(body).toEqual({
        status: SubmissionStatus.INCORRECT
      });
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/ctf/challenges/1");
    });
});

it("submitFlag already solved", async () => {
  fetchMock.postOnce("/api/ctf/challenges/1",
    { body: { status: SubmissionStatus.ALREADY_SOLVED } }
  );

  expect.assertions(3);
  return challengesApi.submitFlag(1, "CTF{flag}")
    .then(body => {
      expect(body).toEqual({
        status: SubmissionStatus.ALREADY_SOLVED
      });
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/ctf/challenges/1");
    });
});
