
import * as actions from "@cectf/state/actions";
import { store } from "@cectf/state";
import { NavPage } from "@cectf/types";

afterEach(() => {
    store.dispatch(actions.reset());
});

it("set nav page", () => {
    expect(store.getState().navPage).toEqual(NavPage.ABOUT);
    store.dispatch(actions.setNavPage(NavPage.CTF));
    expect(store.getState().navPage).toEqual(NavPage.CTF);
});
