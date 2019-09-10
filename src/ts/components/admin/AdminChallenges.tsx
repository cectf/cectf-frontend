import * as React from "react";
import state from "state";
import service from "services";
import AdminChallengeTile from "components/admin/AdminChallengeTile";
import CreateChallengeModal from "components/admin/CreateChallengeModal";
import { ChallengeStub } from "types";

interface AdminChallengesProps {}
interface AdminChallengesState {
  modalOpen: boolean;
  challenges: ChallengeStub[];
}

export default class AdminChallenges extends React.Component<
  AdminChallengesProps,
  AdminChallengesState
> {
  constructor(props: AdminChallengesProps) {
    super(props);
    this.state = { modalOpen: false, challenges: state.admin.challenges.state };
    this.openCreateChallengeModal = this.openCreateChallengeModal.bind(this);
    this.createChallenge = this.createChallenge.bind(this);
  }
  componentDidMount() {
    state.admin.challenges.addListener(challenges => {
      this.setState({ challenges: challenges });
    });
  }
  openCreateChallengeModal(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ modalOpen: true });
  }
  createChallenge(challenge: ChallengeStub) {
    service.challengesAdmin.createChallenge(challenge).then(() => {
      this.setState({ modalOpen: false });
    });
  }
  render() {
    return [
      <div id="challenges" className="challenges">
        <button
          id="create-challenge-button"
          onClick={this.openCreateChallengeModal}
        >
          Create New Challenge
        </button>
        {this.state.challenges.map(challenge => (
          <AdminChallengeTile challenge={challenge} />
        ))}
      </div>,
      <CreateChallengeModal parent={this} onSubmit={this.createChallenge} />
    ];
  }
}
