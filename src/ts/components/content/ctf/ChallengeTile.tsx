import * as React from "react";
import { connect } from "react-redux";
import { State, Challenge, SubmissionStatus, FileDescriptor, ModalID, PopupLocation } from "@cectf/types";
import service from "@cectf/services";
import * as styles from "@styles/content/ctf/challengeTile.scss";
import Popup from "@cectf/components/popups/Popup";

interface ChallengeTileProps {
  loading: boolean;
  challenge: Challenge;
  open: boolean;
  files: FileDescriptor[] | undefined;
}
interface ChallengeTileState {
  flagAttempt: string;
}

class ChallengeTileComponent extends React.Component<
  ChallengeTileProps,
  ChallengeTileState
  > {
  constructor(props: ChallengeTileProps, state: ChallengeTileState) {
    super(props, state);
    this.state = {
      flagAttempt: ""
    };
    this.onClick = this.onClick.bind(this);
    this.onFlagFieldChange = this.onFlagFieldChange.bind(this);
    this.onFlagSubmit = this.onFlagSubmit.bind(this);
  }
  onClick() {
    if (!this.props.open) {
      service.challengeFiles.updateChallengeFiles(this.props.challenge);
    }
    service.challenges.setChallengeIsOpen(this.props.challenge, !this.props.open);
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
          service.popup.info(PopupLocation.CHALLENGE_TILE, "You did it!", this.props.challenge.id);
        } else if (status == SubmissionStatus.INCORRECT) {
          service.popup.error(PopupLocation.CHALLENGE_TILE, "That ain't right. n00b.", this.props.challenge.id);
        } else if (status == SubmissionStatus.ALREADY_SOLVED) {
          service.popup.info(PopupLocation.CHALLENGE_TILE, "You already solved this one!", this.props.challenge.id);
        }
      });
  }
  render() {

    const className = (this.props.challenge.solved)
      ? styles.challengeTileSolved
      : styles.challengeTileUnsolved;

    const bodyClassName = (this.props.open)
      ? styles.challengeTileBodyOpen
      : styles.challengeTileBodyClosed;

    const files = (this.props.files) ? this.props.files.map(file => (
      <li>
        <a href={file.url}>{file.name}</a>
      </li>
    )) : "Loading files...";

    return <div key="tile"
      data-id={String(this.props.challenge.id)}
      data-solved={this.props.challenge.solved}
      className={className}
    >
      <div className={styles.challengeTileHeader} onClick={this.onClick}>
        <div data-id="title"
          className={styles.challengeTileTitle}>
          {this.props.challenge.title}
        </div>
        <div data-id="category"
          className={styles.challengeTileCategory}>
          {this.props.challenge.category}
        </div>
      </div>
      <div
        data-id="body"
        data-open={this.props.open}
        className={bodyClassName}
      >
        <hr />
        <div>{this.props.challenge.body}</div>
        <div>Brought to you by {this.props.challenge.author}</div>
        <div>
          <ul>
            {files}
          </ul>
        </div>
        <div>
          <form onSubmit={this.onFlagSubmit}>
            <Popup location={PopupLocation.CHALLENGE_TILE} locationKey={this.props.challenge.id} />
            <input type="text" data-id="flag" onChange={this.onFlagFieldChange} />
            <button type="submit" data-id="submit" disabled={this.props.loading}>
              Submit
          </button>
          </form>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = (state: State, ownProps: { challenge: Challenge }): { loading: boolean } => {
  return { loading: state.activeRequests.includes("/api/ctf/challenges/" + ownProps.challenge.id) };
}

const ChallengeTile = connect(mapStateToProps)(ChallengeTileComponent);
export default ChallengeTile;