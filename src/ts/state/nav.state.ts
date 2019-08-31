import { NavPage } from "types";
import { StateManager } from "state/state";

export default class NavStateManager extends StateManager<NavPage> {
  constructor() {
    super(NavPage.ABOUT);
  }
}
