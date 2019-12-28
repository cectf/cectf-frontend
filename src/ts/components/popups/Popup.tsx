import * as React from "react";
import * as types from "@cectf/types";
import * as styles from "@styles/popup/popup.scss";

interface PopupProps {
    popup: types.Popup;
}
interface PopupState { };

export default class Popup extends React.Component<PopupProps, PopupState> {

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
        return <div className={className} data-level={this.props.popup.level}>
            {this.props.popup.text}
        </div >;
    }
}