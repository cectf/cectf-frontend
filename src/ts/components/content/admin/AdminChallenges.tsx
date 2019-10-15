import * as React from "react";
import services from "@cectf/services";
import AdminChallengeTile from "@cectf/components/content/admin/AdminChallengeTile";
import CreateChallengeModal from "@cectf/components/content/admin/CreateChallengeModal";
import { AdminChallenge, NewAdminChallenge } from "@cectf/types";

interface AdminChallengesProps {
  challenges: AdminChallenge[];
}
interface AdminChallengesState {
  modalOpen: boolean;
}

export default class AdminChallenges extends React.Component<
  AdminChallengesProps,
  AdminChallengesState
  > {
  constructor(props: AdminChallengesProps) {
    super(props);
    services.challengesAdmin.updateChallenges();
    this.state = { modalOpen: false };
    this.openCreateChallengeModal = this.openCreateChallengeModal.bind(this);
    this.createChallenge = this.createChallenge.bind(this);
  }
  openCreateChallengeModal(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ modalOpen: true });
  }
  createChallenge(challenge: NewAdminChallenge) {
    services.challengesAdmin.createChallenge(challenge).then(() => {
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
        {this.props.challenges.map(challenge => (
          <AdminChallengeTile challenge={challenge} />
        ))}
      </div>,
      <CreateChallengeModal parent={this} onSubmit={this.createChallenge} />
    ];
  }
}
