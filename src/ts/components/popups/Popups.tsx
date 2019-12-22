import * as React from "react";
import { connect } from "react-redux";
import * as types from "@cectf/types";
import { clearPopups } from "@cectf/state";
import Popup from "@cectf/components/popups/Popup";

interface PopupsProps {
    popups: types.Popup[];
}
interface PopupsState { }

class PopupsComponent extends React.Component<PopupsProps, PopupsState> {
    render() {
        return <div id="popups">
            {this.props.popups.map((popup) => {
                return <Popup key={popup.date.toString()} popup={popup} />
            })}
        </div>;
    }
}

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


const Popups = connect(mapStateToProps, mapDispatchToProps)(PopupsComponent);
export default Popups;