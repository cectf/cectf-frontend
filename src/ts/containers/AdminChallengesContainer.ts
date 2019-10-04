import { connect } from "react-redux";
import AdminChallenges from "components/admin/AdminChallenges";
import { State, AdminChallenge } from "types";


const mapStateToProps = (state: State, ownProps: any): { challenges: AdminChallenge[] } => {
    return {
        challenges: state.adminChallenges
    };
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

const AdminChallengesContainer = connect(
    mapStateToProps)
    //mapDispatchToProps)
    (AdminChallenges);
export default AdminChallengesContainer;