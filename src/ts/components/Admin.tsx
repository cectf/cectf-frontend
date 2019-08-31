import * as React from "react";

interface AdminProps {}
interface AdminState {}

export default class Admin extends React.Component<AdminProps, AdminState> {
  constructor(props: AdminProps) {
    super(props);
  }
  render() {
    return <div>This is the admin page!</div>;
  }
}
