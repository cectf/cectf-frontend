import * as React from "react";
import ChallengeTile from "components/ctf/ChallengeTile";
import { Challenge } from "types";

interface ChallengesProps {
  challenges: Challenge[];
}
interface ChallengesState {}

export default class Challenges extends React.Component<
  ChallengesProps,
  ChallengesState
  > {
  constructor(props: ChallengesProps) {
    super(props);
  }
  render() {
    return (
      <div id="challenges" className="challenges">
        {this.props.challenges.map(challenge => (
          <ChallengeTile challenge={challenge} />
        ))}
      </div>
    );
  }
}
