import * as React from "react";
import * as Modal from "react-modal";
import { Challenge, SubmissionStatus, FileDescriptor } from "types";
import service from "services";
import api from "api";

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
    return [
      <div className="challenge-tile" onClick={this.onClick}>
        <div className="challenge-tile__title">
          {this.props.challenge.title}
        </div>
        <div className="challenge-tile__category">
          {this.props.challenge.category}
        </div>
        <div>{this.props.challenge.hint}</div>
        <div>{this.props.challenge.solution}</div>
      </div>,
      <Modal isOpen={this.state.modalOpen} onRequestClose={this.onModalClose}>
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
      </Modal>
    ];
  }
}
