import * as React from "react";
import Modal from "@cectf/components/Modal";
import { AdminChallenge, NewAdminChallenge, ModalID } from "@cectf/types";
import * as modalStyles from "@styles/modal/challengeAdmin.scss";

interface AdminChallengeTileProps {
  onSubmit: (challenge: NewAdminChallenge) => void;
  challenge?: AdminChallenge;
  existingChallenges: AdminChallenge[];
}
interface AdminChallengeTileState {
  message: string;
  title: string;
  category: string;
  author: string;
  body: string;
  solution: string;
  previousChallenge: number | null;
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
        author: this.props.challenge.author,
        body: this.props.challenge.body,
        solution: this.props.challenge.solution,
        previousChallenge: this.props.challenge.previousChallenge,
      };
    } else {
      this.state = {
        message: "",
        title: "",
        category: "",
        author: "",
        body: "",
        solution: "",
        previousChallenge: null
      };
    }
  }
  onChange_title = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  }
  onChange_category = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ category: event.target.value });
  }
  onChange_author = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ author: event.target.value });
  }
  onChange_body = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ body: event.target.value });
  }
  onChange_solution = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ solution: event.target.value });
  }
  onChange_previousChallenge = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "") {
      this.setState({ previousChallenge: null });
    } else {
      this.setState({ previousChallenge: parseInt(event.target.value) });
    }
  }
  onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSubmit(this.state);
    this.setState({
      message: "",
      title: "",
      category: "",
      author: "",
      body: "",
      solution: "",
      previousChallenge: null
    });
  }
  render() {
    var index = (this.props.challenge !== undefined)
      ? this.props.challenge.id
      : undefined;
    return <Modal
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
            Author:
              <input
              type="text"
              id="category"
              value={this.state.author}
              onChange={this.onChange_author}
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
            Solution:
              <input
              type="text"
              id="solution"
              value={this.state.solution}
              onChange={this.onChange_solution}
            />
          </div>
          <div>
            Previous Challenge:
              <select value={this.state.previousChallenge || ""} onChange={this.onChange_previousChallenge}>
              <option value="">None</option>
              {this.props.existingChallenges.map(challenge => (
                <option key={challenge.id} value={challenge.id}>{challenge.id}: {challenge.title}</option>
              ))}
            </select>
          </div>
          <div className="modal__message">{this.state.message}</div>
          <button type="submit" id="submit">
            Submit
          </button>
        </form>
      </div>
    </Modal>;
  }
}
