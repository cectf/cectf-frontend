import * as log from 'loglevel';
import { store, addPopup, removePopup } from "@cectf/state";
import { PopupLevel, PopupLocation } from "@cectf/types";

/**
 * Creates a new info popup
 * 
 * @param location where to pop the popup
 * @param info the string to pop
 * @param locationKey optional. The key value of the popup
 */
const info = (location: PopupLocation, info: string, locationKey?: any) => {
    log.debug("Popping info \"%s\"", info);
    const popup = {
        level: PopupLevel.INFO,
        text: info,
        location: location,
        locationKey: locationKey
    };
    store.dispatch(addPopup(popup));
}

/**
 * Creates a new error popup
 * 
 * @param location where to pop the popup
 * @param error the string to pop
 * @param locationKey optional. The key value of the popup
 */
const error = (location: PopupLocation, error: string, locationKey?: any) => {
    log.debug("Popping error \"%s\"", error);
    const popup = {
        level: PopupLevel.ERROR,
        text: error,
        location: location,
        locationKey: locationKey
    };
    store.dispatch(addPopup(popup));
}

/**
 * Removes the popup from a location, if one exists
 * 
 * @param location where to remove the popup from
 */
const remove = (location: PopupLocation) => {
    log.debug("Removing any popups from %s", location);
    store.dispatch(removePopup(location));
}

export default { info, error, remove };