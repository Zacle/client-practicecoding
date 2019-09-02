import {
    FETCH_SOURCE,
    FETCH_SOURCE_FAILED,
    FETCH_USER_CODES,
    FETCH_USER_CODES_FAILED
} from '../ActionTypes';

let initialState = {
    source: null,
    sourceError: null,
    codes: null, 
    codesError: null
};

export const editorReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_SOURCE:
            return {...state, source: action.payload, sourceError: null}
        case FETCH_SOURCE_FAILED:
            return {...state, sourceError: action.payload};
        case FETCH_USER_CODES:
            return {...state, codes: action.payload, codesError: null};
        case FETCH_USER_CODES_FAILED:
            return {...state, codesError: action.payload};
        default:
            return state;
    }
}