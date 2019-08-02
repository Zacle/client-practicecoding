import {AUTHENTICATE, DEAUTHENTICATE, AUTHENTICATION_FAILED} from '../ActionTypes';
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
            user: {}
        }
    }
} else {
    initialState = {
        token: null,
        isLoggedIn: false,
        errMsg: null,
        user: {}
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
            return {...state, token: null, isLoggedIn: false, user: {}};
        case AUTHENTICATION_FAILED:
                return {...state, errMsg: action.payload};
        default:
                return state;
    }
}