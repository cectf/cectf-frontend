import * as React from "react";
import { ChallengeTile } from "./ChallengeTile";

export interface ChallengesProps {
  challenges: any[];
}
export interface ChallengesState {}

export class Challenges extends React.Component<
  ChallengesProps,
  ChallengesState
> {
  render() {
    return (
      <div>
        {this.props.challenges.map(challenge => (
          <ChallengeTile name={challenge.title} category={challenge.category} />
        ))}
      </div>
    );
  }
}
