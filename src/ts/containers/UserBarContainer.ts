import { connect } from "react-redux";
import UserBar from "@cectf/components/UserBar";
import { State, User } from "@cectf/types";


const mapStateToProps = (state: State): { user?: User } => {
    if (state.user) {
        return {user: state.user};
    }
    return {};
}

const UserBarContainer = connect(
    mapStateToProps)
    (UserBar);
export default UserBarContainer;