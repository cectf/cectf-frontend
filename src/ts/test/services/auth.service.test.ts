import api from "@cectf/api/auth.api";
import service from "@cectf/services/auth.service";
import services from "@cectf/services";
import { store } from "@cectf/state";
import * as actions from "@cectf/state/actions";


it("login", async () => {
  var login = jest.fn(() => Promise.resolve());
  api.login = login;
  var updateCurrentUser = jest.fn();
  services.user.updateCurrentUser = updateCurrentUser;

  expect.assertions(2);
  return service.login("username", "password").then(() => {
    expect(login.mock.calls.length).toEqual(1);
    expect(updateCurrentUser.mock.calls.length).toEqual(1);
  });
});

it("logout", async () => {
  var logout = jest.fn(() => Promise.resolve());
  api.logout = logout;
  var dispatch = jest.fn();
  store.dispatch = dispatch;
  var refreshCsrf = jest.fn();
  services.csrf.refreshCsrf = refreshCsrf;

  expect.assertions(4);
  return service.logout().then(() => {
    expect(logout.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0][0]).toEqual(actions.reset());
    expect(refreshCsrf.mock.calls.length).toEqual(1);
  });
});

it("register", async () => {
  var register = jest.fn(() => Promise.resolve());
  api.register = register;
  var updateCurrentUser = jest.fn();
  services.user.updateCurrentUser = updateCurrentUser;

  expect.assertions(2);
  return service.register("username@email.com", "username", "password").then(() => {
    expect(register.mock.calls.length).toEqual(1);
    expect(updateCurrentUser.mock.calls.length).toEqual(1);
  });
});