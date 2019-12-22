import { connect } from "react-redux";
import * as React from "react";
import { State } from "@cectf/types";

interface StateDisplayProps {
  currentState: State;
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
    if (this.props.currentState.config.production) {
      return null;
    } else {
      return (
        <div>
          <hr />
          <div>Current Redux State:
            <pre>{JSON.stringify(this.props.currentState, null, 2)}</pre>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state: State, ownProps: any): StateDisplayProps => {
  return { currentState: state };
}

var StateDisplay = connect(mapStateToProps)(StateDisplayComponent)
export default StateDisplay;