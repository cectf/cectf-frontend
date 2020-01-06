import * as actions from "@cectf/state/actions";
import { store } from "@cectf/state";
import { User } from "@cectf/types";

var admin: User = {
    id: 1,
    username: "admin",
    email: "admin@email.com",
    roles: [{
        name: "admin",
        description: "Site admin",
    }]
};

var contestant: User = {
    id: 2,
    username: "contestant",
    email: "contestant@email.com",
    roles: [{
        name: "contestant",
        description: "CTF contestant",
    }]
};

afterEach(() => {
    store.dispatch(actions.reset());
});

it("set user admin", () => {
    expect(store.getState().user).toEqual(null);
    store.dispatch(actions.setUser(admin));
    expect(store.getState().user).toEqual(admin);
});

it("set user contestant", () => {
    expect(store.getState().user).toEqual(null);
    store.dispatch(actions.setUser(contestant));
    expect(store.getState().user).toEqual(contestant);
});
