import {
    USER_INFO,
    USER_INFO_FAILED,
    UPDATE_PASSWORD,
    UPDATE_PASSWORD_FAILED,
    UPDATE_EMAIL,
    UPDATE_EMAIL_FAILED
} from '../ActionTypes';
import axios from 'axios';
import { API } from '../../config';
import {API_ERRORS} from '../../utils/httpError';
import {HTTPStatusCodes} from '../../utils/httpCode';


/**
 * Send the returned user to the reducer
 * @param {*} user 
 */
export const saveUser = user => {
    return {
        type: USER_INFO,
        payload: user
    };
}

/**
 * Failed to get the user
 * @param {*} user 
 */
export const saveUserFailed = error => {
    return {
        type: USER_INFO_FAILED,
        payload: error
    };
}

/**
 * Password updated successfully
 * @param {*} message 
 */
export const passwordUpdated = message => {
    return {
        type: UPDATE_PASSWORD,
        payload: message
    };
}

/**
 * Password couldn't be updated
 * @param {*} error 
 */
export const passwordUpdatedFailed = error => {
    return {
        type: UPDATE_PASSWORD_FAILED,
        payload: error
    };
}

/**
 * Get the username from the backend and save it to the store
 * @param {*} username 
 */
export const getUser = username => dispatch => {
    return axios.get(`${API}/users/username/${username}`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                dispatch(saveUser(response.data));
            })
            .catch((err => {
                if (err.response) {
                    switch (err.response.status) {
                        case HTTPStatusCodes.REQUEST_TIMEOUT:
                            return dispatch(saveUserFailed(API_ERRORS.REQUEST_TIMEOUT.message));
                        case HTTPStatusCodes.INTERNAL_SERVER_ERROR:
                            return dispatch(saveUserFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                        case HTTPStatusCodes.NOT_FOUND:
                            return dispatch(saveUserFailed(API_ERRORS.USER_NOT_FOUND.message));
                        default:
                            return dispatch(saveUserFailed(API_ERRORS.GENERAL_ERROR.message));
                    }
                }
                else if (err.request) {
                    dispatch(saveUserFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveUserFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            }));
}

/**
 * Update the user password and respond with an informative message about the update
 * @param {*} password 
 * @param {*} token 
 */
export const updatePassword = (password, token) => dispatch => {
    return axios.post(`${API}/users/account/password`,
            password,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => dispatch(passwordUpdated("Password updated")))
            .catch((err) => dispatch(passwordUpdatedFailed("Failed to update password. Try again!")));
}

export const updateInfo = (info, token) => dispatch => {
    return axios.post(`${API}/users/account/profile`,
            info,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => dispatch(saveUser(response.data)))
            .catch(err => dispatch(saveUserFailed("Couldn't update info")));
}

/**
 * Email updated successfully
 * @param {*} message 
 */
export const emailUpdated = message => {
    return {
        type: UPDATE_EMAIL,
        payload: message
    };
}

/**
 * Email couldn't be updated
 * @param {*} error 
 */
export const emailUpdatedFailed = error => {
    return {
        type: UPDATE_EMAIL_FAILED,
        payload: error
    };
}

/**
 * Update user's email to the new email provided
 * @param {*} email 
 * @param {*} token 
 */
export const updateEmail = (email, token) => dispatch => {
    return axios.post(`${API}/users/account/resetEmail`,
            email,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispatch(emailUpdated(result.data)))
            .catch((err) => {
                if (err.response) {
                    dispatch(emailUpdatedFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(emailUpdatedFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(emailUpdatedFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}