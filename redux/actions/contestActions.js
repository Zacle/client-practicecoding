import {
    ADD_CONTEST,
    ADD_CONTEST_FAILED,
    FETCH_COMING_CONTESTS,
    FETCH_COMING_CONTESTS_FAILED,
    FETCH_RUNNING_CONTESTS,
    FETCH_RUNNING_CONTESTS_FAILED,
    FETCH_PAST_CONTESTS,
    FETCH_PAST_CONTESTS_FAILED,
    FETCH_USER_COMING_CONTESTS,
    FETCH_USER_COMING_CONTESTS_FAILED,
    FETCH_USER_PAST_CONTESTS,
    FETCH_USER_PAST_CONTESTS_FAILED,
    FETCH_USER_RUNNING_CONTESTS,
    FETCH_USER_RUNNING_CONTESTS_FAILED
} from '../ActionTypes';
import axios from 'axios';
import { API } from '../../config';
import {API_ERRORS} from '../../utils/httpError';


/**
 * Add the newly created contest to the redux store
 * @param {*} contest 
 */
export const saveContest = contest => {
    return {
        type: ADD_CONTEST,
        payload: contest
    };
}

/**
 * Failed to add the new contest to the redux store
 */
export const saveContestFailed = err => {
    return {
        type: ADD_CONTEST_FAILED,
        payload: err
    };
}

/**
 * Create a new contest and save to the database
 * @param {*} contest 
 * @param {*} token 
 */
export const createContest = (contest, token) => dispatch => {
    return axios.post(`${API}/contests`,
            contest,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispatch(saveContest(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveContestFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveContestFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveContestFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Save coming contests to the redux store
 * @param {*} contests 
 */
export const saveComingContests = contests => {
    return {
        type: FETCH_COMING_CONTESTS,
        payload: contests
    };
}

/**
 * Failed to save coming contests to the redux store
 * @param {*} err 
 */
export const saveComingContestsFailed = err => {
    return {
        type: FETCH_COMING_CONTESTS_FAILED,
        payload: err
    };
}

/**
 * Fetch coming contests from the database
 */
export const fetchComingContests = () => dispatch => {
    return axios.get(`${API}/contests/coming`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then(result => dispatch(saveComingContests(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveComingContestsFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveComingContestsFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveComingContestsFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Save running contests to the redux store
 * @param {*} contests 
 */
export const saveRunningContests = contests => {
    return {
        type: FETCH_RUNNING_CONTESTS,
        payload: contests
    };
}

/**
 * Failed to save running contests to the redux store
 * @param {*} err 
 */
export const saveRunningContestsFailed = err => {
    return {
        type: FETCH_RUNNING_CONTESTS_FAILED,
        payload: err
    };
}

/**
 * Fetch running contests from the database
 */
export const fetchRunningContests = () => dispatch => {
    return axios.get(`${API}/contests/running`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then(result => dispatch(saveRunningContests(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveRunningContestsFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveRunningContestsFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveRunningContestsFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}


/**
 * Save past contests to the redux store
 * @param {*} contests 
 */
export const savePastContests = contests => {
    return {
        type: FETCH_PAST_CONTESTS,
        payload: contests
    };
}

/**
 * Failed to save past contests to the redux store
 * @param {*} err 
 */
export const savePastContestsFailed = err => {
    return {
        type: FETCH_PAST_CONTESTS_FAILED,
        payload: err
    };
}

/**
 * Fetch past contests from the database
 */
export const fetchPastContests = (page) => dispatch => {
    return axios.get(`${API}/contests/past`,
            {
                params: {
                    page: page
                },
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then(result => dispatch(savePastContests(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(savePastContestsFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(savePastContestsFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(savePastContestsFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Save coming contests of the user to the redux store
 * @param {*} contests 
 */
export const saveUserComingContest = contests => {
    return {
        type: FETCH_USER_COMING_CONTESTS,
        payload: contests
    };
}

/**
 * Failed to save coming contests
 * @param {*} err 
 */
export const saveUserComingContestFailed = err => {
    return {
        type: FETCH_USER_COMING_CONTESTS_FAILED,
        payload: err
    };
}

/**
 * Fetch user coming contests from the database
 * @param {*} username 
 */
export const fetchUSerComingContests = username => dispatch => {
    return axios.get(`${API}/contests/mycoming`,
            {
                params: {
                    username: username
                },
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then(result => dispatch(saveUserComingContest(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveUserComingContestFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveUserComingContestFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveUserComingContestFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Save running contests of the user to the redux store
 * @param {*} contests 
 */
export const saveUserRunningContest = contests => {
    return {
        type: FETCH_USER_RUNNING_CONTESTS,
        payload: contests
    };
}

/**
 * Failed to save running contests
 * @param {*} err 
 */
export const saveUserRunningContestFailed = err => {
    return {
        type: FETCH_USER_RUNNING_CONTESTS_FAILED,
        payload: err
    };
}

/**
 * Fetch user runing contests from the database
 * @param {*} username 
 */
export const fetchUSerRunningContests = username => dispatch => {
    return axios.get(`${API}/contests/myrunning`,
            {
                params: {
                    username: username
                },
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then(result => dispatch(saveUserRunningContest(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveUserRunningContestFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveUserRunningContestFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveUserRunningContestFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Save past contests of the user to the redux store
 * @param {*} contests 
 */
export const saveUserPastContest = contests => {
    return {
        type: FETCH_USER_PAST_CONTESTS,
        payload: contests
    };
}

/**
 * Failed to save past contests
 * @param {*} err 
 */
export const saveUserPastContestFailed = err => {
    return {
        type: FETCH_USER_PAST_CONTESTS_FAILED,
        payload: err
    };
}

/**
 * Fetch user past contests from the database
 * @param {*} username 
 */
export const fetchUSerPastContests = username => dispatch => {
    return axios.get(`${API}/contests/mypast`,
            {
                params: {
                    username: username
                },
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then(result => dispatch(saveUserPastContest(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveUserPastContestFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveUserPastContestFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveUserPastContestFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}