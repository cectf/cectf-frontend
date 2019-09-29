import { combineReducers } from 'redux';
import { Action, ActionId } from './actions';
import { Challenge, User } from "types";

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
        case ActionId.SET_CHALLENGES:
            return action.value;
        case ActionId.ADD_CHALLENGE:
            return [
                ...state,
                action.value
            ];
        case ActionId.UPDATE_CHALLENGE:
            return state.map((challenge, index) => {
                if (challenge.id === action.value.id) {
                    return Object.assign({}, challenge, action.value);
                }
                return challenge;
            })
        default:
            return state;
    }
}

function user(state: User | null = null, action: Action<User | null> ): User | null {
    switch (action.type) {
        case ActionId.SET_USER:
            return action.value;
        default:
            return state;
    }
}

const combinedReducers = combineReducers({
    csrf,
    challenges,
    user
});

const reduxApp = (state: any, action: Action<any>) => {
    if (action.type == ActionId.RESET) {
        state = undefined;
    }
    return combinedReducers(state, action);
}

export default reduxApp;
