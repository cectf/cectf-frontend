import * as React from "react";
import * as Modal from "react-modal";
import { Challenge } from "types";
import * as ChallengesService from "services/challenges.service";
import { SubmissionStatus } from "api/challenges.api";

export interface ChallengeTileProps {
  challenge: Challenge;
}
export interface ChallengeTileState {
  modalOpen: boolean;
  message: string;
  flagAttempt: string;
}

export class ChallengeTile extends React.Component<
  ChallengeTileProps,
  ChallengeTileState
> {
  constructor(props: ChallengeTileProps, state: ChallengeTileState) {
    super(props, state);
    this.state = {
      modalOpen: false,
      message: "",
      flagAttempt: ""
    };
    this.onClick = this.onClick.bind(this);
    this.onFlagFieldChange = this.onFlagFieldChange.bind(this);
    this.onFlagSubmit = this.onFlagSubmit.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }
  onClick() {
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
    ChallengesService.submitFlag(
      1,
      this.props.challenge.id,
      this.state.flagAttempt
    ).then(status => {
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
