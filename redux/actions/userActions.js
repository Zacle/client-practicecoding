import {
    USER_INFO,
    USER_INFO_FAILED
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