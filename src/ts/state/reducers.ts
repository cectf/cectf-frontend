import { combineReducers } from 'redux';
import { Action, ActionId } from './actions';
import { State, Challenge, AdminChallenge, User, NavPage } from "types";

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

const combinedReducers = combineReducers({
    csrf,
    challenges,
    adminChallenges,
    user,
    navPage
});

const reduxApp = (state: State | undefined, action: Action<any>): State => {
    if (action.type == ActionId.RESET) {
        state = undefined;
    }
    return combinedReducers(state, action);
}

export default reduxApp;
