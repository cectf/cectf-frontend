import { connect } from "react-redux";
import * as React from "react";
import { State } from "types";

interface StateDisplayProps {
  currentState: State
}
interface StateDisplayState { }

export class StateDisplay extends React.Component<
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
        <div>Current state: {JSON.stringify(this.props.currentState)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: any): StateDisplayProps => {
  return { currentState: state };
}

var StateDisplayContainer = connect(mapStateToProps)(StateDisplay)
export default StateDisplayContainer;