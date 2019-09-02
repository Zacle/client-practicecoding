import axios from 'axios';
import { API } from '../../config';
import {API_ERRORS} from '../../utils/httpError';
import Router from 'next/router';
import {
    FETCH_SOURCE,
    FETCH_SOURCE_FAILED,
    FETCH_USER_CODES,
    FETCH_USER_CODES_FAILED,
    DELETE_CODE
} from '../ActionTypes';

/**
 * Save source code to the database
 * @param {*} data 
 * @param {*} token 
 */
export const postCode = async (data, token) => {
    try {
        let result = await axios.post(`${API}/editor`, data, {
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        Router.replace(`/editor/${result.data.uri}`);
    }
    catch(err) {
        if (err.response) {
            alert(err.response.data);
        }
        else if (err.request) {
            alert(API_ERRORS.INTERNAL_SERVER_ERROR.message);
        }
        else {
            alert(API_ERRORS.GENERAL_ERROR.message);
        }
    }
}

/**
 * Save source code to the database
 * @param {*} uri 
 */
export const putCode = (data, uri, token) => dispacth => {
    return axios.put(`${API}/editor/${uri}`, data,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => {
                alert("Saved");
                dispacth(saveSource(result.data));
            })
            .catch(err => {
                if (err.response) {
                    dispacth(saveSourceFailed(err.response.data));
                }
                else if (err.request) {
                    dispacth(saveSourceFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispacth(saveSourceFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Save source code to the redux store
 * @param {*} source 
 */
export const saveSource = source => {
    return {
        type: FETCH_SOURCE,
        payload: source
    };
}

/**
 * Failed to save source code to the redux store
 * @param {*} err 
 */
export const saveSourceFailed = err => {
    return {
        type: FETCH_SOURCE_FAILED,
        payload: err
    };
}

/**
 * Get source code from the database
 * @param {*} uri 
 */
export const getCode = uri => dispacth => {
    return axios.get(`${API}/editor/${uri}`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then(result => dispacth(saveSource(result.data)))
            .catch(err => {
                if (err.response) {
                    dispacth(saveSourceFailed(err.response.data));
                }
                else if (err.request) {
                    dispacth(saveSourceFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispacth(saveSourceFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Save user source codes to the redux store
 * @param {*} codes 
 */
export const saveCodes = codes => {
    return {
        type: FETCH_USER_CODES,
        payload: codes
    };
}

/**
 * Failed to save user source codes
 * @param {*} err 
 */
export const saveCodesFailed = err => {
    return {
        type: FETCH_USER_CODES_FAILED,
        payload: err
    };
}

/**
 * Get user codes from the database
 * @param {*} token 
 */
export const fetchCodes = token => dispacth => {
    return axios.get(`${API}/editor/my`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispacth(saveCodes(result.data)))
            .catch(err => {
                if (err.response) {
                    dispacth(saveCodesFailed(err.response.data));
                }
                else if (err.request) {
                    dispacth(saveCodesFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispacth(saveCodesFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Delete a source code
 * @param {*} id 
 * @param {*} token 
 */
export const deleteCode = (id, token) => dispacth => {
    return axios.delete(`${API}/editor/${id}`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispacth(saveCodes(result.data)))
            .catch(err => {
                if (err.response) {
                    alert(err.response.data);
                }
                else if (err.request) {
                    alert(API_ERRORS.INTERNAL_SERVER_ERROR.message);
                }
                else {
                    aler(API_ERRORS.GENERAL_ERROR.message);
                }
            });
}