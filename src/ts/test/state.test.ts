
import * as actions from "state/actions";
import * as reducers from "state/reducers";
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

it("set CSRF", () => {
    expect(store.getState().csrf).toEqual('');
    store.dispatch(actions.setCsrf('new_csrf_token'));
    expect(store.getState().csrf).toEqual('new_csrf_token')
});

it("add challenge", () => {
    expect(store.getState().challenges).toEqual([]);
    store.dispatch(actions.addChallenge(challenge1));
    expect(store.getState().challenges).toEqual([challenge1]);
});

it("add multiple challenges", () => {
    expect(store.getState().challenges).toEqual([]);
    store.dispatch(actions.addChallenge(challenge1));
    store.dispatch(actions.addChallenge(challenge2));
    expect(store.getState().challenges).toEqual([challenge1, challenge2]);
});

it("update challenge", () => {
    store.dispatch(actions.addChallenge(challenge1));
    store.dispatch(actions.addChallenge(challenge2));
    expect(store.getState().challenges).toEqual([challenge1, challenge2]);

    var updatedChallenge1 = Object.assign({}, challenge1, {
        title: "NotFirst",
        category: "cryptography"
    });
    store.dispatch(actions.updateChallenge(updatedChallenge1));
    expect(store.getState().challenges).toEqual([updatedChallenge1, challenge2]);
});