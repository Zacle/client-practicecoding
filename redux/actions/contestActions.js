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
    FETCH_USER_RUNNING_CONTESTS_FAILED,
    FETCH_CONTEST, 
    FETCH_CONTEST_FAILED,
    UPDATE_CONTEST,
    UPDATE_CONTEST_FAILED,
    DELETE_CONTEST,
    DELETE_CONTEST_FAILED,
    FETCH_SUBMISSIONS,
    FETCH_SUBMISSIONS_FAILED,
    FETCH_PROBLEMS,
    FETCH_PROBLEMS_FAILED,
    FETCH_CONTEST_REGISTRANTS,
    FETCH_CONTEST_REGISTRANTS_FAILED,
    FETCH_CONTEST_STANDING,
    FETCH_CONTEST_STANDING_FAILED,
    DELETE_PROBLEM,
    DELETE_CONTEST_USER,
    DELETE_CONTEST_TEAM,
    IS_LOADING,
    CREATE_GROUP_CONTEST,
    CREATE_GROUP_CONTEST_FAILED
} from '../ActionTypes';
import axios from 'axios';
import { API } from '../../config';
import {API_ERRORS} from '../../utils/httpError';
import Router from 'next/router';


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
 * Add the newly created contest to the redux store
 * @param {*} contest 
 */
export const saveGroupContest = contest => {
    return {
        type: CREATE_GROUP_CONTEST,
        payload: contest
    };
}

/**
 * Failed to add the new contest to the redux store
 */
export const saveGroupContestFailed = err => {
    return {
        type: CREATE_GROUP_CONTEST_FAILED,
        payload: err
    };
}

/**
 * Create a new group contest and save to the database
 * @param {*} contest 
 * @param {*} token 
 */
