
import * as actions from "@cectf/state/actions";
import { store } from "@cectf/state";
import { AdminChallenge } from "@cectf/types";

var challenge1: AdminChallenge = {
    id: 1,
    title: "First",
    category: "crypto",
    author: "ad4m",
    body: "Do it",
    solution: "CTF{flag}",
    previousChallenge: null
};
var challenge2: AdminChallenge = {
    id: 2,
    title: "Second",
    category: "reversing",
    author: "ad4m",
    body: "Do it harder better faster",
    solution: "CTF{F14g}",
    previousChallenge: null
};

afterEach(() => {
    store.dispatch(actions.reset());
});

it("set challenges", () => {
    expect(store.getState().adminChallenges).toEqual([]);
    store.dispatch(actions.adminSetChallenges([challenge1, challenge2]));
    expect(store.getState().adminChallenges).toEqual([challenge1, challenge2]);
});

it("add challenge", () => {
    expect(store.getState().adminChallenges).toEqual([]);
    store.dispatch(actions.adminAddChallenge(challenge1));
    expect(store.getState().adminChallenges).toEqual([challenge1]);
});

it("add multiple challenges", () => {
    expect(store.getState().adminChallenges).toEqual([]);
    store.dispatch(actions.adminAddChallenge(challenge1));
    store.dispatch(actions.adminAddChallenge(challenge2));
    expect(store.getState().adminChallenges).toEqual([challenge1, challenge2]);
});

it("update challenge", () => {
    store.dispatch(actions.adminSetChallenges([challenge1, challenge2]));
    expect(store.getState().adminChallenges).toEqual([challenge1, challenge2]);

    var updatedChallenge1 = Object.assign({}, challenge1, {
        title: "NotFirst",
        category: "cryptography"
    });
    store.dispatch(actions.adminUpdateChallenge(updatedChallenge1));
    expect(store.getState().adminChallenges).toEqual([updatedChallenge1, challenge2]);
});

it("delete first challenge", () => {
    store.dispatch(actions.adminSetChallenges([challenge1, challenge2]));
    expect(store.getState().adminChallenges).toEqual([challenge1, challenge2]);
    store.dispatch(actions.adminDeleteChallenge(challenge1));
    expect(store.getState().adminChallenges).toEqual([challenge2]);
});

it("delete second challenge", () => {
    store.dispatch(actions.adminSetChallenges([challenge1, challenge2]));
    expect(store.getState().adminChallenges).toEqual([challenge1, challenge2]);
    store.dispatch(actions.adminDeleteChallenge(challenge2));
    expect(store.getState().adminChallenges).toEqual([challenge1]);
});