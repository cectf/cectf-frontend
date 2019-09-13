import { StateManager } from "state/state";
import { AdminChallenge } from "types";

export class AdminChallengesStateManager extends StateManager<
  AdminChallenge[]
> {
  constructor() {
    super([]);
    this.setChallenge = this.setChallenge.bind(this);
  }

  setChallenge(challenge: AdminChallenge | undefined) {
    if (challenge) {
      var nextState: AdminChallenge[] = [];
      var found = false;
      for (var i in this.state) {
        if (this.state[i].id == challenge.id) {
          nextState.push(challenge);
          found = true;
        } else {
          nextState.push(this.state[i]);
        }
      }
      if (!found) {
        nextState.push(challenge);
      }
      this.nextState(nextState);
    }
  }

  deleteChallenge(challenge: AdminChallenge) {
    var nextState: AdminChallenge[] = this.state;
    for (var i in this.state) {
      if (this.state[i].id == challenge.id) {
        delete nextState[i];
      }
    }
    this.nextState(nextState);
  }
}
