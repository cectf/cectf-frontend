import * as React from "react";
import { connect } from "react-redux";
import * as types from "@cectf/types";
import { clearPopups } from "@cectf/state";
import * as styles from "@styles/popup/popup.scss";

interface PopupProps {
    popup: types.Popup | undefined;
    location: types.PopupLocation;
    locationKey?: any;
}
interface PopupState { };

class PopupComponent extends React.Component<PopupProps, PopupState> {

    render() {
        if (this.props.popup) {

            var className: string;
            switch (this.props.popup.level) {
                case types.PopupLevel.INFO:
                    className = styles.popupInfo;
                    break;
                case types.PopupLevel.ERROR:
                    className = styles.popupError;
                    break;
                default:
                    className = "";
            }

            return <div className={styles.popupContainerVisible}>
                <div
                    className={className}
                    data-location={this.props.location}
                    data-location-key={this.props.locationKey}
                    data-level={this.props.popup.level}>
                    {this.props.popup.text}
                </div >
            </div>;
        } else {
            return <div className={styles.popupContainerInvisible}>
                <div
                    data-location={this.props.location}
                    data-location-key={this.props.locationKey}
                    data-level="">
                </div >
            </div>;
        }
    }
}

const mapStateToProps = (state: types.State, ownProps: { location: types.PopupLocation, locationKey?: any }): PopupProps => {
    const popup = state.popups.get(ownProps.location);
    if (popup) {
        if (ownProps.locationKey === popup.locationKey) {
            return { popup: popup, location: ownProps.location, locationKey: ownProps.locationKey };
        }
    }
    return { popup: undefined, location: ownProps.location, locationKey: ownProps.locationKey };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        clearPopups: () => {
            dispatch(clearPopups());
        }
    };
}

const Popup = connect(mapStateToProps, mapDispatchToProps)(PopupComponent);
export default Popup;