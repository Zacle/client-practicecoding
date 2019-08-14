import {
    FETCH_TEAMS,
    FETCH_TEAMS_FAILED,
    DELETE_TEAM,
    DELETE_TEAM_FAILED,
    IS_LOADING,
    ADD_TEAM,
    ADD_TEAM_FAILED,
    FETCH_TEAM,
    FETCH_TEAM_FAILED,
    REMOVE_USER_FROM_TEAM,
    REMOVE_USER_FROM_TEAM_FAILED,
    ADD_USER_TO_TEAM,
    ADD_USER_TO_TEAM_FAILED
} from '../ActionTypes';
import axios from 'axios';
import { API } from '../../config';
import {API_ERRORS} from '../../utils/httpError';


export const isLoading = () => {
    return {
        type: IS_LOADING
    };
}

/**
 * Save user's teams to the redux store
 * @param {*} teams 
 */
export const saveTeams = teams => {
    return {
        type: FETCH_TEAMS,
        payload: teams
    };
}

/**
 * Failed to save user's teams to the redux store
 * @param {*} err 
 */
export const saveTeamsFailed = err => {
    return {
        type: FETCH_TEAMS_FAILED,
        payload: err
    };
}

/**
 * Get user's teams from the database
 * @param {*} username 
 */
export const fetchTeams = username => dispatch => {
    dispatch(isLoading());
    return axios.get(`${API}/teams/my`,
            {
                params: {
                    username: username
                },
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then(response => dispatch(saveTeams(response.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveTeamsFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveTeamsFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveTeamsFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Remove a team from the user's teams in the redux store
 * @param {*} id 
 */
export const removeTeam = id => {
    return {
        type: DELETE_TEAM,
        payload: id
    };
}

/**
 * Failed to remove the team from redux store
 * @param {*} err 
 */
export const removeTeamFailed = err => {
    return {
        type: DELETE_TEAM_FAILED,
        payload: err
    };
}

/**
 * Delete team from database
 * @param {*} id 
 * @param {*} token 
 */
export const deleteTeam = (id, token) => dispatch => {
    return axios.delete(`${API}/teams/${id}`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispatch(removeTeam(result.data._id)))
            .catch(err => dispatch(removeTeamFailed("Failed to delete the team. Try again later!")));
}

/**
 * Add a new team to the redux store
 * @param {*} team 
 */
export const addTeam = team => {
    return {
        type: ADD_TEAM,
        payload: team
    };
}

/**
 * Failed to add a team
 * @param {*} err 
 */
export const addTeamFailed = err => {
    return {
        type: ADD_TEAM_FAILED,
        payload: err
    };
}

/**
 * Post a team to the database and push it to the redux store
 * @param {*} name 
 * @param {*} token 
 */
export const postTeam = (name, token) => dispatch => {
    return axios.post(`${API}/teams`,
            {
                name: name
            },
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispatch(addTeam(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(addTeamFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(addTeamFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(addTeamFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Save a specific team to the redux store
 * @param {*} team 
 */
export const saveTeam = team => {
    return {
        type: FETCH_TEAM,
        payload: team
    };
}

/**
 * Failed to save this team to the redux store
 * @param {*} err 
 */
export const saveTeamFailed = err => {
    return {
        type: FETCH_TEAM_FAILED,
        payload: err
    };
}

/**
 * get this team from the database
 * @param {*} id 
 */
export const fetchTeam = id => dispatch => {
    dispatch(isLoading());
    return axios.get(`${API}/teams/${id}`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then(result => dispatch(saveTeam(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveTeamFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveTeamFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveTeamFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Remove a user from the team in the redux store
 * @param {*} id 
 */
export const removeUser = id => {
    return {
        type: REMOVE_USER_FROM_TEAM,
        payload: id
    };
}

/**
 * Failed to remove user from team in the redux store
 * @param {*} err 
 */
export const removeUserFailed = err => {
    return {
        type: REMOVE_USER_FROM_TEAM_FAILED,
        payload: err
    };
}

/**
 * Delete this user from this team
 * @param {*} id 
 * @param {*} userID 
 * @param {*} token 
 */
export const deleteUser = (id, userID, token) => dispatch => {
    return axios.delete(`${API}/teams/${id}/members`,
            {
                params: {
                    uid: userID
                },
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispatch(removeUser(result.data)))
            .catch(err => dispatch(removeUserFailed("Failed to delete this user")));
}

/**
 * Add a user to the team and save it to the redux store
 * @param {*} team 
 */
export const saveUser = team => {
    return {
        type: ADD_USER_TO_TEAM,
        payload: team
    };
}

/**
 * Failed to add the user to the team
 * @param {*} err 
 */
export const saveUserFailed = err => {
    return {
        type: ADD_USER_TO_TEAM_FAILED,
        payload: err
    };
}

/**
 * Add the user to the team
 * @param {*} id 
 * @param {*} userID 
 * @param {*} token 
 */
export const addUser = (id, userID, token) => dispatch => {
    return axios.post(`${API}/teams/${id}/members`,
            {
                uid: userID
            },
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispatch(saveUser(result.data)))
            .catch(err => dispatch(saveUserFailed("Failed to add the user to team. Try agin later!")));
}