import * as React from "react";
import * as State from "state";
import { Challenge } from "types";
import { ChallengeTile } from "components/ChallengeTile";

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
    State.challenges.addListener(this.setState.bind(this));
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
