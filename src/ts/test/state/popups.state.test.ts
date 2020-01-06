
import * as actions from "@cectf/state/actions";
import { store } from "@cectf/state";
import { Popup, PopupLevel, PopupLocation } from "@cectf/types";

const topPopup1: Popup = {
    level: PopupLevel.INFO,
    text: "Informative",
    location: PopupLocation.TOP_BAR
}
const topPopup2: Popup = {
    level: PopupLevel.ERROR,
    text: "Erroneous",
    location: PopupLocation.TOP_BAR
}

const signupPopup1: Popup = {
    level: PopupLevel.INFO,
    text: "informative",
    location: PopupLocation.SIGNUP
}

const signupPopup2: Popup = {
    level: PopupLevel.ERROR,
    text: "Erroneous",
    location: PopupLocation.SIGNUP
}

afterEach(() => {
    store.dispatch(actions.reset());
});

it("add popup", () => {
    expect(store.getState().popups.get(PopupLocation.TOP_BAR)).toEqual(undefined);
    expect(store.getState().popups.get(PopupLocation.SIGNUP)).toEqual(undefined);
    store.dispatch(actions.addPopup(topPopup1));
    expect(store.getState().popups.get(PopupLocation.TOP_BAR)).toEqual(topPopup1);
    expect(store.getState().popups.get(PopupLocation.SIGNUP)).toEqual(undefined);
});

it("overwrite popup", () => {
    store.dispatch(actions.addPopup(topPopup1));
    expect(store.getState().popups.get(PopupLocation.TOP_BAR)).toEqual(topPopup1);
    expect(store.getState().popups.get(PopupLocation.SIGNUP)).toEqual(undefined);
    store.dispatch(actions.addPopup(topPopup2));
    expect(store.getState().popups.get(PopupLocation.TOP_BAR)).toEqual(topPopup2);
    expect(store.getState().popups.get(PopupLocation.SIGNUP)).toEqual(undefined);
});

it("add popup to multiple locations", () => {
    expect(store.getState().popups.get(PopupLocation.TOP_BAR)).toEqual(undefined);
    expect(store.getState().popups.get(PopupLocation.SIGNUP)).toEqual(undefined);
    store.dispatch(actions.addPopup(topPopup1));
    store.dispatch(actions.addPopup(signupPopup1));
    expect(store.getState().popups.get(PopupLocation.TOP_BAR)).toEqual(topPopup1);
    expect(store.getState().popups.get(PopupLocation.SIGNUP)).toEqual(signupPopup1);
});

it("remove popup", () => {
    store.dispatch(actions.addPopup(topPopup1));
    expect(store.getState().popups.get(PopupLocation.TOP_BAR)).toEqual(topPopup1);
    expect(store.getState().popups.get(PopupLocation.SIGNUP)).toEqual(undefined);
    store.dispatch(actions.removePopup(PopupLocation.TOP_BAR));
    expect(store.getState().popups.get(PopupLocation.TOP_BAR)).toEqual(undefined);
    expect(store.getState().popups.get(PopupLocation.SIGNUP)).toEqual(undefined);
});

it("remove popup from only one location", () => {
    store.dispatch(actions.addPopup(topPopup1));
    store.dispatch(actions.addPopup(signupPopup2));
    expect(store.getState().popups.get(PopupLocation.TOP_BAR)).toEqual(topPopup1);
    expect(store.getState().popups.get(PopupLocation.SIGNUP)).toEqual(signupPopup2);
    store.dispatch(actions.removePopup(PopupLocation.TOP_BAR));
    expect(store.getState().popups.get(PopupLocation.TOP_BAR)).toEqual(undefined);
    expect(store.getState().popups.get(PopupLocation.SIGNUP)).toEqual(signupPopup2);
});

it("remove nonexistent popup", () => {
    store.dispatch(actions.addPopup(topPopup1));
    expect(store.getState().popups.get(PopupLocation.TOP_BAR)).toEqual(topPopup1);
    expect(store.getState().popups.get(PopupLocation.SIGNUP)).toEqual(undefined);
    store.dispatch(actions.removePopup(PopupLocation.SIGNUP));
    expect(store.getState().popups.get(PopupLocation.TOP_BAR)).toEqual(topPopup1);
    expect(store.getState().popups.get(PopupLocation.SIGNUP)).toEqual(undefined);
});

it("clear popups", () => {
    store.dispatch(actions.addPopup(topPopup1));
    store.dispatch(actions.addPopup(signupPopup1));
    expect(store.getState().popups.get(PopupLocation.TOP_BAR)).toEqual(topPopup1);
    expect(store.getState().popups.get(PopupLocation.SIGNUP)).toEqual(signupPopup1);
    store.dispatch(actions.clearPopups());
    expect(store.getState().popups.get(PopupLocation.TOP_BAR)).toEqual(undefined);
    expect(store.getState().popups.get(PopupLocation.SIGNUP)).toEqual(undefined);
});