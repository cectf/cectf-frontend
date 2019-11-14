import * as React from "react";
import { connect } from "react-redux";
import ChallengeTile from "@cectf/components/content/ctf/ChallengeTile";
import { State, Challenge } from "@cectf/types";
import services from "@cectf/services";
import * as styles from "@styles/content/ctf/challenges.scss";

interface ChallengesProps {
  challenges: Challenge[];
}
interface ChallengesState { }

class ChallengesComponent extends React.Component<
  ChallengesProps,
  ChallengesState
  > {
  constructor(props: ChallengesProps) {
    super(props);
    services.challenges.updateChallenges();
  }
  render() {
    return (
      <div id="challenges"
        className={styles.challenges}>
        {this.props.challenges.map(challenge => (
          <ChallengeTile
            key={challenge.id}
            challenge={challenge}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: any): { challenges: Challenge[] } => {
  return {
    challenges: state.challenges
  };
}

const Challenges = connect(mapStateToProps)(ChallengesComponent);
export default Challenges;