import * as React from "react";
// import { ChallengeTile } from "./ChallengeTile";
import { Challenges } from "./Challenges";

var userId = 1;

export class AppRoot extends React.Component<{}, {}> {
  render() {
    return (
      <div id="appRoot" className="root">
        <div id="logout">
          <a href="/login">Log out</a>
        </div>
        <Challenges userId={userId} />
      </div>
    );
  }
}
