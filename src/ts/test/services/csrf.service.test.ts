import api from "api/csrf.api";
import service from "services/csrf.service";
import { store } from "state";
import * as actions from "state/actions";

var csrfToken = "abc123"

it("refreshCsrf", async () => {
  var getCsrf = jest.fn(() => Promise.resolve(csrfToken));
  api.getCsrf = getCsrf;
  var dispatch = jest.fn();
  store.dispatch = dispatch;

  expect.assertions(3);
  return service.refreshCsrf().then(() => {
    expect(getCsrf.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0]).toEqual([actions.setCsrf(csrfToken)]);
  });
});