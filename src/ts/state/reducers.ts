import { combineReducers } from 'redux';
import { Action, ActionId } from '@cectf/state/actions';
import { State, Challenge, AdminChallenge, User, NavPage, Popup, ModalID, ModalKey } from "@cectf/types";

function csrf(state = "", action: Action<string>): string {
    switch (action.type) {
        case ActionId.SET_CSRF:
            return action.value;
        default:
            return state;
    }
}

function challenges(state: Challenge[] = [], action: Action<Challenge & Challenge[]>): Challenge[] {
    switch (action.type) {
        case ActionId.CTF_SET_CHALLENGES:
            return action.value;
        case ActionId.CTF_UPDATE_CHALLENGE:
            return state.map(challenge => {
                if (challenge.id === action.value.id) {
                    return Object.assign({}, challenge, action.value);
                }
                return challenge;
            })
        default:
            return state;
    }
}

function adminChallenges(state: AdminChallenge[] = [], action: Action<AdminChallenge & AdminChallenge[]>): AdminChallenge[] {
    switch (action.type) {
        case ActionId.ADMIN_SET_CHALLENGES:
            return action.value;
        case ActionId.ADMIN_ADD_CHALLENGE:
            return [
                ...state,
                action.value
            ];
        case ActionId.ADMIN_UPDATE_CHALLENGE:
            return state.map(challenge => {
                if (challenge.id === action.value.id) {
                    return Object.assign({}, challenge, action.value);
                }
                return challenge;
            })
        case ActionId.ADMIN_DELETE_CHALLENGE:
            return state.reduce((sum: AdminChallenge[], challenge) => {
                if (action.value !== challenge) {
                    return sum.concat([challenge]);
                }
                return sum;
            }, []);
        default:
            return state;
    }
}

function user(state: User | null = null, action: Action<User | null>): User | null {
    switch (action.type) {
        case ActionId.SET_USER:
            return action.value;
        default:
            return state;
    }
}

function navPage(state: NavPage = NavPage.ABOUT, action: Action<NavPage>): NavPage {
    switch (action.type) {
        case ActionId.SET_NAV_PAGE:
            return action.value;
        default:
            return state;
    }
}

function popups(state: Popup[] = [], action: Action<Popup>): Popup[] {
    switch (action.type) {
        case ActionId.ADD_POPUP:
            return state.concat(action.value);
        case ActionId.REMOVE_POPUP:
            var index = state.indexOf(action.value);
            if (index > -1) {
                return state.slice(0, index).concat(state.slice(index + 1, state.length));
            }
            return state;
        case ActionId.CLEAR_POPUPS:
            return [];
        default:
            return state;
    }
}

function activeRequests(state: string[] = [], action: Action<string>): string[] {
    switch (action.type) {
        case ActionId.START_REQUEST:
            return state.concat(action.value);
        case ActionId.FINISH_REQUEST:
            var index = state.indexOf(action.value);
            if (index > -1) {
                return state.slice(0, index).concat(state.slice(index + 1, state.length));
            }
            return state;
        default:
            return state;
    }
}

function modal(state: ModalKey | null = null, action: Action<ModalKey | undefined>): ModalKey | null {
    switch (action.type) {
        case ActionId.OPEN_MODAL:
            console.log("OPEN", state, action.value);
            return action.value || null;
        case ActionId.CLOSE_MODAL:
            console.log("CLOSE", state, action.value);
            return null;
        default:
            return state;
    }
}

const combinedReducers = combineReducers({
    csrf,
    challenges,
    adminChallenges,
    user,
    navPage,
    popups,
    activeRequests,
    modal
});

const reduxApp = (state: State | undefined, action: Action<any>): State => {
    if (action.type == ActionId.RESET) {
        state = undefined;
    }
    return combinedReducers(state, action);
}

export default reduxApp;
