import * as React from "react";
import * as Modal from "react-modal";
import { Challenge, submitFlag } from "common/services/challenges.service.ts";

export interface ChallengeTileProps {
  challenge: Challenge;
}
export interface ChallengeTileState {
  modalOpen: boolean;
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
      modalOpen: this.state.modalOpen,
      flagAttempt: event.target.value
    });
  }
  onFlagSubmit(event: React.FormEvent) {
    event.preventDefault();
    event.stopPropagation();
    console.log("I'M GONNA SUBMIT:", this.state.flagAttempt);
    submitFlag(1, this.props.challenge.id, this.state.flagAttempt);
  }
  onModalClose() {
    this.setState({ modalOpen: false });
  }
  render() {
    console.log("RENDERING DIS TILE ", this.props.challenge);
    return [
      <div className="challenge-tile" onClick={this.onClick}>
        <div className="challenge-tile__title">
          {this.props.challenge.title}
        </div>
        <div className="challenge-tile__category">
          {this.props.challenge.category}
        </div>
      </div>,
      <Modal isOpen={this.state.modalOpen} onRequestClose={this.onModalClose}>
        <div>{this.props.challenge.body}</div>
        <div>
          <form onSubmit={this.onFlagSubmit}>
            <input type="text" id="flag" onChange={this.onFlagFieldChange} />
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
