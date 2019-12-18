import * as React from "react";
import { connect } from "react-redux";
import services from "@cectf/services";
import AdminChallengeTile from "@cectf/components/content/admin/AdminChallengeTile";
import CreateChallengeModal from "@cectf/components/content/admin/CreateChallengeModal";
import { State, AdminChallenge, NewAdminChallenge, ModalID } from "@cectf/types";
import { store, closeModal, openModal } from "@cectf/state";

interface AdminChallengesProps {
  challenges: AdminChallenge[];
}
interface AdminChallengesState { }

class AdminChallengesComponent extends React.Component<
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
    store.dispatch(openModal(ModalID.ADMIN_CHALLENGE));
  }
  createChallenge(challenge: NewAdminChallenge) {
    services.challengesAdmin.createChallenge(challenge).then(() => {
      store.dispatch(closeModal());
    });
  }
  render() {
    return [
      <div id="challenges" key="challenges">
        <button
          id="create-challenge-button"
          onClick={this.openCreateChallengeModal}
        >
          Create New Challenge
        </button>
        {this.props.challenges.map(challenge => (
          <AdminChallengeTile key={challenge.id} challenge={challenge} existingChallenges={this.props.challenges} />
        ))}
      </div>,
      <div key="modal">
        <CreateChallengeModal onSubmit={this.createChallenge} existingChallenges={this.props.challenges} />
      </div>
    ];
  }
}

const mapStateToProps = (state: State, ownProps: any): { challenges: AdminChallenge[] } => {
  return {
    challenges: state.adminChallenges
  };
}


const AdminChallenges = connect(mapStateToProps)(AdminChallengesComponent);
export default AdminChallenges;