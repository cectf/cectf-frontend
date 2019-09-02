import api from "api/api";
import challengesApi from "api/challenges.api";
import { Challenge } from "types";
import { FetchMock } from "jest-fetch-mock";
import { SubmissionStatus } from "types";

var fetch: FetchMock = require("jest-fetch-mock");

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

afterEach(() => {
  fetch.mockReset();
});

it("challenges.api getChallenges found", async () => {
  api.get = fetch.mockResponseOnce(JSON.stringify([challenge]));

  expect.assertions(3);
  return challengesApi.getChallenges().then(body => {
    expect(body).toEqual([challenge]);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("/api/challenge");
  });
});

it("challenges.api getChallenges not found", async () => {
  api.get = fetch.mockResponseOnce("", { status: 404 });

  expect.assertions(3);
  return challengesApi.getChallenges().then(body => {
    expect(body).toEqual([]);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("/api/challenge");
  });
});

it("challenges.api submitFlag correct", async () => {
  api.post = fetch.mockResponseOnce(
    JSON.stringify({ status: SubmissionStatus.CORRECT, challenge: challenge })
  );

  expect.assertions(3);
  return challengesApi.submitFlag(1, "CTF{flag}").then(body => {
    expect(body).toEqual({
      status: SubmissionStatus.CORRECT,
      challenge: challenge
    });
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("/api/challenge/1");
  });
});

it("challenges.api submitFlag incorrect", async () => {
  api.post = fetch.mockResponseOnce(
    JSON.stringify({ status: SubmissionStatus.INCORRECT })
  );

  expect.assertions(3);
  return challengesApi.submitFlag(1, "CTF{FLAG}").then(body => {
    expect(body).toEqual({
      status: SubmissionStatus.INCORRECT
    });
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("/api/challenge/1");
  });
});

it("challenges.api submitFlag already solved", async () => {
  api.post = fetch.mockResponseOnce(
    JSON.stringify({ status: SubmissionStatus.ALREADY_SOLVED })
  );

  expect.assertions(3);
  return challengesApi.submitFlag(1, "CTF{flag}").then(body => {
    expect(body).toEqual({
      status: SubmissionStatus.ALREADY_SOLVED
    });
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("/api/challenge/1");
  });
});
