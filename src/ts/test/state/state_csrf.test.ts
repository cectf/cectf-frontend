
import * as actions from "state/actions";
import { store } from "state";


afterEach(() => {
    store.dispatch(actions.reset());
});

it("set CSRF", () => {
    expect(store.getState().csrf).toEqual('');
    store.dispatch(actions.setCsrf('new_csrf_token'));
    expect(store.getState().csrf).toEqual('new_csrf_token')
});
