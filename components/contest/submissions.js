import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Submission = submission => {
    let date = new Date(submission.submissionTime);
    return (
        <>
            <tr>
                <td>{submission.submissionID}</td>
                <td>
                    <Link prefetch href="/profile/[username]" as={`/profile/${submission.user.username}`}><a href={`/profile/${submission.user.username}`}>{submission.user.username}</a></Link>
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

const Submissions = ({submissions = []}) => {

    if (submissions.length === 0) {
        return (
            <>
                <div className="row justify-content-center">
                    No submissions made to this contest yet.
                </div>
            </>
        );
    }

    const map = submissions.map((submission, i) => {
        return (
            <Submission key={i} submission={submission} />
        );
    });

    return (
        <>
            <table className="table table-sm table-bordered table-striped table-responsive-sm table-hover">
                <thead>
                    <tr>
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