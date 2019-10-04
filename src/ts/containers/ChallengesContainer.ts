import { connect } from "react-redux";
import Challenges from "components/ctf/Challenges";
import { State, Challenge } from "types";


const mapStateToProps = (state: State, ownProps: any): { challenges: Challenge[] } => {
    return {
        challenges: state.challenges
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

const ChallengesContainer = connect(
    mapStateToProps)
    //mapDispatchToProps)
    (Challenges);
export default ChallengesContainer;