import {
    FETCH_TODOS,
    FETCH_TODOS_FAILED,
    REMOVE_TODO,
    REMOVE_TODO_FAILED
} from '../ActionTypes';

let initialState = {
    error: null,
    todos: null
};

export const todosReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_TODOS:
            return {...state, todos: action.payload};
        case FETCH_TODOS_FAILED:
            return {...state, error: action.payload};
        case REMOVE_TODO:
            return {...state, todos: state.todos.filter(todo => todo.problemID._id !== action.payload)};
        case REMOVE_TODO_FAILED:
            return {...state, error: action.payload};
        default:
            return state;
    }
}