export const createGroupContest = (contest, id, token) => dispatch => {
    return axios.post(`${API}/groups/${id}/createcontest`,
            contest,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispatch(saveGroupContest(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveGroupContestFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveGroupContestFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveGroupContestFailed(API_ERRORS.GENERAL_ERROR.message));
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

/**
 * Get the contest and save to the redux store
 * @param {*} contest 
 */
export const getContest = contest => {
    return {
        type: FETCH_CONTEST,
        payload: contest
    };
}

/**
 * Failed to get the contest
 * @param {*} err 
 */
export const getContestFailed = err => {
    return {
        type: FETCH_CONTEST_FAILED,
        payload: err
    };
}

/**
 * Get the contest from the database
 * @param {*} id 
 */
export const fetchContest = id => dispatch => {
    return axios.get(`${API}/contests/${id}`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then(result => dispatch(getContest(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(getContestFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(getContestFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(getContestFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Edit contest info 
 * @param {*} contest 
 */
export const editContest = contest => {
    return {
        type: UPDATE_CONTEST,
        payload: contest
    };
}

/**
 * Failed to update contest info
 * @param {*} err 
 */
export const editContestFailed = err => {
    return {
        type: UPDATE_CONTEST_FAILED,
        payload: err
    };
}

/**
 * Update contest info in the database
 * @param {*} id 
 * @param {*} contest 
 * @param {*} token 
 */
export const update = (id, contest, token) => dispatch => {
    return axios.put(`${API}/contests/${id}`,
            contest,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispatch(editContest(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(editContestFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(editContestFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(editContestFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Remove this contest from the redux store
 * @param {*} contest 
 */
export const removeContest = contest => {
    return {
        type: DELETE_CONTEST,
        payload: contest
    };
}

/**
 * Failed to remove this contest from the redux store
 * @param {*} err 
 */
export const removeContestFailed = err => {
    return {
        type: DELETE_CONTEST_FAILED,
        payload: err
    };
}

/**
 * Delete contest from the database
 * @param {*} id 
 * @param {*} token 
 */
export const deleContest = (id, token) => dispatch => {
    return axios.delete(`${API}/contests/${id}`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => {
                dispatch(removeContest(result.data))
            })
            .catch(err => {
                if (err.response) {
                    alert(err.response.data);
                }
                else if (err.request) {
                    alert(API_ERRORS.INTERNAL_SERVER_ERROR.message);
                }
                else {
                    alert(API_ERRORS.GENERAL_ERROR.message);
                }
            });
}

/**
 * Save contest submissions to the redux store
 * @param {*} submissions 
 */
export const saveSubmissions = submissions => {
    return {
        type: FETCH_SUBMISSIONS,
        payload: submissions
    };
}

/**
 * Failed to save contest submissions to the redux store
 * @param {*} err 
 */
export const saveSubmissionsFailed = err => {
    return {
        type: FETCH_SUBMISSIONS_FAILED,
        payload: err
    };
}

/**
 * Fetch contest submissions from the database
 * @param {*} id 
 */
export const fetchSubmissions = id => dispatch => {
    return axios.get(`${API}/contests/${id}/submissions`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then(result => dispatch(saveSubmissions(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveSubmissionsFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveSubmissionsFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveSubmissionsFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Save contest problems to the redux store
 * @param {*} problems 
 */
export const saveProblems = (problems) => {
    return {
        type: FETCH_PROBLEMS,
        payload: problems
    };
}

/**
 * Failed to save contest problems
 * @param {*} err 
 */
export const saveProblemsFailed = err => {
    return {
        type: FETCH_PROBLEMS_FAILED,
        payload: err
    };
}

/**
 * Fetch contest problems from the database
 * @param {*} id 
 */
export const fetchProblems = id => dispatch => {
    return axios.get(`${API}/contests/${id}/problems`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then(result => dispatch(saveProblems(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveProblemsFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveProblemsFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveProblemsFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Save contest registrants to the redux store
 * @param {*} registrants 
 */
export const saveRegistrants = registrants => {
    return {
        type: FETCH_CONTEST_REGISTRANTS,
        payload: registrants
    };
}

/**
 * Failed to save contest registrants
 * @param {*} err 
 */
export const saveRegistrantsFailed = err => {
    return {
        type: FETCH_CONTEST_REGISTRANTS_FAILED,
        payload: err
    };
}

/**
 * Fetch contest registrants from the database
 * @param {*} id 
 */
export const fetchRegistrants = id => dispatch => {
    return axios.get(`${API}/contests/${id}/registrants`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then(result => dispatch(saveRegistrants(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveRegistrantsFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveRegistrantsFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveRegistrantsFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Save contest standing to the redux store
 * @param {*} standing 
 */
export const saveStanding = standing => {
    return {
        type: FETCH_CONTEST_STANDING,
        payload: standing
    };
}

/**
 * Failed to save contest standing
 * @param {*} err 
 */
export const saveStandingFailed = err => {
    return {
        type: FETCH_CONTEST_STANDING_FAILED,
        payload: err
    };
}

/**
 * Fetch contest standing from the database
 * @param {*} id 
 * @param {*} page 
 */
export const fetchStanding = id => dispatch => {
    return axios.get(`${API}/contests/${id}/standing`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then(result => dispatch(saveStanding(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveStandingFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveStandingFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveStandingFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Standing loading
 */
export const isLoading = () => {
    return {
        type: IS_LOADING
    };
}

/**
 * Update contest standing from the database
 * @param {*} id 
 * @param {*} page 
 */
export const updateStanding = id => dispatch => {
    dispatch(isLoading());
    return axios.get(`${API}/contests/${id}/update`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then(result => dispatch(saveStanding(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveStandingFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveStandingFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveStandingFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Add a specific problem to the contest
 * @param {*} id 
 * @param {*} problem 
 * @param {*} token 
 */
export const addSpecificProblem = async (id, problem, token) => {
    try {
        const result = await axios.post(`${API}/contests/${id}/specificproblem`, {problem: problem}, {
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        return alert("Problem added");
    }
    catch (err) {
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
 * Add problems from a codeforces contest to the contest
 * @param {*} id 
 * @param {*} problem 
 * @param {*} token 
 */
export const addCodeforcesContest = async (id, contestID, token) => {
    try {
        const result = await axios.post(`${API}/contests/${id}/codeforcecontest`, {id: contestID}, {
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        return alert("Problems added");
    }
    catch (err) {
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
 * Add problems from a uva contest to the contest
 * @param {*} id 
 * @param {*} problem 
 * @param {*} token 
 */
export const addUvaContest = async (id, problems, token) => {
    try {
        const result = await axios.post(`${API}/contests/${id}/uvacontest`, {problem: problems}, {
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        return alert("Problems added");
    }
    catch (err) {
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
 * Add problems from an existing contest to the contest
 * @param {*} id 
 * @param {*} problem 
 * @param {*} token 
 */
export const addExistingContest = async (id, existingID, token) => {
    try {
        const result = await axios.post(`${API}/contests/${id}/existingcontest`, {id: existingID}, {
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        return alert("Problems added");
    }
    catch (err) {
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
 * Register user to the contest
 * @param {*} id 
 * @param {*} username 
 * @param {*} token 
 */
export const registerUser = async (id, username, token) => {
    try {
        const result = await axios.post(`${API}/contests/${id}/registerUser`, {username: username}, {
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        Router.push(`/contests/${id}/registrants`);
    }
    catch (err) {
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
 * Register team to the contest
 * @param {*} id 
 * @param {*} teamID 
 * @param {*} token 
 */
export const registerTeam = async (id, teamID, token) => {
    try {
        const result = await axios.post(`${API}/contests/${id}/registerTeam`, {teamID: teamID}, {
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        Router.push(`/contests/${id}/registrants`);
    }
    catch (err) {
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
 * Remove a problem fromthe redux store
 * @param {*} id 
 */
export const removeProblem = id => {
    return {
        type: DELETE_PROBLEM,
        payload: id
    };
}

/**
 * Delete the problem from the database
 * @param {*} id 
 * @param {*} pid 
 * @param {*} token 
 */
export const deleteProblem = (id, pid, token) => dispatch => {
    return axios.delete(`${API}/contests/${id}/problems/${pid}`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispatch(removeProblem(pid)))
            .catch(err => {
                if (err.response) {
                    alert(err.response.data);
                }
                else if (err.request) {
                    alert(API_ERRORS.INTERNAL_SERVER_ERROR.message);
                }
                else {
                    alert(API_ERRORS.GENERAL_ERROR.message);
                }
            });
}

/**
 * Remove user from the contest
 * @param {*} id 
 */
export const removeContestUser = id => {
    return {
        type: DELETE_CONTEST_USER,
        payload: id
    };
}

/**
 * Delete a user from the contest
 * @param {*} id 
 * @param {*} userID 
 * @param {*} token 
 */
export const deleteUser = (id, userID, token) => dispatch => {
    return axios.delete(`${API}/contests/${id}/unregisterUser`,
            {
                params: {
                    userID: userID
                },
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispatch(removeContestUser(userID)))
            .catch(err => {
                if (err.response) {
                    alert(err.response.data);
                }
                else if (err.request) {
                    alert(API_ERRORS.INTERNAL_SERVER_ERROR.message);
                }
                else {
                    alert(API_ERRORS.GENERAL_ERROR.message);
                }
            });
}

/**
 * Remove team from the contest
 * @param {*} id 
 */
export const removeContestTeam = id => {
    return {
        type: DELETE_CONTEST_TEAM,
        payload: id
    };
}

/**
 * Delete a team from the contest
 * @param {*} id 
 * @param {*} teamID 
 * @param {*} token 
 */
export const deleteTeam = (id, teamID, token) => dispatch => {
    return axios.delete(`${API}/contests/${id}/unregisterTeam`,
            {
                params: {
                    teamID: teamID
                },
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispatch(removeContestTeam(teamID)))
            .catch(err => {
                if (err.response) {
                    alert(err.response.data);
                }
                else if (err.request) {
                    alert(API_ERRORS.INTERNAL_SERVER_ERROR.message);
                }
                else {
                    alert(API_ERRORS.GENERAL_ERROR.message);
                }
            });
}