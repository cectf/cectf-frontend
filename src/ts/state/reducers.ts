import { combineReducers } from 'redux';
import { Action, ActionId } from '@cectf/state/actions';
import { State, Config, Challenge, AdminChallenge, User, NavPage, Popup, ModalKey, DEFAULT_CONFIG, FileDescriptor, ChallengeData, PopupLocation } from "@cectf/types";

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

function adminChallenges(state: AdminChallenge[] = [], action: Action<AdminChallenge & AdminChallenge[] & number>): AdminChallenge[] {
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
            });
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

function challenges(state: ChallengeData[] = [], action: Action<ChallengeData & Challenge[]>): ChallengeData[] {
    switch (action.type) {
        case ActionId.CTF_SET_CHALLENGES:
            return action.value.map(challenge => { return { data: challenge, open: false } });
        case ActionId.CTF_UPDATE_CHALLENGE:
            return state.map(challenge => {
                if (challenge.data.id === action.value.data.id) {
                    return Object.assign({}, challenge, action.value);
                }
                return challenge;
            })
        default:
            return state;
    }
}

function config(state: Config = DEFAULT_CONFIG, action: Action<Config>): Config {
    switch (action.type) {
        case ActionId.UPDATE_CONFIG:
            return action.value;
        default:
            return state;
    }
}

function csrf(state = "", action: Action<string>): string {
    switch (action.type) {
        case ActionId.SET_CSRF:
            return action.value;
        default:
            return state;
    }
}

function files(state = new Map<number, FileDescriptor[]>(), action: Action<{ id: number, files: FileDescriptor[] }>) {
    switch (action.type) {
        case ActionId.SET_CHALLENGE_FILES:
            state = new Map(state);
            return state.set(action.value.id, action.value.files);
        default:
            return state;
    }
}

function modal(state: ModalKey | null = null, action: Action<ModalKey & undefined>): ModalKey | null {
    switch (action.type) {
        case ActionId.OPEN_MODAL:
            return action.value;
        case ActionId.CLOSE_MODAL:
            return null;
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

function popups(state: Map<PopupLocation, Popup> = new Map(), action: Action<Popup & PopupLocation>): Map<PopupLocation, Popup> {
    switch (action.type) {
        case ActionId.ADD_POPUP:
            state = new Map(state);
            state.set(action.value.location, action.value);
            return state;
        case ActionId.REMOVE_POPUP:
            const popup = state.get(action.value);
            if (popup) {
                state = new Map(state);
                state.delete(action.value);
            }
            return state;
        case ActionId.CLEAR_POPUPS:
            return new Map();
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

const combinedReducers = combineReducers({
    activeRequests,
    adminChallenges,
    config,
    csrf,
    challenges,
    files,
    modal,
    navPage,
    popups,
    user
});

const reduxApp = (state: State | undefined, action: Action<any>): State => {
    if (action.type == ActionId.RESET) {
        state = undefined;
    }
    return combinedReducers(state, action);
}

export default reduxApp;
