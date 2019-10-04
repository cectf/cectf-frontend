
import * as actions from "state/actions";
import { store } from "state";
import { Challenge } from "types";

var challenge1: Challenge = {
    id: 1,
    title: "First",
    category: "crypto",
    body: "Do it",
    hint: "hint",
    solution: "CTF{flag}",
    hinted: false,
    solved: true
};
var challenge2: Challenge = {
    id: 2,
    title: "Second",
    category: "reversing",
    body: "Do it harder better faster",
    hint: "hinty",
    solution: "CTF{F14g}",
    hinted: true,
    solved: false
};

afterEach(() => {
    store.dispatch(actions.reset());
});

it("set challenges", () => {
    expect(store.getState().challenges).toEqual([]);
    store.dispatch(actions.ctfSetChallenges([challenge1, challenge2]));
    expect(store.getState().challenges).toEqual([challenge1, challenge2]);
});

it("update challenge", () => {
    store.dispatch(actions.ctfSetChallenges([challenge1, challenge2]));
    expect(store.getState().challenges).toEqual([challenge1, challenge2]);

    var updatedChallenge1 = Object.assign({}, challenge1, {
        title: "NotFirst",
        category: "cryptography"
    });
    store.dispatch(actions.ctfUpdateChallenge(updatedChallenge1));
    expect(store.getState().challenges).toEqual([updatedChallenge1, challenge2]);
});