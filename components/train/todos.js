import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Todo = ({problem, added, remove}) => {
    const date = new Date(added);
    return (
        <tr key={problem._id} className="text-center">
            <td> {problem.name} </td>
            <td> {problem.plateform} </td>
            <td> {problem.difficulty} </td>
            <td>{date.toLocaleString('en-GB')}</td>
            <td> <button className="btn" onClick={() => remove(problem._id)}><span data-toggle="tooltip" data-placement="top" title="Remove from todos list"><FontAwesomeIcon icon="trash-alt" /></span></button> </td>
            <td> <a href={`${problem.link}`} target="_blank"> Solve </a> </td>
        </tr>
    );
}

const TodoList = ({todos = [], remove}) => {
    if (todos.length === 0) {
        return (
            <>
                <div className="row justify-content-center">
                    You have no TODO currently.
                </div>
            </>
        );
    }

    const map = todos.map((todo, i) => {
        return (
            <Todo remove={remove} key={i+1} added={todo.added} problem={todo.problemID} />
        );
    });

    return (
        <>
            <table className="table table-sm table-bordered table-striped table-responsive-sm table-hover">
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Online Judge</th>
                        <th>Difficulty</th>
                        <th>Added On</th>
                        <th>Remove Todo</th>
                        <th>Solve</th>
                    </tr>
                </thead>
                <tbody>
                    {map}
                </tbody>
            </table>
        </>
    );
}

export default TodoList;