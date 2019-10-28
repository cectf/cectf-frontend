import * as React from "react";
import * as styles from "@styles/footer.scss";

interface FooterProps { }
interface FooterState { }

export default class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props);
  }
  render() {
    return <div className={styles.footer}>
      <div>
        Owned and maintained by Daniel Chiquito &lt;daniel.chiquito@gmail.com&gt;
        </div>
      <div>
        Please contact me with any suggestions, bugs, or new challenges!
      </div>
    </div>;
  }
}
