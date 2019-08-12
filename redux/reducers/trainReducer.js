import {
    PROBLEMS_FILTER,
    PROBLEMS_FILTER_FAILED
} from '../ActionTypes';

let initialState = {
    error: null,
    difficulty: null,
    plateform: null,
    problems: null,
    total: null,
    per_page: null
};

export const trainReducer = (state = initialState, action) => {
    switch(action.type) {
        case PROBLEMS_FILTER:
            return {
                ...state,
                difficulty: action.payload.difficulty,
                plateform: action.payload.plateform,
                problems: action.payload.problems,
                total: action.payload.total,
                per_page: action.payload.per_page
            };
        case PROBLEMS_FILTER_FAILED:
            return {...state, error: action.payload};
        default:
            return state;
    }
}