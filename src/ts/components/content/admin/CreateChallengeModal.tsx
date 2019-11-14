import * as React from "react";
import Modal from "@cectf/components/Modal";
import { AdminChallenge, NewAdminChallenge, ModalID } from "@cectf/types";
import * as modalStyles from "@styles/modal/challengeAdmin.scss";

interface AdminChallengeTileProps {
  onSubmit: (challenge: NewAdminChallenge) => void;
  challenge?: AdminChallenge;
}
interface AdminChallengeTileState {
  message: string;
  title: string;
  category: string;
  body: string;
  hint: string;
  solution: string;
}

export default class CreateChallengeModal extends React.Component<
  AdminChallengeTileProps,
  AdminChallengeTileState
  > {
  constructor(props: AdminChallengeTileProps, state: AdminChallengeTileState) {
    super(props, state);
    if (this.props.challenge) {
      this.state = {
        message: "",
        title: this.props.challenge.title,
        category: this.props.challenge.category,
        body: this.props.challenge.body,
        hint: this.props.challenge.hint,
        solution: this.props.challenge.solution
      };
    } else {
      this.state = {
        message: "",
        title: "",
        category: "",
        body: "",
        hint: "",
        solution: ""
      };
    }
  }
  onChange_title = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  }
  onChange_category = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ category: event.target.value });
  }
  onChange_body = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ body: event.target.value });
  }
  onChange_hint = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ hint: event.target.value });
  }
  onChange_solution = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ solution: event.target.value });
  }
  onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSubmit(this.state);
  }
  render() {
    var index = (this.props.challenge !== undefined)
      ? this.props.challenge.id
      : undefined;
    return (
      <Modal
        id={ModalID.ADMIN_CHALLENGE}
        index={index}
        className={modalStyles.challengeAdminModal}>
        <div className={modalStyles.challengeAdminModalContent}>
          <form onSubmit={this.onSubmit}>
            <div>
              Title:
              <input
                type="text"
                id="title"
                value={this.state.title}
                onChange={this.onChange_title}
              />
            </div>
            <div>
              Category:
              <input
                type="text"
                id="category"
                value={this.state.category}
                onChange={this.onChange_category}
              />
            </div>
            <div>
              Body:
              <input
                type="text"
                id="body"
                value={this.state.body}
                onChange={this.onChange_body}
              />
            </div>
            <div>
              Hint:
              <input
                type="text"
                id="hint"
                value={this.state.hint}
                onChange={this.onChange_hint}
              />
            </div>
            <div>
              Solution:
              <input
                type="text"
                id="solution"
                value={this.state.solution}
                onChange={this.onChange_solution}
              />
            </div>
            <div className="modal__message">{this.state.message}</div>
            <button type="submit" id="submit">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    );
  }
}
