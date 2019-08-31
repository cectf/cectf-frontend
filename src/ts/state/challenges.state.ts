import { StateManager } from "state/state";
import { Challenge } from "types";

export default class ChallengesStateManager extends StateManager<Challenge[]> {
  constructor() {
    super([]);
    this.setChallenges = this.setChallenges.bind(this);
    this.setChallenge = this.setChallenge.bind(this);
  }

  setChallenges(challenges: Challenge[]) {
    this.nextState(challenges);
  }

  setChallenge(challenge: Challenge) {
    var nextState: Challenge[] = [];
    var found = false;
    for (var i in this.state) {
      if (this.state[i] == challenge) {
        nextState.push(challenge);
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
