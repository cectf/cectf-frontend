import { StateManager } from "state/state";
import { User } from "types";

export default class UserStateManager extends StateManager<User | null> {
  constructor() {
    super(null);
  }
}
