import * as React from "react";
import * as Modal from "react-modal";
import { Challenge, SubmissionStatus, FileDescriptor } from "@cectf/types";
import service from "@cectf/services";
import api from "@cectf/api";
import * as styles from "@styles/content/ctf/challengeTile.scss";
import * as modalStyles from "@styles/modal/challenge.scss";

interface ChallengeTileProps {
  challenge: Challenge;
}
interface ChallengeTileState {
  modalOpen: boolean;
  message: string;
  files: FileDescriptor[];
  flagAttempt: string;
}

export default class ChallengeTile extends React.Component<
  ChallengeTileProps,
  ChallengeTileState
  > {
  constructor(props: ChallengeTileProps, state: ChallengeTileState) {
    super(props, state);
    this.state = {
      modalOpen: false,
      message: "",
      files: [],
      flagAttempt: ""
    };
    this.onClick = this.onClick.bind(this);
    this.onFlagFieldChange = this.onFlagFieldChange.bind(this);
    this.onFlagSubmit = this.onFlagSubmit.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }
  onClick() {
    api.challengeFiles.getFiles(this.props.challenge.id).then(files => {
      this.setState({ files: files });
    });
    this.setState({ modalOpen: true });
  }
  onFlagFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      flagAttempt: event.target.value
    });
  }
  onFlagSubmit(event: React.FormEvent) {
    event.preventDefault();
    event.stopPropagation();
    service.challenges
      .submitFlag(this.props.challenge.id, this.state.flagAttempt)
      // TODO make this use a messaging state instead
      .then(status => {
        if (status == SubmissionStatus.CORRECT) {
          this.setState({ message: "You did it!" });
        } else if (status == SubmissionStatus.INCORRECT) {
          this.setState({ message: "That ain't right. n00b." });
        } else if (status == SubmissionStatus.ALREADY_SOLVED) {
          this.setState({ message: "You already solved this one!" });
        }
      });
  }
  onModalClose() {
    this.setState({ modalOpen: false, message: "" });
  }
  render() {

    if (this.props.challenge.solved) {
      var className = styles.challengeTileSolved;
    } else {
      var className = styles.challengeTileUnsolved;
    }

    var solution = undefined;

    if (this.props.challenge.solved) {
      solution = <div data-id="solution"
        className={styles.challengeTileFlag}>
        Flag: {this.props.challenge.solution}
      </div>;
    }

    return [
      <div key={1}
        data-id={String(this.props.challenge.id)}
        className={className}
        onClick={this.onClick}>
        <div data-id="title"
          className={styles.challengeTileTitle}>
          {this.props.challenge.title}
        </div>
        <div data-id="category"
          className={styles.challengeTileCategory}>
          {this.props.challenge.category}
        </div>
        {solution}
      </div>,
      <Modal key={2}
        className={modalStyles.challengeModal}
        isOpen={this.state.modalOpen}
        onRequestClose={this.onModalClose}>
        <div className={modalStyles.challengeModalContent}>
          <div>{this.props.challenge.body}</div>
          <div>
            <ul>
              {this.state.files.map(file => (
                <li>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <form onSubmit={this.onFlagSubmit}>
              <input type="text" id="flag" onChange={this.onFlagFieldChange} />
              <div className="modal__message">{this.state.message}</div>
              <button type="submit" id="submit">
                Submit
            </button>
            </form>
          </div>
          <button onClick={this.onModalClose}>Close</button>
        </div>
      </Modal>
    ];
  }
}
