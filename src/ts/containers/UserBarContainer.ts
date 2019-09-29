import { connect } from "react-redux";
import UserBar from "components/UserBar";
import { Role, NavPage, User } from "types";


const mapStateToProps = (state: any, ownProps: any): User | null => {
    return state.user;
}
/* 
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        onClick: () => {
            dispatch(ownProps.filter)
        }
    };
}
*/

const UserBarContainer = connect(
    mapStateToProps)
    //mapDispatchToProps)
    (UserBar);
export default UserBarContainer;