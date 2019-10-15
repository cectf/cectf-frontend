import { connect } from "react-redux";
import Popups from "@cectf/components/Popups";
import * as types from "@cectf/types";
import { clearPopups } from "@cectf/state";

const mapStateToProps = (state: types.State) => {
    return { popups: state.popups };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearPopups: () => {
            dispatch(clearPopups());
        }
    };
}


const PopupsContainer = connect(mapStateToProps, mapDispatchToProps)(Popups);
export default PopupsContainer;