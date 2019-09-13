import { NavPage } from "types";
import { CookieStateManager } from "state/state";

export default class NavStateManager extends CookieStateManager<NavPage> {
  constructor() {
    super("nav", NavPage.ABOUT);
  }
}
