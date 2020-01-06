
import * as actions from "@cectf/state/actions";
import { store } from "@cectf/state";


afterEach(() => {
    store.dispatch(actions.reset());
});

it("update config", () => {
    expect(store.getState().config).toEqual({production: true});
    store.dispatch(actions.updateConfig({production: false}));
    expect(store.getState().config).toEqual({production: false});
});
