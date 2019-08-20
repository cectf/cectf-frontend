import { Challenge } from "common/types";

export interface State {
  challenges: Challenge[];
}

let _state: State = { challenges: [] };

let _listeners: ((newState: State) => void)[] = [];

export let addChallengesListener = function(arg: (newState: State) => void) {
  _listeners.push(arg);
};

let alertListeners = function() {
  console.log("Alerting listeners");
  console.log(_state);
  for (var i in _listeners) {
    _listeners[i](_state);
  }
};

export let setChallenges = function(challenges: Challenge[]) {
  console.log("Setting challenges");
  console.log(challenges);
  _state = { challenges: challenges };
  alertListeners();
};

export let setChallenge = function(challenge: Challenge) {
  console.log("Setting challenge");
  console.log(challenge);
  for (var i in _state.challenges) {
    if (_state.challenges[i].id == challenge.id) {
      _state.challenges[i] = challenge;
      alertListeners();
      return;
    }
  }
  _state.challenges.push(challenge);
  alertListeners();
};
