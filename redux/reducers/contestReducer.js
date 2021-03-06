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
    FETCH_USER_PAST_CONTESTS_FAILED,
    FETCH_CONTEST,
    FETCH_CONTEST_FAILED,
    UPDATE_CONTEST,
    UPDATE_CONTEST_FAILED,
    DELETE_CONTEST,
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
    userContestsError: null,
    getContest: null,
    getContestError: null,
    updateError: null,
    submissions: null,
    submissionsError: null,
    problems: null,
    problemsError: null,
    registrants: null,
    registrantsError: null,
    standing: null,
    standingError: null,
    isLoading: null,
    groupContest: null,
    groupContestError: null
};

export const contestsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_CONTEST:
            return {...state, contest: action.payload};
        case ADD_CONTEST_FAILED:
            return {...state, addContestError: action.payload};
        case CREATE_GROUP_CONTEST:
            return {...state, groupContest: action.payload};
        case CREATE_GROUP_CONTEST_FAILED:
            return {...state, groupContestError: action.payload};
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
        case FETCH_CONTEST:
            return {...state, getContest: action.payload, getContestError: null};
        case FETCH_CONTEST_FAILED:
            return {...state, getContestError: action.payload};
        case UPDATE_CONTEST:
            return {...state, getContest: action.payload, updateError: null};
        case UPDATE_CONTEST_FAILED:
            return {...state, updateError: action.payload};
        case DELETE_CONTEST:
            let new_coming = null, new_running = null, new_past = null;  
            if (state.userComingContests) {
                new_coming = state.userComingContests.filter(contest => contest._id !== action.payload._id);
            }
            if (state.userRunningContests) {
                new_running = state.userRunningContests.filter(contest => contest._id !== action.payload._id);
            }
            if (state.userPastContests) {
                new_past = state.userPastContests.filter(contest => contest._id !== action.payload._id);
            }
            return {
                ...state,
                userComingContests: new_coming,
                userRunningContests: new_running,
                userPastContests: new_past
            };
        case FETCH_SUBMISSIONS:
            return {...state, submissions: action.payload, submissionsError: null};
        case FETCH_SUBMISSIONS_FAILED:
            return {...state, submissionsError: action.payload};
        case FETCH_PROBLEMS:
            return {...state, problems: action.payload, problemsError: null};
        case FETCH_PROBLEMS_FAILED:
            return {...state, problemsError: action.payload};
        case FETCH_CONTEST_REGISTRANTS:
            return {...state, registrants: action.payload, registrantsError: null};
        case FETCH_CONTEST_REGISTRANTS_FAILED:
            return {...state, registrantsError: action.payload};
        case FETCH_CONTEST_STANDING:
            let result = action.payload;
            result.standing.trackers.sort(sortStanding);
            return {
                ...state,
                standing: result,
                standingError: null,
                isLoading: null
            };
        case FETCH_CONTEST_STANDING_FAILED:
            return {...state, standingError: action.payload, isLoading: null};
        case DELETE_PROBLEM:
            const problems = state.problems;
            problems.problems = problems.problems.filter(problem => problem._id !== action.payload);
            return {
                ...state,
                problems: problems
            };
        case DELETE_CONTEST_USER:
            const registrants = state.registrants;
            if (registrants.type == 2) {
                registrants.teams = registrants.teams.filter(team => team._id !== action.payload);
            }
            else {
                registrants.users = registrants.users.filter(user => user._id !== action.payload);
            }
            return {
                ...state,
                registrants: registrants
            };
        case DELETE_CONTEST_TEAM:
            const registrant = state.registrants;
            if (registrant.type == 2) {
                registrant.teams = registrant.teams.filter(team => team._id !== action.payload);
            }
            else {
                registrant.users = registrant.users.filter(user => user._id !== action.payload);
            }
            return {
                ...state,
                registrants: registrant
            };
        case IS_LOADING:
            return {...state, isLoading: true};
        default:
            return state;
    }
}

const sortStanding = (a, b) => {
    if (b.solvedCount !== a.solvedCount) {
        return b.solvedCount - a.solvedCount;
    }
    else if (b.solvedCount === a.solvedCount) {
        return a.penalty - b.penalty;
    }
}