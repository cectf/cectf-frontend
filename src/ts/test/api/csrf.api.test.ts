import csrfApi from "@cectf/api/csrf.api";

import fetchMock = require("fetch-mock");

afterEach(() => {
  fetchMock.reset();
});

const token = "CSRF!!!!!";

it("getCsrf", async () => {
  fetchMock.getOnce("/api/auth/csrf",
    { csrf_token: token });

  expect.assertions(3);
  return csrfApi.getCsrf()
    .then(actualToken => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(fetchMock.calls()[0][0]).toEqual("/api/auth/csrf");
      expect(actualToken).toEqual(token);
    });
});