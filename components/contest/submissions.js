import React from 'react';
import Link from 'next/link';

const Submission = ({submission, contest}) => {
    let date = new Date(submission.submissionTime);
    let type = true;
    if (contest.type === 2) {
        type = false;
    }
    return (
        <>
            <tr className="text-center">
                <td>{submission.submissionID}</td>
                <td>
                    {type && (
                        <Link prefetch href="/profile/[username]" as={`/profile/${submission.user.username}`}><a href={`/profile/${submission.user.username}`}>{submission.user.username}</a></Link>
                    )}
                    {!type && (
                        <Link prefetch href="/teams/[id]" as={`/teams/${submission.team._id}`}><a href={`/teams/${submission.team._id}`}>{submission.team.name}</a></Link>
                    )}
                </td>
                <td><a href={submission.problemLink}>{submission.problemName}</a></td>
                <td>{submission.OJ}</td>
                <td>{submission.verdict}</td>
                <td>{submission.language}</td>
                <td>{date.toLocaleString('en-GB')}</td>
            </tr>
        </>
    );
}

const Submissions = ({contest}) => {

    if (contest.submissions.length === 0) {
        return (
            <>
                <div className="row justify-content-center">
                    No submissions made to this contest yet.
                </div>
            </>
        );
    }

    const map = contest.submissions.map((submission, i) => {
        return (
            <Submission key={i} submission={submission} contest={contest} />
        );
    });

    return (
        <>
            <table className="table table-sm table-bordered table-striped table-responsive-sm table-hover">
                <thead className="thead-dark">
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Contestant</th>
                        <th>Problem</th>
                        <th>Online Judge</th>
                        <th>Verdict</th>
                        <th>Language</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {map}
                </tbody>
            </table>
        </>
    );
}

export default Submissions;