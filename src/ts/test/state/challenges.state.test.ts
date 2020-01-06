
import * as actions from "@cectf/state/actions";
import { store } from "@cectf/state";
import { Challenge } from "@cectf/types";

const challenge1: Challenge = {
    id: 1,
    title: "First",
    category: "crypto",
    author: "ad4m",
    body: "Do it",
    solved: true
};
const challenge2: Challenge = {
    id: 2,
    title: "Second",
    category: "reversing",
    author: "ad4m",
    body: "Do it harder better faster",
    solved: false
};

const challenges = [challenge1, challenge2];
const challengeData = [{ data: challenge1, open: false }, { data: challenge2, open: false }];

afterEach(() => {
    store.dispatch(actions.reset());
});

it("set challenges", () => {
    expect(store.getState().challenges).toEqual([]);
    store.dispatch(actions.ctfSetChallenges(challenges));
    expect(store.getState().challenges).toEqual(challengeData);
});

it("update challenge", () => {
    store.dispatch(actions.ctfSetChallenges(challenges));
    expect(store.getState().challenges).toEqual(challengeData);

    const updatedChallenge1 = {
        data: Object.assign({}, challenge1, {
            title: "NotFirst",
            category: "cryptography"
        }),
        open: true
    };
    store.dispatch(actions.ctfUpdateChallenge(updatedChallenge1));
    expect(store.getState().challenges).toEqual([updatedChallenge1, challengeData[1]]);
});