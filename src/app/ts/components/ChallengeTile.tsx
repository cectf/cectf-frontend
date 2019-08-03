import * as React from "react";

export interface ChallengeTileProps {
  name: string;
  category: string;
}
export interface ChallengeTileState {}

export class ChallengeTile extends React.Component<
  ChallengeTileProps,
  ChallengeTileState
> {
  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.category}</div>
      </div>
    );
  }
}
