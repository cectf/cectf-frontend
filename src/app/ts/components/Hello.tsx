import * as React from "react";

export interface HelloProps {}
export interface HelloState {}

export class Hello extends React.Component<HelloProps, HelloState> {
  render() {
    return <div>Current token: {localStorage.getItem("token")}</div>;
  }
}
