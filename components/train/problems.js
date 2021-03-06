import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Problem = ({problem, save}) => {
    return (
        <tr key={problem._id} className="text-center">
            <td> {problem.name} </td>
            <td> {problem.plateform} </td>
            <td> {problem.difficulty} </td>
            <td> <button className="btn" onClick={() => save(problem._id)}><span data-toggle="tooltip" data-placement="top" title="Save to solve later"><FontAwesomeIcon icon="save" /></span></button> </td>
            <td> <a href={`${problem.link}`} target="_blank"> Solve </a> </td>
        </tr>
    );
}

const Problems = ({problems = [], save}) => {
    if (problems.length === 0) {
        return (
            <></>
        );
    }

    const map = problems.map((problem, i) => {
        return (
            <Problem save={save} key={i+1} problem={problem} />
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
                        <th>Add Todo</th>
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

export default Problems;