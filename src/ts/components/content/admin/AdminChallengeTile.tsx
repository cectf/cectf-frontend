import * as React from "react";
import { AdminChallenge, NewAdminChallenge, FileDescriptor, ModalID } from "@cectf/types";
import CreateChallengeModal from "@cectf/components/content/admin/CreateChallengeModal";
import service from "@cectf/services";
import { store, openModalKey, closeModal } from "@cectf/state";

interface AdminChallengeTileProps {
  challenge: AdminChallenge;
  existingChallenges: AdminChallenge[];
}
interface AdminChallengeTileState {
  files: FileDescriptor[];
}

export default class AdminChallengeTile extends React.Component<
  AdminChallengeTileProps,
  AdminChallengeTileState
  > {
  constructor(props: AdminChallengeTileProps, state: AdminChallengeTileState) {
    super(props, state);
    this.state = {
      files: []
    };
  }
  componentDidMount() {
    api.challengeFiles.getFiles(this.props.challenge.id).then(files => {
      this.setState({ files: files });
    });
  }
  editChallenge = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    store.dispatch(openModalKey(ModalID.ADMIN_CHALLENGE, this.props.challenge.id));
  };
  updateChallenge = (challenge: NewAdminChallenge) => {
    service.challengesAdmin
      .updateChallenge(this.props.challenge.id, challenge)
      .then(() => {
        store.dispatch(closeModal());
      });
  };
  deleteChallenge = () => {
    service.challengesAdmin.deleteChallenge(this.props.challenge);
  };
  uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.challenge.id) {
      var files = event.target.files;
      if (files) {
        for (var i = 0; i < files.length; i++) {
          api.challengeFiles
            .uploadFile(this.props.challenge.id, files[i])
            .then(() => {
              api.challengeFiles
                .getFiles(this.props.challenge.id)
                .then(files => {
                  this.setState({ files: files });
                });
            });
        }
      }
    }
  };
  deleteFile = (event: React.MouseEvent, file: FileDescriptor) => {
    event.stopPropagation();
    event.preventDefault();
    if (this.props.challenge.id) {
      api.challengeFiles.deleteFile(this.props.challenge.id, file);
      api.challengeFiles.getFiles(this.props.challenge.id).then(files => {
        this.setState({ files: files });
      });
    }
  };
  render() {
    return [
      <div className="challenge-tile" key="challenge-tile">
        <div className="challenge-tile__title">
          {this.props.challenge.title}
        </div>
        <div className="challenge-tile__category">
          {this.props.challenge.category}
        </div>
        <div className="challenge-tile__author">
          {this.props.challenge.author}
        </div>
        <div>Solution: {this.props.challenge.solution}</div>
        <button onClick={this.editChallenge}> Edit Challenge</button>
        <div>
          <ul>
            {this.state.files.map(file => (
              <li>
                <a href={file.url}>{file.name}</a>
                <button onClick={e => this.deleteFile(e, file)}>
                  Delete File
                </button>
              </li>
            ))}
          </ul>
          <input
            type="file"
            onChange={this.uploadFile}
            onClick={event => {
              event.stopPropagation();
            }}
          />
        </div>
        <button onClick={this.deleteChallenge}>Delete Challenge</button>
      </div>,
      <CreateChallengeModal
        key="modal"
        onSubmit={this.updateChallenge}
        challenge={this.props.challenge}
        existingChallenges={this.props.existingChallenges.filter(existingChallenge => existingChallenge.id !== this.props.challenge.id)}
      />
    ];
  }
}
