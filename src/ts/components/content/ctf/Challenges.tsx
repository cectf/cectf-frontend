import * as React from "react";
import ChallengeTile from "@cectf/components/content/ctf/ChallengeTile";
import { Challenge } from "@cectf/types";
import services from "@cectf/services";

import * as styles from "@styles/challenges.scss";

console.log("Stylish!");
console.log(styles);

interface ChallengesProps {
  challenges: Challenge[];
}
interface ChallengesState { }

export default class Challenges extends React.Component<
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
