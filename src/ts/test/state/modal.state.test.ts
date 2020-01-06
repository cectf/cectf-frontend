
import * as actions from "@cectf/state/actions";
import { store } from "@cectf/state";
import { ModalID } from "@cectf/types";


afterEach(() => {
    store.dispatch(actions.reset());
});

it("Open keyless modal", () => {
    expect(store.getState().modal).toEqual(null);
    store.dispatch(actions.openModal(ModalID.REGISTER));
    expect(store.getState().modal).toEqual({id: ModalID.REGISTER, index: undefined});
});

it("Close keyless modal", () => {
    expect(store.getState().modal).toEqual(null);
    store.dispatch(actions.openModal(ModalID.REGISTER));
    expect(store.getState().modal).toEqual({id: ModalID.REGISTER, index: undefined});
    store.dispatch(actions.closeModal());
    expect(store.getState().modal).toEqual(null);
});

it("Open keyed modal", () => {
    expect(store.getState().modal).toEqual(null);
    store.dispatch(actions.openModalKey(ModalID.ADMIN_CHALLENGE, 1));
    expect(store.getState().modal).toEqual({id: ModalID.ADMIN_CHALLENGE, index: 1});
});

it("Close keyed modal", () => {
    expect(store.getState().modal).toEqual(null);
    store.dispatch(actions.openModalKey(ModalID.ADMIN_CHALLENGE, 1));
    expect(store.getState().modal).toEqual({id: ModalID.ADMIN_CHALLENGE, index: 1});
    store.dispatch(actions.closeModal());
    expect(store.getState().modal).toEqual(null);
});
