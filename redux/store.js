import {combineReducers, createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { authReducer } from './reducers/authReducer';
import { userInfoReducer } from './reducers/userInfoReducer';
import { trainReducer } from './reducers/trainReducer';
import { todosReducer } from './reducers/todoReducer';
import { teamsReducer } from './reducers/teamReducer';


const reducers = combineReducers({
    authentication: authReducer,
    user: userInfoReducer,
    filterTrain: trainReducer,
    todos: todosReducer,
    teams: teamsReducer
});

export const Store = (initialState = {}) => {
    return createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
    );
}