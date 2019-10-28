import * as React from "react";
import * as types from "@cectf/types";
import * as styles from "@styles/popup/popup.scss";

interface PopupProps {
    popup: types.Popup;
}
interface PopupState { };

class Popup extends React.Component<PopupProps, PopupState> {

    render() {
        var className: string;
        switch (this.props.popup.level) {
            case types.PopupLevel.INFO:
                className = styles.info;
                break;
            case types.PopupLevel.ERROR:
            default:
                className = styles.error;
        }
        return <div className={className}>
            {this.props.popup.text}
        </div >;
    }
}

interface PopupsProps {
    popups: types.Popup[];
}
interface PopupsState { }

export default class Popups extends React.Component<PopupsProps, PopupsState> {
    render() {
        return <div id="popups">
            {this.props.popups.map((popup) => { return <Popup popup={popup} /> })}
        </div>;
    }
}
