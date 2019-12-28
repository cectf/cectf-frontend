import * as log from 'loglevel';
import { store, addPopup, removePopup } from "@cectf/state";
import { Popup, PopupLevel } from "@cectf/types";

var popupKey = 0;
var timeout: number = 5000;

const setPopupTimeout = (newTimeout: number) => {
    timeout = newTimeout;
}

const pop = function (popup: Popup) {
    store.dispatch(addPopup(popup));
    return new Promise(resolve => {
        setTimeout(() => {
            store.dispatch(removePopup(popup));
            resolve();
        }, timeout)
    });
}

const info = function (info: string) {
    log.debug("Popping info \"%s\"", info);
    return pop({
        key: popupKey++,
        date: new Date(),
        level: PopupLevel.INFO,
        text: info
    });
}

const error = function (error: string) {
    log.debug("Popping error \"%s\"", error);
    return pop({
        key: popupKey++,
        date: new Date(),
        level: PopupLevel.ERROR,
        text: error
    });
}

export default { info, error, setPopupTimeout };