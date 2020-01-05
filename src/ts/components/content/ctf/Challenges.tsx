import * as React from "react";
import { connect } from "react-redux";
import ChallengeTile from "@cectf/components/content/ctf/ChallengeTile";
import { State, ChallengeData, FileDescriptor } from "@cectf/types";
import services from "@cectf/services";
import * as styles from "@styles/content/ctf/challenges.scss";

interface ChallengesProps {
  challenges: ChallengeData[];
  filesMap: Map<number, FileDescriptor[]>;
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
            key={challenge.data.id}
            challenge={challenge.data}
            open={challenge.open}
            files={this.props.filesMap.get(challenge.data.id)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: any): ChallengesProps => {
  return {
    challenges: state.challenges,
    filesMap: state.files
  };
}

const Challenges = connect(mapStateToProps)(ChallengesComponent);
export default Challenges;