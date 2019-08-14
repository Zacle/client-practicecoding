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

let initialState = {
    team: null,
    isLoading: false,
    deleteError: null,
    addError: null,
    error: null,
    teams: []
};

export const teamsReducer = (state = initialState, action) => {
    switch(action.type) {
        case IS_LOADING:
            return {...state, isLoading: true};
        case FETCH_TEAMS:
            return {...state, teams: action.payload, isLoading: false, error: null};
        case FETCH_TEAMS_FAILED:
            return {...state, error: action.payload, isLoading: false};
        case DELETE_TEAM:
            return {...state, teams: state.teams.filter(team => team._id !== action.payload), error: null};
        case DELETE_TEAM_FAILED:
            return {...state, deleteError: action.payload};
        case ADD_TEAM:
            return {...state, teams: state.teams.concat(action.payload), error: null}; 
        case ADD_TEAM_FAILED:
            return {...state, addError: action.payload};
        case FETCH_TEAM:
            return {
                ...state,
                isLoading: false,
                error: null,
                team: action.payload
            };
        case FETCH_TEAM_FAILED:
            return {...state, error: action.payload};
        case REMOVE_USER_FROM_TEAM:
            return {
                ...state,
                error: null,
                deleteError: null,
                addError: null,
                team: action.payload
            };
        case REMOVE_USER_FROM_TEAM_FAILED:
            return {...state, deleteError: action.payload};
        case ADD_USER_TO_TEAM:
            return {...state, team: action.payload};
        case ADD_USER_TO_TEAM_FAILED:
            return {...state, addError: action.payload};
        default:
            return state;
    }
}