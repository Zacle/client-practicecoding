import {
    PROBLEMS_FILTER,
    PROBLEMS_FILTER_FAILED,
    FETCH_TODOS,
    FETCH_TODOS_FAILED,
    REMOVE_TODO,
    REMOVE_TODO_FAILED
} from '../ActionTypes';
import axios from 'axios';
import { API } from '../../config';
import {API_ERRORS} from '../../utils/httpError';
import todos from '../../pages/todos';


/**
 * send the problems to the reducer
 * @param {*} problems 
 * @param {*} difficulty 
 * @param {*} plateform 
 */
export const saveProblems = (problems, difficulty, plateform, total, per_page) => {
    return {
        type: PROBLEMS_FILTER,
        payload: {
            difficulty: difficulty,
            plateform: plateform,
            problems: problems,
            total: total,
            per_page: per_page

        }
    };
}

/**
 * Failed to filter problems
 * @param {*} error 
 */
export const saveProblemsFailed = error => {
    return {
        type: PROBLEMS_FILTER_FAILED,
        payload: error
    };
}

/**
 * Query problems filtered by the user
 * @param {*} query 
 * @param {*} token 
 */
export const filterProblems = (query, token) => dispatch => {
    return axios.get(`${API}/problems/p/filter`,
            {
                params: {
                    difficulty: query.difficulty,
                    plateform: query.plateform,
                    page: query.page
                },
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispatch(saveProblems(result.data.problems, query.difficulty, query.plateform, result.data.total, result.data.per_page)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveProblemsFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveProblemsFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message))
                }
                else {
                    dispatch(saveProblemsFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Save all todos to the redux store
 * @param {*} todos 
 */
export const saveTodos = todos => {
    return {
        type: FETCH_TODOS,
        payload: todos
    };
}

/**
 * failed to save todos in the redux store
 * @param {*} err 
 */
export const saveTodosFailed = err => {
    return {
        type: FETCH_TODOS_FAILED,
        payload: err
    };
}

/**
 * Get user todos from the database
 * @param {*} token 
 */
export const fetchTodos = token => dispatch => {
    return axios.get(`${API}/todos/`,
            {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => dispatch(saveTodos(result.data)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveTodosFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveTodosFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveTodosFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}

/**
 * Remove the todo from the redux store
 * @param {*} id 
 */
export const deleteTodo = id => {
    return {
        type: REMOVE_TODO,
        payload: id
    };
}

/**
 * Failed to remove todo from the redux store
 * @param {*} err 
 */
export const deleteTodoFailed = err => {
    return {
        type: REMOVE_TODO_FAILED,
        payload: err
    };
}

/**
 * Remove the todo from the database
 * @param {*} id 
 * @param {*} token 
 */
export const removeTodo = (id, token) => dispatch => {
    return axios.delete(`${API}/todos/`,
            {
                params: {
                    problemID: id
                },
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => dispatch(deleteTodo(id)))
            .catch(err => {
                if (err.response) {
                    dispatch(saveTodosFailed(err.response.data));
                }
                else if (err.request) {
                    dispatch(saveTodosFailed(API_ERRORS.INTERNAL_SERVER_ERROR.message));
                }
                else {
                    dispatch(saveTodosFailed(API_ERRORS.GENERAL_ERROR.message));
                }
            });
}