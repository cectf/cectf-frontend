import * as React from "react";
import state from "state";
import ChallengeTile from "components/ctf/ChallengeTile";
import { Challenge } from "types";

interface ChallengesProps {}
interface ChallengesState {
  challenges: Challenge[];
}

export default class Challenges extends React.Component<
  ChallengesProps,
  ChallengesState
> {
  constructor(props: ChallengesProps) {
    super(props);
    this.state = { challenges: state.challenges.state };
  }
  componentDidMount() {
    state.challenges.addListener(challenges => {
      this.setState({ challenges: challenges });
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
      return <div id="challenges" className="challenges"></div>;
    }
  }
}
