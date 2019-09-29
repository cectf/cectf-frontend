import * as React from "react";
import state, { store } from "state";

interface StateDisplayProps {}
interface StateDisplayState {
  challengesState: string;
  csrfState: string;
  navState: string;
  userState: string;
}

export default class StateDisplay extends React.Component<
  StateDisplayProps,
  StateDisplayState
> {
  constructor(props: StateDisplayProps) {
    super(props);
    this.state = {
      challengesState: "",
      csrfState: "",
      navState: "",
      userState: ""
    };
  }
  componentDidMount() {
    state.challenges.addListener(nextState => {
      this.setState({ challengesState: JSON.stringify(nextState) });
    });
    state.csrf.addListener(nextState => {
      this.setState({ csrfState: JSON.stringify(nextState) });
    });
    state.nav.addListener(nextState => {
      this.setState({ navState: JSON.stringify(nextState) });
    });
    state.user.addListener(nextState => {
      this.setState({ userState: JSON.stringify(nextState) });
    });
  }
  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <div>Some info:</div>
        <div>Challenges: {this.state.challengesState}</div>
        <div>CSRF: {this.state.csrfState}</div>
        <div>Nav: {this.state.navState}</div>
        <div>User: {this.state.userState}</div>
        <div>True state: {JSON.stringify(store.getState())}</div>
      </div>
    );
  }
}
