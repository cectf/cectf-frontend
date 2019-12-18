
import * as actions from "@cectf/state/actions";
import { store } from "@cectf/state";
import { Challenge } from "@cectf/types";

var challenge1: Challenge = {
    id: 1,
    title: "First",
    category: "crypto",
    author: "ad4m",
    body: "Do it",
    solved: true
};
var challenge2: Challenge = {
    id: 2,
    title: "Second",
    category: "reversing",
    author: "ad4m",
    body: "Do it harder better faster",
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