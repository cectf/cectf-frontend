import * as React from "react";
// import { ChallengeTile } from "./ChallengeTile";
import { Challenges } from "./Challenges";

export interface AppRootProps {
  userId: number;
}

export class AppRoot extends React.Component<AppRootProps, {}> {
  render() {
    return (
      <div id="appRoot" className="root">
        <div id="logout">
          <a href="/login">Log out</a>
        </div>
        <Challenges />
      </div>
    );
  }
}
