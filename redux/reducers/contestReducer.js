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
    FETCH_USER_RUNNING_CONTESTS,
    FETCH_USER_RUNNING_CONTESTS_FAILED,
    FETCH_USER_PAST_CONTESTS,
    FETCH_USER_PAST_CONTESTS_FAILED
} from '../ActionTypes';

let initialState = {
    contest: null,
    addContestError: null,
    comingContests: null,
    comingError: null,
    runningContests: null,
    runningError: null,
    pastContests: null,
    pastError: null,
    userComingContests: null,
    userRunningContests: null,
    userPastContests: null,
    userContestsError: null
};

export const contestsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_CONTEST:
            return {...state, contest: action.payload};
        case ADD_CONTEST_FAILED:
            return {...state, addContestError: action.payload, addContestError: null};
        case FETCH_COMING_CONTESTS:
            return {...state, comingContests: action.payload, comingError: null};
        case FETCH_COMING_CONTESTS_FAILED:
            return {...state, comingError: action.payload};
        case FETCH_RUNNING_CONTESTS:
            return {...state, runningContests: action.payload, runningError: null};
        case FETCH_RUNNING_CONTESTS_FAILED:
            return {...state, runningError: action.payload};
        case FETCH_PAST_CONTESTS:
            return {...state, pastContests: action.payload, pastError: null};
        case FETCH_PAST_CONTESTS_FAILED:
            return {...state, pastError: action.payload};
        case FETCH_USER_COMING_CONTESTS:
            return {...state, userComingContests: action.payload};
        case FETCH_USER_COMING_CONTESTS_FAILED:
            return {...state, userContestsError: action.payload};
        case FETCH_USER_RUNNING_CONTESTS:
            return {...state, userRunningContests: action.payload};
        case FETCH_USER_RUNNING_CONTESTS_FAILED:
            return {...state, userContestsError: action.payload};
        case FETCH_USER_PAST_CONTESTS:
            return {...state, userPastContests: action.payload};
        case FETCH_USER_PAST_CONTESTS_FAILED:
            return {...state, userContestsError: action.payload};
        default:
            return state;
    }
}