import { StateManager } from "state/state";
import { Challenge } from "types";

export default class ChallengesStateManager extends StateManager<Challenge[]> {
  constructor() {
    super([]);
    this.setChallenge = this.setChallenge.bind(this);
  }

  setChallenge(challenge: Challenge | undefined) {
    if (challenge) {
      var nextState: Challenge[] = [];
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
}
