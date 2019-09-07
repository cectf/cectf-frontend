import { StateManager } from "state/state";
import { ChallengeStub } from "types";

export class AdminChallengesStateManager extends StateManager<ChallengeStub[]> {
  constructor() {
    super([]);
    this.setChallenge = this.setChallenge.bind(this);
  }

  setChallenge(challenge: ChallengeStub | undefined) {
    if (challenge) {
      var nextState: ChallengeStub[] = [];
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

  deleteChallenge(challenge: ChallengeStub) {
    var nextState: ChallengeStub[] = this.state;
    for (var i in this.state) {
      if (this.state[i].id == challenge.id) {
        delete nextState[i];
      }
    }
    this.nextState(nextState);
  }
}
