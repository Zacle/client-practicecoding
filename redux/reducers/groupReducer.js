import {
    FETCH_USER_GROUPS,
    FETCH_USER_GROUPS_FAILED,
    FETCH_GROUPS,
    FETCH_GROUPS_FAILED,
    ADD_GROUP,
    ADD_GROUP_FAILED,
    FETCH_GROUP,
    FETCH_GROUP_FAILED,
    UPDATE_GROUP,
    UPDATE_GROUP_FAILED,
    DELETE_GROUP,
    FETCH_GROUP_MEMBERS,
    FETCH_GROUP_MEMBERS_FAILED,
    ADD_USER_TO_GROUP,
    ADD_USER_TO_GROUP_FAILED,
    REMOVE_USER_FROM_GROUP,
    REMOVE_USER_FROM_GROUP_FAILED,
    FETCH_GROUP_COMING_CONTESTS,
    FETCH_GROUP_COMING_CONTESTS_FAILED,
    FETCH_GROUP_PAST_CONTESTS,
    FETCH_GROUP_PAST_CONTESTS_FAILED,
    FETCH_GROUP_RUNNING_CONTESTS,
    FETCH_GROUP_RUNNING_CONTESTS_FAILED,
    DELETE_CONTEST,
    DELETE_CONTEST_FAILED
} from '../ActionTypes';

let initialState = {
    error: null,
    userGroups: null,
    groups: null,
    group: null,
    inGroup: null,
    addError: null,
    addUserError: null,
    updateError: null,
    groupMembers: null,
    groupMemberError: null,
    removeError: null,
    groupComingContests: null,
    groupRunningContests: null,
    groupPastContests: null,
    groupContestsError: null,
};

export const groupsReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER_GROUPS:
            return {...state, userGroups: action.payload};
        case FETCH_USER_GROUPS_FAILED:
            return {...state, error: action.payload};
        case FETCH_GROUPS:
            return {...state, groups: action.payload, error: null};
        case FETCH_GROUPS_FAILED:
            return {...state, error: action.payload};
        case ADD_GROUP:
            return {
                ...state,
                group: action.payload,
                error: null
            };
        case ADD_GROUP_FAILED:
            return {...state, addError: action.payload};
        case FETCH_GROUP:
            return {...state, inGroup: action.payload, error: null};
        case FETCH_GROUP_FAILED:
            return {...state, error: action.payload};
        case UPDATE_GROUP:
            return {...state, inGroup: action.payload};
        case UPDATE_GROUP_FAILED:
            return {...state, updateError: action.payload};
        case DELETE_GROUP:
            if (state.groups && state.userGroups) {
                let newGroups = state.groups.filter(group => group._id !== action.payload);
                let newUserGroups = state.userGroups.filter(group => group._id !== action.payload);
                return {
                    ...state,
                    groups: newGroups,
                    userGroups: newUserGroups,
                    error: null
                };
            }
            else if (state.groups && !state.userGroups) {
                let newGroups = state.groups.filter(group => group._id !== action.payload);
                return {
                    ...state,
                    groups: newGroups,
                    error: null
                };
            }
            if (state.userGroups && !state.groups) {
                let newUserGroups = state.userGroups.filter(group => group._id !== action.payload);
                return {
                    ...state,
                    userGroups: newUserGroups,
                    error: null
                };
            }
            else {
                return state;
            }
        case FETCH_GROUP_MEMBERS:
            return {...state, groupMembers: action.payload, groupMemberError: null, addError: null, addUserError: null, error: null};
        case FETCH_GROUP_MEMBERS_FAILED:
            return {...state, groupMemberError: action.payload};
        case ADD_USER_TO_GROUP:
            return {...state, inGroup: action.payload, groupMemberError: null, addError: null, addUserError: null, error: null};
        case ADD_USER_TO_GROUP_FAILED:
            return {...state, addUserError: action.payload};
        case REMOVE_USER_FROM_GROUP:
            return {...state, groupMembers: action.payload, groupMemberError: null, addError: null, addUserError: null, error: null};
        case REMOVE_USER_FROM_GROUP_FAILED:
            return {...state, removeError: action.payload};
        case FETCH_GROUP_COMING_CONTESTS:
            return {...state, groupComingContests: action.payload};
        case FETCH_GROUP_COMING_CONTESTS_FAILED:
            return {...state, groupContestsError: action.payload};
        case FETCH_GROUP_RUNNING_CONTESTS:
            return {...state, groupRunningContests: action.payload};
        case FETCH_GROUP_RUNNING_CONTESTS_FAILED:
            return {...state, groupContestsError: action.payload};
        case FETCH_GROUP_PAST_CONTESTS:
            return {...state, groupPastContests: action.payload};
        case FETCH_GROUP_PAST_CONTESTS_FAILED:
            return {...state, groupContestsError: action.payload};
        case DELETE_CONTEST:
            let new_coming = null, new_running = null, new_past = null;  
            if (state.groupComingContests) {
                new_coming = state.groupComingContests.filter(contest => contest._id !== action.payload._id);
            }
            if (state.groupRunningContests) {
                new_running = state.groupRunningContests.filter(contest => contest._id !== action.payload._id);
            }
            if (state.groupPastContests) {
                new_past = state.groupPastContests.filter(contest => contest._id !== action.payload._id);
            }
            return {
                ...state,
                groupComingContests: new_coming,
                groupRunningContests: new_running,
                groupPastContests: new_past
            };
        default:
            return state;
    }
}