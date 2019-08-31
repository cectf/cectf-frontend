jest.mock("api/challenges.api");

import service from "services";
import state from "state";

it("challenges.service getChallenges found", () => {
  expect.assertions(1);
  state.challenges.addListener(nextState => {
    expect(nextState).toEqual([
      {
        id: 1,
        title: "First",
        category: "crypto",
        body: "Do it",
        hint: "hint",
        solution: "CTF{flag}",
        hinted: false,
        solved: true
      }
    ]);
  });
  return service.challenges.updateChallenges();
});

it("challenges.service getChallenges not found", () => {
  expect.assertions(1);
  state.challenges.addListener(nextState => {
    expect(nextState).toEqual([
      {
        id: 1,
        title: "First",
        category: "crypto",
        body: "Do it",
        hint: "hint",
        solution: "CTF{flag}",
        hinted: false,
        solved: true
      }
    ]);
  });
  return service.challenges.updateChallenges();
});
/*
it("testing challenges submitFlag", () => {
  expect.assertions(1);
  service.submitFlag(1, 1, "CTF{flag}").then(arg =>
    expect(arg).toEqual({
      status: 0,
      challenge: {
        id: 1,
        title: "First",
        category: "crypto",
        body: "Do it",
        hint: "hint",
        solution: "CTF{flag}",
        hinted: false,
        solved: true
      }
    })
  );
});
*/
