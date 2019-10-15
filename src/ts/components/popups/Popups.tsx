import * as React from "react";
import * as types from "@cectf/types";

interface PopupProps {
    popup: types.Popup;
}
interface PopupState { };

class Popup extends React.Component<PopupProps, PopupState> {

    render() {
        return <div className={this.props.popup.level}>
            {this.props.popup.text}
        </div>;
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
