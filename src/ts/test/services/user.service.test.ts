import api from "api/user.api";
import service from "services/user.service";
import { store } from "state";
import * as actions from "state/actions";
import { User } from "types";

var user: User = {
  id: 1,
  username: "admin",
  email: "admin@email.com",
  roles: [{
      name: "admin",
      description: "Site admin",
  }]
};

it("refreshCsrf", async () => {
  var getCurrentUser = jest.fn(() => Promise.resolve(user));
  api.getCurrentUser = getCurrentUser;
  var dispatch = jest.fn();
  store.dispatch = dispatch;

  expect.assertions(3);
  return service.updateCurrentUser().then(() => {
    expect(getCurrentUser.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0]).toEqual([actions.setUser(user)]);
  });
});