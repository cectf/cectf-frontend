import * as React from "react";
import { ChallengeTile } from "./ChallengeTile";
import {
  getChallenges,
  Challenge
} from "common/services/challenges.service.ts";

export interface ChallengesProps {
  userId: number;
}

export interface ChallengesState {
  challenges: Challenge[];
}

export class Challenges extends React.Component<
  ChallengesProps,
  ChallengesState
> {
  constructor(props: ChallengesProps) {
    super(props);
    getChallenges(1).then(async json => {
      this.setState({ challenges: json });
    });
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
