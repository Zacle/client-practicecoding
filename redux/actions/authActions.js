import {AUTHENTICATE,
    DEAUTHENTICATE,
    AUTHENTICATION_FAILED
} from '../ActionTypes';
import axios from 'axios';
import { API } from '../../config';
import { setCookie, removeCookie } from '../../utils/cookie';
import Router from 'next/router';
import {API_ERRORS} from '../../utils/httpError';
import {HTTPStatusCodes} from '../../utils/httpCode';


/**
 * authenticate action to pass to the reducer
 * @param {*} result 
 */
export const authenticateUser = (result) => {
    return {
        type: AUTHENTICATE,
        payload: {
            token: result.token,
            isLoggedIn: true,
            errMsg: null,
            user: {
                _id: result.user._id,
                email: result.user.email,
                username: result.user.username
            }
        }
    }
}

export const deauthenticateUser = () => {
    return {
        type: DEAUTHENTICATE
    }
}

/**
 * Get the token from the API and stores it in the store and cookie
 * @param {*} user user info to authenticate
 */
export const login = user => dispatch => {
    return axios.post(`${API}/users/login`,
            user,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log("DATA: ", response.data);
                let auth = {
                    token: response.data.token,
                    isLoggedIn: true,
                    user: {
                        _id: response.data.user._id,
                        email: response.data.user.email,
                        username: response.data.user.username
                    }
                };
                setCookie("auth", auth);
                Router.push("/");
                dispatch(authenticateUser(response.data));
            })
            .catch((err) => {
                if (err.response) {
                    switch (err.response.status) {
                        case HTTPStatusCodes.REQUEST_TIMEOUT:
                            return dispatch(authenticationFailed(API_ERRORS.REQUEST_TIMEOUT.message));
                        case HTTPStatusCodes.INTERNAL_SERVER_ERROR:
                            return dispatch(authenticationFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                        default :
                            return dispatch(authenticationFailed(err.response.data));
                    }
                }
                else if (err.request) {
                    dispatch(authenticationFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(authenticationFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

export const authenticationFailed = (errMsg) => {
    return {
        type: AUTHENTICATION_FAILED,
        payload: errMsg.err || errMsg
    }
}

/**
 * Reauthenticate user from the server
 * @param {*} auth 
 */
export const reauthenticate = auth => {
    return (dispatch) => {
        dispatch(authenticateUser(JSON.parse(decodeURIComponent(auth))));
    }
}

/**
 * Remove the token from the cookie and log out the user
 */
export const deauthenticate = () => {
    return async dispatch => {
        removeCookie("auth");
        Router.push("/");
        dispatch(deauthenticateUser());
    }
}

/**
 * Register the user and display login page
 * @param {*} user 
 */
export const register = user => dispatch => {
    return axios.post(`${API}/users/signup`,
            user,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                Router.push("/login");
            })
            .catch((err) => {
                if (err.response) {
                    switch (err.response.status) {
                        case HTTPStatusCodes.REQUEST_TIMEOUT:
                            return dispatch(authenticationFailed(API_ERRORS.REQUEST_TIMEOUT.message));
                        case HTTPStatusCodes.INTERNAL_SERVER_ERROR:
                            return dispatch(authenticationFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                        default:
                            return dispatch(authenticationFailed(err.response.data));
                    }
                }
                else if (err.request) {
                    dispatch(authenticationFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(authenticationFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}