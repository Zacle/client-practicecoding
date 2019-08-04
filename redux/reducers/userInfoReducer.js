import {
    USER_INFO,
    USER_INFO_FAILED
} from '../ActionTypes';


let initialState = {
    user: null,
    error: null
};

export const userInfoReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_INFO:
            return {...state, user: action.payload};
        case USER_INFO_FAILED: 
            return {...state, error: action.payload};
        default: 
            return state;
    }
}