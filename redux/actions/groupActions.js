import {
    FETCH_USER_GROUPS,
    FETCH_USER_GROUPS_FAILED,
    ADD_GROUP,
    ADD_GROUP_FAILED,
    FETCH_GROUPS,
    FETCH_GROUPS_FAILED,
    FETCH_GROUP,
    FETCH_GROUP_FAILED,
    UPDATE_GROUP,
    UPDATE_GROUP_FAILED,
    DELETE_GROUP,
    FETCH_GROUP_MEMBERS,
    FETCH_GROUP_MEMBERS_FAILED,
    ADD_USER_TO_GROUP,
    REMOVE_USER_FROM_GROUP,
    REMOVE_USER_FROM_GROUP_FAILED,
    ADD_USER_TO_GROUP_FAILED
} from '../ActionTypes';
import axios from 'axios';
import { API } from '../../config';
import {API_ERRORS} from '../../utils/httpError';
import Router from 'next/router';


/**
 * Save user's groups to the redux store
 * @param {*} groups 
 */
export const saveUserGroups = groups => {
    return {
        type: FETCH_USER_GROUPS,
        payload: groups
    };
}

/**
 * Failed to save user's groups to the redux store
 * @param {*} err 
 */
export const saveUserGroupsFailed = err => {
    return {
        type: FETCH_USER_GROUPS_FAILED,
        payload: err
    };
}

/**
 * Get user's groupsfrom the database
 * @param {*} username 
 */
