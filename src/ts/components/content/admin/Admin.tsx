import * as React from "react";
import AdminChallengesContainer from "@cectf/components/content/admin/AdminChallengesContainer";

interface AdminProps {}
interface AdminState {}

export default class Admin extends React.Component<AdminProps, AdminState> {
  constructor(props: AdminProps) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>This is the admin page!</div>
        <AdminChallengesContainer />
      </div>
    );
  }
}
