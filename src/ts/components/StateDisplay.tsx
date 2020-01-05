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
  mapToObject = (aMap: Map<any, any>) => {
    var obj = Object.create(null);
    for (var [k, v] of aMap) {
      if (v instanceof Map) {
        obj[k.toString()] = this.mapToObject(v);
      } else {
        obj[k.toString()] = v;
      }
    }
    return obj;
  }
  replacer = (name: string, val: any) => {
    if (val instanceof Map) {
      return this.mapToObject(val);
    } else {
      return val;
    }
  }
  render() {
    if (this.props.currentState.config.production) {
      return null;
    } else {
      return (
        <div>
          <hr />
          <div>Current Redux State:
            <pre>{JSON.stringify(this.props.currentState, this.replacer, 2)}</pre>
          </div>
        </div>
      );
    }
  }
}

var x: any = {
  1: 2
}

const mapStateToProps = (state: State, ownProps: any): StateDisplayProps => {
  return { currentState: state };
}

var StateDisplay = connect(mapStateToProps)(StateDisplayComponent)
export default StateDisplay;