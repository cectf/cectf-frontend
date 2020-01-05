import * as log from 'loglevel';
import { store, addPopup, removePopup } from "@cectf/state";
import { Popup, PopupLevel, PopupLocation } from "@cectf/types";

var popupKey = 0;

const info = (location: PopupLocation, info: string, locationKey?: any) => {
    log.debug("Popping info \"%s\"", info);
    const popup = {
        key: popupKey++,
        level: PopupLevel.INFO,
        text: info,
        location: location,
        locationKey: locationKey
    };
    store.dispatch(addPopup(popup));
}

const error = (location: PopupLocation, error: string, locationKey?: any) => {
    log.debug("Popping error \"%s\"", error);
    const popup = {
        key: popupKey++,
        level: PopupLevel.ERROR,
        text: error,
        location: location,
        locationKey: locationKey
    };
    store.dispatch(addPopup(popup));
}

const remove = (location: PopupLocation) => {
    log.debug("Removing any popups from %s", location);
    store.dispatch(removePopup(location));
}

export default { info, error, remove };