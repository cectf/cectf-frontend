import * as React from "react";
import * as State from "app/state";
import { Challenge } from "common/types";
import { ChallengeTile } from "./ChallengeTile";

export interface ChallengesProps {}

export interface ChallengesState {
  challenges: Challenge[];
}

export class Challenges extends React.Component<
  ChallengesProps,
  ChallengesState
> {
  constructor(props: ChallengesProps) {
    super(props);
    State.addChallengesListener(this.setState.bind(this));
  }
  render() {
    if (this.state) {
      return (
        <div id="challenges" className="challenges">
          {this.state.challenges.map(challenge => (
            <ChallengeTile challenge={challenge} />
          ))}
        </div>
      );
    } else {
      return <div>Loading challenges...</div>;
    }
  }
}
