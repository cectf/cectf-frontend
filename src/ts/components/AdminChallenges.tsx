import * as React from "react";
import state from "state";
import AdminChallengeTile from "components/AdminChallengeTile";
import { Challenge } from "types";

interface AdminChallengesProps {}
interface AdminChallengesState {
  challenges: Challenge[];
}

export default class AdminChallenges extends React.Component<
  AdminChallengesProps,
  AdminChallengesState
> {
  constructor(props: AdminChallengesProps) {
    super(props);
    this.state = { challenges: state.admin.challenges.state };
  }
  componentDidMount() {
    state.admin.challenges.addListener(challenges => {
      this.setState({ challenges: challenges });
    });
  }
  render() {
    if (this.state) {
      return (
        <div id="challenges" className="challenges">
          <button value="CREATE">Create nu</button>
          {this.state.challenges.map(challenge => (
            <AdminChallengeTile challenge={challenge} />
          ))}
        </div>
      );
    } else {
      return <div id="challenges" className="challenges"></div>;
    }
  }
}
