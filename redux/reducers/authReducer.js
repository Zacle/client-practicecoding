import {AUTHENTICATE,
    DEAUTHENTICATE, 
    AUTHENTICATION_FAILED,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_FAILED,
    REGISTER,
    REGISTER_FAILED
} from '../ActionTypes';
import { getCookie } from '../../utils/cookie';

let initialState;
if (typeof localStorage !== "undefined") {
    const authCookie = getCookie('auth');
    if (authCookie) {
        initialState = JSON.parse(decodeURIComponent(authCookie));
    } else {
        initialState = {
            token: null,
            isLoggedIn: false,
            errMsg: null,
            user: null,
            forgot: null,
            reset: null
        }
    }
} else {
    initialState = {
        token: null,
        isLoggedIn: false,
        errMsg: null,
        user: null,
        forgot: null,
        reset: null,
        register: null,
        registerFailed: null
    };
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return Object.assign({}, state, 
                {
                    token: action.payload.token,
                    isLoggedIn: action.payload.isLoggedIn,
                    user: action.payload.user
                });
        case DEAUTHENTICATE:
            return {...state, token: null, isLoggedIn: false, user: null};
        case AUTHENTICATION_FAILED:
            return {...state, errMsg: action.payload};
        case FORGOT_PASSWORD_FAILED:
            return {...state, forgot: action.payload};
        case RESET_PASSWORD_FAILED:
            return {...state, reset: action.payload};
        case REGISTER:
                return {...state, register: action.payload};
        case REGISTER_FAILED:
                return {...state, registerFailed: action.payload};
        default:
            return state;
    }
}