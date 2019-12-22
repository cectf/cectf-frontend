import * as React from "react";
import { connect } from "react-redux";
import { State, Config } from "@cectf/types";
import * as styles from "@styles/title.scss";

interface TitleProps {
  config: Config
}
interface TitleState { }

class TitleComponent extends React.Component<TitleProps, TitleState> {
  constructor(props: TitleProps) {
    super(props);
  }
  render() {
    if (this.props.config.production) {
      return <div className={styles.title}>CECTF{"{}"}</div>;
    } else {
      return <div className={styles.titleStaging}>
        <div className={styles.titleStagingTilt}>STAGING</div>
        <div>CECTF{"{}"}</div>
      </div>;
    }
  }
}

const mapStateToProps = (state: State, ownProps: any): TitleProps => {
  return {
    config: state.config
  };
}

const Title = connect(mapStateToProps)(TitleComponent);
export default Title;