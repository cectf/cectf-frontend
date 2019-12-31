import userApi from "@cectf/api/user.api";
import { User } from "@cectf/types";

import fetchMock = require("fetch-mock");

afterEach(() => {
  fetchMock.reset();
});

const user: User = {
  id: 1,
  username: "admin",
  email: "admin@email.com",
  roles: [{
    name: "admin",
    description: "Site admin",
  }]
};

it("getCurrentUser success", async () => {
  fetchMock.getOnce("/api/user", user);

  expect.assertions(3);
  return userApi.getCurrentUser()
    .then(actualUser => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/user");
      expect(actualUser).toEqual(user);
    });
});

it("getCurrentUser failure", async () => {
  fetchMock.getOnce("/api/user", 400);

  expect.assertions(3);
  return userApi.getCurrentUser()
    .then(actualUser => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/user");
      expect(actualUser).toEqual(null);
    });
});