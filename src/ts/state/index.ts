export class StateManager<StateInterface> {
  state: StateInterface;
  listeners: ((nextState: StateInterface) => void)[];
  constructor(initialState: StateInterface) {
    this.state = initialState;
    this.listeners = [];
    this.addListener = this.addListener.bind(this);
    this.alertListeners = this.alertListeners.bind(this);
    this.nextState = this.nextState.bind(this);
  }
  addListener(listener: (nextState: StateInterface) => void) {
    this.listeners.push(listener);
  }
  removeListener(listener: (nextState: StateInterface) => void) {
    var index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
  alertListeners() {
    for (var i in this.listeners) {
      this.listeners[i](this.state);
    }
  }
  nextState(nextState: StateInterface) {
    this.state = nextState;
    this.alertListeners();
  }
}

import { ChallengesStateManager } from "state/challenges.state";
import { CsrfStateManager } from "state/csrf.state";

export var challenges = new ChallengesStateManager();
export var csrf = new CsrfStateManager();
