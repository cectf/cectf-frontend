import * as React from "react";

interface AboutProps {}
interface AboutState {}

export default class About extends React.Component<AboutProps, AboutState> {
  constructor(props: AboutProps) {
    super(props);
  }
  render() {
    return <div>This is the About page!</div>;
  }
}
