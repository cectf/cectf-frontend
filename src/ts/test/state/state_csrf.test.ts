
import * as actions from "@cectf/state/actions";
import { store } from "@cectf/state";


afterEach(() => {
    store.dispatch(actions.reset());
});

it("set CSRF", () => {
    expect(store.getState().csrf).toEqual('');
    store.dispatch(actions.setCsrf('new_csrf_token'));
    expect(store.getState().csrf).toEqual('new_csrf_token')
});
