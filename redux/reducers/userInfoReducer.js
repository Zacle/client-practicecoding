import {
    USER_INFO,
    USER_INFO_FAILED,
    UPDATE_PASSWORD,
    UPDATE_PASSWORD_FAILED,
    UPDATE_EMAIL,
    UPDATE_EMAIL_FAILED
} from '../ActionTypes';


let initialState = {
    user: null,
    error: null,
    password: null,
    email: null
};

export const userInfoReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_INFO:
            return {...state, user: action.payload};
        case USER_INFO_FAILED: 
            return {...state, error: action.payload};
        case UPDATE_PASSWORD:
            return {...state, password: action.payload};
        case UPDATE_PASSWORD_FAILED:
            return {...state, error: action.payload};
        case UPDATE_EMAIL:
            return {...state, email: action.payload};
        case UPDATE_EMAIL_FAILED:
            return {...state, error: action.payload}
        default: 
            return state;
    }
}