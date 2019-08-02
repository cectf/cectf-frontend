import * as React from "react";

export interface HelloProps {}
export interface HelloState {}

export class Hello extends React.Component<HelloProps, HelloState> {
  render() {
    return (
      <div>
        <div>
          <a href="/login">Return to login</a>
        </div>
        <div>Current token: {localStorage.getItem("token")}</div>
      </div>
    );
  }
}
