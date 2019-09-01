import * as Cookie from "js-cookie";

export class StateManager<State> {
  state: State;
  listeners: ((nextState: State) => void)[];
  constructor(initialState: State) {
    this.state = initialState;
    this.listeners = [];
    this.addListener = this.addListener.bind(this);
    this.alertListeners = this.alertListeners.bind(this);
    this.nextState = this.nextState.bind(this);
  }
  addListener(listener: (nextState: State) => void) {
    this.listeners.push(listener);
    listener(this.state);
  }
  removeListener(listener: (nextState: State) => void) {
    var index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
  alertListeners() {
    console.log("Alerting %s listeners", this.listeners.length);
    for (var i in this.listeners) {
      this.listeners[i](this.state);
    }
  }
  nextState(nextState: State): State {
    console.log("Updating state to", nextState);
    this.state = nextState;
    this.alertListeners();
    return this.state;
  }
}

export class CookieStateManager<State> extends StateManager<State> {
  cookieName: string;
  constructor(cookieName: string, initialState: State) {
    var cookie = Cookie.get(cookieName);
    if (cookie) {
      super(JSON.parse(atob(cookie)));
    } else {
      super(initialState);
      Cookie.set(cookieName, btoa(JSON.stringify(initialState)));
    }
    this.cookieName = cookieName;
    this.nextState = this.nextState.bind(this);
  }

  nextState(nextState: State): State {
    super.nextState(nextState);
    Cookie.set(this.cookieName, btoa(JSON.stringify(nextState)));
    return nextState;
  }
}