export const fetchUserGroups = username => dispatch => {
    return axios.get(`${API}/groups/my`,
            {
                params: {
                    username: username
                },
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then(result => dispatch(saveUserGroups(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveUserGroupsFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveUserGroupsFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveUserGroupsFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Save newly created group to the redux store
 * @param {*} group 
 */
export const saveGroup = group => {
    return {
        type: ADD_GROUP,
        payload: group
    };
}

/**
 * Failed to save new group to the redux store
 * @param {*} err 
 */
export const saveGroupFailed = err => {
    return {
        type: ADD_GROUP_FAILED,
        payload: err
    };
}

/**
 * Create a new group and save to the database
 * @param {*} group 
 * @param {*} token 
 */
export const addGroup = (group, token) => dispatch => {
    return axios.post(`${API}/groups`,
            {
                name: group.name,
                access: group.access,
                description: group.description
            },
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispatch(saveGroup(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveGroupFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveGroupFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveGroupFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Save all public groups to the redux store
 * @param {*} groups 
 */
export const saveGroups = groups => {
    return {
        type: FETCH_GROUPS,
        payload: groups
    };
}

/**
 * Failed to save public groups
 * @param {*} err 
 */
export const saveGroupsFailed = err => {
    return {
        type: FETCH_GROUPS_FAILED,
        payload: err
    };
}

/**
 * Get all public groups
 */
export const fetchGroups = () => dispatch => {
    return axios.get(`${API}/groups`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                }
            })
            .then(result => dispatch(saveGroups(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveGroupsFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveGroupsFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveGroupsFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Get a specific group and save to the redux
 * @param {*} group 
 */
export const getGroup = group => {
    return {
        type: FETCH_GROUP,
        payload: group
    };
}

/**
 * Failed to get a specific group
 * @param {*} group 
 */
export const getGroupFailed = err => {
    return {
        type: FETCH_GROUP_FAILED,
        payload: err
    };
}

/**
 * Get group from the database
 * @param {*} id 
 * @param {*} username 
 * @param {*} token 
 */
export const fetchGroup = (id, username, token) => dispatch => {
    return axios.get(`${API}/groups/${id}`,
    {
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(result => {
        const group = result.data;
        let isIn = false;
        for (let i = 0; i < group.members.length; i++) {
            const member = group.members[i];
            if (member.user.username === username) {
                isIn = true;
                break;
            }
        }
        if (!isIn) {
            Router.push(`/groups/${id}/join`);
        }
        else {
            dispatch(getGroup(group));
        }
    })
    .catch(err => {
        if (err.response) {
            dispatch(getGroupFailed(err.response.data));
        }
        else if (err.request) {
            dispatch(getGroupFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
        }
        else {
            dispatch(getGroupFailed(API_ERRORS.GENERAL_ERROR.message));
        }
    });
}

/**
 * Get group from the database
 * @param {*} id 
 * @param {*} username 
 * @param {*} token 
 */
export const fetchJoinGroup = (id, token) => dispatch => {
    return axios.get(`${API}/groups/${id}`,
    {
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(result => dispatch(getGroup(result.data)))
    .catch(err => {
        if (err.response) {
            dispatch(getGroupFailed(err.response.data));
        }
        else if (err.request) {
            dispatch(getGroupFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
        }
        else {
            dispatch(getGroupFailed(API_ERRORS.GENERAL_ERROR.message));
        }
    });
}

/**
 * Update the in group in the redux store
 * @param {*} group 
 */
export const updateGroup = group => {
    return {
        type: UPDATE_GROUP,
        payload: UPDATE_GROUP_FAILED
    };
}

/**
 * Failed to update group in the redux store
 * @param {*} err 
 */
export const updateGroupFailed = err => {
    return {
        type: UPDATE_GROUP_FAILED,
        payload: err
    };
}

/**
 * Update group info saved to the database
 * @param {} query 
 * @param {*} id 
 * @param {*} token 
 */
export const updateInfo = (query, id, token) => dispatch => {
    return axios.put(`${API}/groups/${id}`,
            query,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispatch(updateGroup(result)))
            .catch(err => dispatch(updateGroupFailed("Failed to update group info. Try again later!")));
}

/**
 * Delete a group from the redux store
 * @param {*} id 
 */
export const removeGroup = id => {
    return {
        type: DELETE_GROUP,
        payload: id
    };
}

/**
 * Delete group from the database
 * @param {*} id 
 * @param {*} token 
 */
export const deleteGroup = (id, token) => dispatch => {
    return axios.delete(`${API}/groups/${id}`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispatch(removeGroup(result.data._id)))
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
 * save group members to the redux store
 * @param {*} members 
 */
export const saveMembers = members => {
    return {
        type: FETCH_GROUP_MEMBERS,
        payload: members
    };
}

/**
 * Failed to save group members to the redux store
 * @param {*} err 
 */
export const saveMembersFailed = err => {
    return {
        type: FETCH_GROUP_MEMBERS_FAILED,
        payload: err
    };
}

/**
 * Get group members from the database
 * @param {*} id 
 * @param {*} token 
 */
export const fetchMembers = (id, username, token) => dispatch => {
    return axios.get(`${API}/groups/${id}/members`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => {
                const group = result.data;
                let isIn = false;
                for (let i = 0; i < group.members.length; i++) {
                    const member = group.members[i];
                    if (member.user.username === username) {
                        isIn = true;
                        break;
                    }
                }
                if (!isIn) {
                    Router.push(`/groups/${id}/join`);
                }
                else {
                    dispatch(saveMembers(group));
                }
            })
            .catch(err => {
                if (err.response) {
                    dispatch(saveMembersFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveMembersFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveMembersFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Add user to group and save to the redux store
 * @param {*} group 
 */
export const addUserToGroup = group => {
    return {
        type: ADD_USER_TO_GROUP,
        payload: group
    };
}

/**
 * Failed to add a user to the group
 * @param {*} err 
 */
export const addUserToGroupFailed = err => {
    return {
        type: ADD_USER_TO_GROUP_FAILED,
        payload: err
    };
}

/**
 * Add user to the group
 * @param {*} id 
 * @param {*} userID 
 * @param {*} token 
 */
export const addUser = (id, userID, token) => dispatch => {
    return axios.post(`${API}/groups/${id}/members`,
            {
                "uid": userID
            },
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispatch(addUserToGroup(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(addUserToGroupFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(addUserToGroupFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(addUserToGroupFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Remove user from the saved in the redux store
 * @param {*} group 
 */
export const removeUserFromGroup = group => {
    return {
        type: REMOVE_USER_FROM_GROUP,
        payload: group
    };
}

/**
 * Failed to remove user from the group saved to the redux
 * @param {*} err 
 */
export const removeUserFromGroupFailed = err => {
    return {
        type: REMOVE_USER_FROM_GROUP_FAILED,
        payload: err
    };
}

/**
 * Remove user from the group
 * @param {*} id 
 * @param {*} userID 
 * @param {*} token 
 */
export const deleteUser = (id, userID, token) => dispatch => {
    return axios.delete(`${API}/groups/${id}/members`,
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
            .then(result => dispatch(removeUserFromGroup(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(removeUserFromGroupFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(removeUserFromGroupFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(removeUserFromGroupFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}