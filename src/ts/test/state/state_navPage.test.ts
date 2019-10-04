
import * as actions from "state/actions";
import { store } from "state";
import { NavPage } from "types";

afterEach(() => {
    store.dispatch(actions.reset());
});

it("set nav page", () => {
    expect(store.getState().navPage).toEqual(NavPage.ABOUT);
    store.dispatch(actions.setNavPage(NavPage.CTF));
    expect(store.getState().navPage).toEqual(NavPage.CTF);
});
