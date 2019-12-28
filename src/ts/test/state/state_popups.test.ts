
import * as actions from "@cectf/state/actions";
import { store } from "@cectf/state";
import { Popup, PopupLevel } from "@cectf/types";

var popup1: Popup = {
    key: 0,
    date: new Date(),
    level: PopupLevel.INFO,
    text: "Informative"
}

var popup2: Popup = {
    key: 1,
    date: new Date(),
    level: PopupLevel.ERROR,
    text: "Erroneous"
}

afterEach(() => {
    store.dispatch(actions.reset());
});

it("add popup", () => {
    expect(store.getState().popups).toEqual([]);
    store.dispatch(actions.addPopup(popup1));
    expect(store.getState().popups).toEqual([popup1]);
});

it("add multiple popups", () => {
    expect(store.getState().popups).toEqual([]);
    store.dispatch(actions.addPopup(popup1));
    store.dispatch(actions.addPopup(popup2));
    expect(store.getState().popups).toEqual([popup1, popup2]);
});

it("remove popup", () => {
    expect(store.getState().popups).toEqual([]);
    store.dispatch(actions.addPopup(popup1));
    expect(store.getState().popups).toEqual([popup1]);
    store.dispatch(actions.removePopup(popup1));
    expect(store.getState().popups).toEqual([]);
});

it("remove old popup", () => {
    expect(store.getState().popups).toEqual([]);
    store.dispatch(actions.addPopup(popup1));
    store.dispatch(actions.addPopup(popup2));
    expect(store.getState().popups).toEqual([popup1, popup2]);
    store.dispatch(actions.removePopup(popup1));
    expect(store.getState().popups).toEqual([popup2]);
});

it("remove nonexistent popup", () => {
    expect(store.getState().popups).toEqual([]);
    store.dispatch(actions.addPopup(popup1));
    expect(store.getState().popups).toEqual([popup1]);
    store.dispatch(actions.removePopup(popup2));
    expect(store.getState().popups).toEqual([popup1]);
});

it("clear popups", () => {
    expect(store.getState().popups).toEqual([]);
    store.dispatch(actions.addPopup(popup1));
    store.dispatch(actions.addPopup(popup2));
    expect(store.getState().popups).toEqual([popup1, popup2]);
    store.dispatch(actions.clearPopups());
    expect(store.getState().popups).toEqual([]);
});