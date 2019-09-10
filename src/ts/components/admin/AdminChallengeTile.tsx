import * as React from "react";
import { ChallengeStub } from "types";
import CreateChallengeModal from "components/admin/CreateChallengeModal";
import service from "services";

interface AdminChallengeTileProps {
  challenge: ChallengeStub;
}
interface AdminChallengeTileState {
  modalOpen: boolean;
}

export default class AdminChallengeTile extends React.Component<
  AdminChallengeTileProps,
  AdminChallengeTileState
> {
  constructor(props: AdminChallengeTileProps, state: AdminChallengeTileState) {
    super(props, state);
    this.state = {
      modalOpen: false
    };
    this.onClick = this.onClick.bind(this);
    this.updateChallenge = this.updateChallenge.bind(this);
    this.deleteChallenge = this.deleteChallenge.bind(this);
  }
  onClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ modalOpen: true });
  }
  updateChallenge(challenge: ChallengeStub) {
    if (this.props.challenge.id) {
      service.challengesAdmin
        .updateChallenge(this.props.challenge.id, challenge)
        .then(() => {
          this.setState({ modalOpen: false });
        });
    }
  }
  deleteChallenge() {
    service.challengesAdmin.deleteChallenge(this.props.challenge);
  }
  render() {
    return [
      <div className="challenge-tile" onClick={this.onClick}>
        <div className="challenge-tile__title">
          {this.props.challenge.title}
        </div>
        <div className="challenge-tile__category">
          {this.props.challenge.category}
        </div>
        <div>Hint: {this.props.challenge.hint}</div>
        <div>Solution: {this.props.challenge.solution}</div>
        <button onClick={this.deleteChallenge}>Delete</button>
      </div>,
      <CreateChallengeModal
        parent={this}
        onSubmit={this.updateChallenge}
        challenge={this.props.challenge}
      />
    ];
  }
}
