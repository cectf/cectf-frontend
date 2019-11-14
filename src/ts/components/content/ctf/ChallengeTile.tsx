import * as React from "react";
import { connect } from "react-redux";
import { State, Challenge, SubmissionStatus, FileDescriptor, ModalID } from "@cectf/types";
import service from "@cectf/services";
import api from "@cectf/api";
import Modal from "@cectf/components/Modal";
import * as styles from "@styles/content/ctf/challengeTile.scss";
import * as modalStyles from "@styles/modal/challenge.scss";
import { store, openModalKey } from "@cectf/state";

interface ChallengeTileProps {
  loading: boolean;
  challenge: Challenge;
}
interface ChallengeTileState {
  message: string;
  files: FileDescriptor[];
  flagAttempt: string;
}

class ChallengeTileComponent extends React.Component<
  ChallengeTileProps,
  ChallengeTileState
  > {
  constructor(props: ChallengeTileProps, state: ChallengeTileState) {
    super(props, state);
    this.state = {
      message: "",
      files: [],
      flagAttempt: ""
    };
    this.onClick = this.onClick.bind(this);
    this.onFlagFieldChange = this.onFlagFieldChange.bind(this);
    this.onFlagSubmit = this.onFlagSubmit.bind(this);
  }
  onClick() {
    api.challengeFiles.getFiles(this.props.challenge.id).then(files => {
      this.setState({ files: files });
    });
    store.dispatch(openModalKey(ModalID.CHALLENGE, this.props.challenge.id));
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
  render() {

    var className = (this.props.challenge.solved)
      ? styles.challengeTileSolved
      : styles.challengeTileUnsolved;

    var solution = (this.props.challenge.solved)
      ? <div data-id="solution"
        className={styles.challengeTileFlag}>
        Flag: {this.props.challenge.solution}
      </div>
      : undefined;

    return [
      <div key="tile"
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
      <Modal key="modal"
        id={ModalID.CHALLENGE}
        index={this.props.challenge.id}
        className={modalStyles.challengeModal}>
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
              <button type="submit" id="submit" disabled={this.props.loading}>
                Submit
            </button>
            </form>
          </div>
        </div>
      </Modal>
    ];
  }
}

const mapStateToProps = (state: State, ownProps: { challenge: Challenge }): { loading: boolean } => {
  return { loading: state.activeRequests.includes("/api/ctf/challenges/" + ownProps.challenge.id) };
}

const ChallengeTile = connect(mapStateToProps)(ChallengeTileComponent);
export default ChallengeTile;