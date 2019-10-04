import api from "api/auth.api";
import service from "services/auth.service";
import services from "services";
import { store } from "state";
import * as actions from "state/actions";


it("login", async () => {
  var login = jest.fn(() => Promise.resolve({ succeeded: true }));
  api.login = login;
  var updateCurrentUser = jest.fn();
  services.user.updateCurrentUser = updateCurrentUser;
  var updateCtfChallenges = jest.fn();
  services.challenges.updateChallenges = updateCtfChallenges;
  var updateAdminChallenges = jest.fn();
  services.challengesAdmin.updateChallenges = updateAdminChallenges;

  expect.assertions(4);
  return service.login("username", "password").then(() => {
    expect(login.mock.calls.length).toEqual(1);
    expect(updateCurrentUser.mock.calls.length).toEqual(1);
    expect(updateCtfChallenges.mock.calls.length).toEqual(1);
    expect(updateAdminChallenges.mock.calls.length).toEqual(1);
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
  var register = jest.fn(() => Promise.resolve({ succeeded: true }));
  api.register = register;
  var updateCurrentUser = jest.fn();
  services.user.updateCurrentUser = updateCurrentUser;
  var updateCtfChallenges = jest.fn();
  services.challenges.updateChallenges = updateCtfChallenges;
  var updateAdminChallenges = jest.fn();
  services.challengesAdmin.updateChallenges = updateAdminChallenges;

  expect.assertions(4);
  return service.register("username@email.com", "username", "password").then(() => {
    expect(register.mock.calls.length).toEqual(1);
    expect(updateCurrentUser.mock.calls.length).toEqual(1);
    expect(updateCtfChallenges.mock.calls.length).toEqual(1);
    expect(updateAdminChallenges.mock.calls.length).toEqual(0);
  });
});