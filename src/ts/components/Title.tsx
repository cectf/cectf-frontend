import * as React from "react";
import * as styles from "@styles/title.scss";

interface TitleProps {}
interface TitleState {}

export default class Title extends React.Component<TitleProps, TitleState> {
  constructor(props: TitleProps) {
    super(props);
  }
  render() {
    return <div className={styles.title}>CECTF{"{}"}</div>;
  }
}
