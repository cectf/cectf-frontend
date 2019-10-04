import { connect } from "react-redux";
import UserBar from "components/UserBar";
import { State, User } from "types";


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