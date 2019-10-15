
import { store, addPopup, removePopup } from "@cectf/state";
import { Popup, PopupLevel } from "@cectf/types";

const pop = function (popup: Popup) {
    popup.date = new Date();
    store.dispatch(addPopup(popup));
    setTimeout(() => {
        store.dispatch(removePopup(popup));
    }, 3000);
}

const info = function (error: string) {
    return pop({
        date: new Date(),
        level: PopupLevel.INFO,
        text: error
    });
}

const error = function (error: string) {
    return pop({
        date: new Date(),
        level: PopupLevel.ERROR,
        text: error
    });
}

export default { info, error };