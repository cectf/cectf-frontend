import * as React from "react";
// import { ChallengeTile } from "./ChallengeTile";
import { Challenges } from "components/Challenges";
import { LoginForm } from "components/Login";

export interface AppRootProps {
  userId: number;
}

export class AppRoot extends React.Component<AppRootProps, {}> {
  render() {
    return (
      <div id="appRoot" className="root">
        <LoginForm />
        <div id="logout">
          <a href="/login">Log out</a>
        </div>
        <Challenges />
      </div>
    );
  }
}
