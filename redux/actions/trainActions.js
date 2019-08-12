import {
    PROBLEMS_FILTER,
    PROBLEMS_FILTER_FAILED
} from '../ActionTypes';
import axios from 'axios';
import { API } from '../../config';
import {API_ERRORS} from '../../utils/httpError';


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