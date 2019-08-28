import { StateManager } from "state";
import { Challenge } from "types";

export interface ChallengesState {
  challenges: Challenge[];
}

export class ChallengesStateManager extends StateManager<ChallengesState> {
  constructor() {
    super({ challenges: [] });
    this.setChallenges = this.setChallenges.bind(this);
    this.setChallenge = this.setChallenge.bind(this);
  }

  setChallenges(challenges: Challenge[]) {
    console.log("Setting challenges");
    console.log(challenges);
    this.nextState({ challenges: challenges });
    this.alertListeners();
  }

  setChallenge(challenge: Challenge) {
    console.log("Setting challenge");
    console.log(challenge);
    for (var i in this.state.challenges) {
      if (this.state.challenges[i].id == challenge.id) {
        this.state.challenges[i] = challenge;
        this.alertListeners();
        return;
      }
    }
    this.state.challenges.push(challenge);
    this.alertListeners();
  }
}
