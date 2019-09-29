import * as React from "react";
import state, { store } from "state";

interface StateDisplayProps {}
interface StateDisplayState {}

export default class StateDisplay extends React.Component<
  StateDisplayProps,
  StateDisplayState
> {
  constructor(props: StateDisplayProps) {
    super(props);
  }
  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <div>Current state: {JSON.stringify(store.getState())}</div>
      </div>
    );
  }
}
