import {AUTHENTICATE, DEAUTHENTICATE, AUTHENTICATION_FAILED} from '../ActionTypes';
import axios from 'axios';
import { API } from '../../config';
import { setCookie, removeCookie } from '../../utils/cookie';
import Router from 'next/router';


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
                setCookie("auth", {
                    token: response.data.token,
                    isLoggedIn: true,
                    user: {
                        _id: response.data.user._id,
                        email: response.data.user.email,
                        username: response.data.user.username
                    }
                });
                Router.push("/");
                dispatch(authenticateUser(response.data));
            })
            .catch((err) => {
                console.log("Login Error: ", err.response.data);
                dispatch(authenticationFailed(err.response.data));
            });
}

export const authenticationFailed = (errMsg) => {
    return {
        type: AUTHENTICATION_FAILED,
        payload: errMsg
    }
}

/**
 * Reauthenticate user from the server
 * @param {*} auth 
 */
export const reauthenticate = auth => {
    return (dispatch) => {
        dispatch(authenticateUser(auth));
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
                console.log("DATA: ", response.data);
                Router.push("/login");
            })
            .catch((err) => {
                console.log("Login Error: ", err.response.data);
                dispatch(authenticationFailed(err.response.data));
            });
}