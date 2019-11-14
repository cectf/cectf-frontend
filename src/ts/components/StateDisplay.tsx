import { connect } from "react-redux";
import * as React from "react";
import { State } from "@cectf/types";

interface StateDisplayProps {
  currentState: State
}
interface StateDisplayState { }

class StateDisplayComponent extends React.Component<
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

var StateDisplay = connect(mapStateToProps)(StateDisplayComponent)
export default StateDisplay;