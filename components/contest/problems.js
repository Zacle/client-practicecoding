import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Problem = problem => {
    return (
        <>
            <tr>
                <td><a href={problem.link}> {problem.link} </a></td>
                <td>{problem.plateform}</td>
                <td><FontAwesomeIcon icon="trash-alt" /></td>
            </tr>
        </>
    );
}

const Problems = ({problems = []}) => {

    if (problems.length === 0) {
        return (
            <>
                <div className="row justify-content-center">
                    No problems added yet.
                </div>
            </>
        );
    }

    const map = problems.map((problem, i) => {
        return (
            <Problem key={i} problem={problem} />
        );
    });

    return (
        <>
            <table className="table table-bordered table-striped table-responsive-sm table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Online Judge</th>
                        <th>Option</th>
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