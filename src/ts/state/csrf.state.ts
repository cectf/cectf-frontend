import { StateManager } from "state/state";

export default class CsrfStateManager extends StateManager<string> {
  constructor() {
    super("");
  }
}
