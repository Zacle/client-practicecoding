import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Problem = ({problem}) => {
    if (!problem) {
        return (
            <></>
        );
    }
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
                    <tr className="text-center">
                        <td> {problem.name} </td>
                        <td> {problem.plateform} </td>
                        <td> {problem.difficulty} </td>
                        <td> <span data-toggle="tooltip" data-placement="top" title="Save to solve later"><FontAwesomeIcon icon="save" /></span> </td>
                        <td> <a href={`${problem.link}`} target="_blank"> Solve </a> </td>
                    </tr>
                </tbody>
            </table>
            <br />
            <div className="row justify-content-center">
                <p>Note: Difficulty is not 100% accurate</p>
            </div>
        </>
    );
}

export default Problem;