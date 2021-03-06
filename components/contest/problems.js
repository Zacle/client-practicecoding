import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Problem = ({problem, user, remove, contest}) => {
    let admin = false;
    let started = false;
    let date = new Date(contest.startDate);
    started = date.getTime() < Date.now();
    if (user) {
        admin = contest.owner.username === user.username;
    }
    return (
        <>
            <tr className="text-center">
                <td><a href={problem.link} target="_blank"> {problem.name} </a></td>
                <td>{problem.plateform}</td>
                <td>{admin && !started && (
                    <button className="btn" onClick={() => remove(problem._id)}><span data-toggle="tooltip" data-placement="top" title="Click to remove this problem"><FontAwesomeIcon icon="trash-alt" /></span></button>
                )}</td>
            </tr>
        </>
    );
}

const Problems = ({contest, user, remove}) => {

    if (contest.problems.length === 0) {
        return (
            <>
                <div className="row justify-content-center">
                    No problems added yet.
                </div>
            </>
        );
    }

    const map = contest.problems.map((problem, i) => {
        return (
            <Problem key={i+1} problem={problem} contest={contest} user={user} remove={remove} />
        );
    });

    let admin = false;
    if (user) {
        admin = contest.owner.username === user.username;
    }
    let message = "";
    if (admin) {
        message = "You can't delete a problem after the contest has started";
    }

    return (
        <>
            <div className="card-text row justify-content-center">
                {message}
            </div>
            <br />
            <div className="table-responsive-md">
                <table className="table table-sm table-bordered table-striped table-hover table-fixed">
                    <thead className="thead-dark">
                        <tr className="text-center">
                            <th>Name</th>
                            <th>Online Judge</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {map}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Problems;