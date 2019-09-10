import * as Nightmare from "nightmare";

var nightmare: Nightmare;
beforeEach(() => {
  nightmare = new Nightmare();
});

it("trying nightmare", async () => {
  return nightmare
    .goto("http://localhost:5000")
    .wait("#username")
    .insert("#username", "a")
    .insert("#password", "b")
    .click("#login")
    .end();
});
