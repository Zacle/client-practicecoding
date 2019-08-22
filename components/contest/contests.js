import React from 'react';
import Link from 'next/link';


const ComingContests = ({contest}) => {
    let date = new Date(contest.startDate);
    return (
        <>
            <tr className="text-center">
                <td>
                    <Link prefetch href="/contests/[id]" as={"/contests/" + contest._id} ><a href={"/contests/" + contest._id}>{contest.name}</a></Link>
                </td>
                <td>
                    <Link prefetch href="/profile/[username]" as={"/profile/" + contest.owner.username} ><a href={"/profile/" + contest.owner.username}>{contest.owner.username}</a></Link>
                </td>
                <td>
                    {date.toLocaleString('en-GB')}
                </td>
                <td>
                    {contest.duration}
                </td>
                <td>
                    <Link prefetch href="/contests/[id]/register" as={"/contests/" + contest._id + "/register"}><a href={"/contests/" + contest._id + "/register"}>Register</a></Link>
                </td>
            </tr>
        </>
    );
}

const RunningContests = ({contest}) => {
    let date = new Date(contest.startDate);
    return (
        <>
            <tr className="text-center">
                <td>
                    <Link prefetch href="/contests/[id]" as={"/contests/" + contest._id} ><a href={"/contests/" + contest._id}>{contest.name}</a></Link>
                </td>
                <td>
                    <Link prefetch href="/profile/[username]" as={"/profile/" + contest.owner.username} ><a href={"/profile/" + contest.owner.username}>{contest.owner.username}</a></Link>
                </td>
                <td>
                    {date.toLocaleString('en-GB')}
                </td>
                <td>
                    {contest.duration}
                </td>
                <td>
                    <Link prefetch href="/contests/[id]/register" as={"/contests/" + contest._id + "/register"}><a href={"/contests/" + contest._id + "/register"}>Register</a></Link>
                </td>
                <td>
                    <Link prefetch href="/contests/[id]/standing" as={"/contests/" + contest._id + "/standing"}><a href={"/contests/" + contest._id + "/standing"}>Current Standing</a></Link>
                </td>
            </tr>
        </>
    );
}

const PastContests = ({contest}) => {
    let date = new Date(contest.startDate);
    return (
        <>
            <tr className="text-center">
                <td>
                    <Link prefetch href="/contests/[id]" as={"/contests/" + contest._id} ><a href={"/contests/" + contest._id}>{contest.name}</a></Link>
                </td>
                <td>
                    <Link prefetch href="/profile/[username]" as={"/profile/" + contest.owner.username} ><a href={"/profile/" + contest.owner.username}>{contest.owner.username}</a></Link>
                </td>
                <td>
                    {date.toLocaleString('en-GB')}
                </td>
                <td>
                    {contest.duration}
                </td>
                <td>
                    <Link prefetch href="/contests/[id]/standing" as={"/contests/" + contest._id + "/standing"}><a href={"/contests/" + contest._id + "/standing"}>Final Standing</a></Link>
                </td>
            </tr>
        </>
    );
}

/**
 * Display contests given the status (coming, running or past)
 * @param {status, contests} param0 
 */
const MainContests = ({contests = [], status}) => {
    if (contests.length === 0) {
        return (
            <>
                <div className="row justify-content-center">
                    No {status.toLowerCase()} contests currently.
                </div>
            </>
        );
    }
    if (status == "RUNNING") {
        const map = contests.map((contest, i) => {
            return (
                <RunningContests key={i+1} contest={contest} />
            );
        });
        return (
            <>
                <table className="table table-sm table-bordered table-striped table-responsive-sm table-hover">
                    <thead>
                        <tr className="text-center">
                            <th>Contest Name</th>
                            <th>Contest Owner</th>
                            <th>Start</th>
                            <th>Duration</th>
                            <th>Registration</th>
                            <th>Standing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {map}
                    </tbody>
                </table>
            </>
        );
    }
    else if (status == "COMING") {
        const map = contests.map((contest, i) => {
            return (
                <ComingContests key={i+1} contest={contest} />
            );
        });
        return (
            <>
                <table className="table table-sm table-bordered table-striped table-responsive-sm table-hover">
                    <thead>
                        <tr className="text-center">
                            <th>Contest Name</th>
                            <th>Contest Owner</th>
                            <th>Start</th>
                            <th>Duration</th>
                            <th>Registration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {map}
                    </tbody>
                </table>
            </>
        );
    }
    else {
        const map = contests.map((contest, i) => {
            return (
                <PastContests key={i+1} contest={contest} />
            );
        });
        return (
            <>
                <table className="table table-sm table-bordered table-striped table-responsive-sm table-hover">
                    <thead>
                        <tr className="text-center">
                            <th>Contest Name</th>
                            <th>Contest Owner</th>
                            <th>Start</th>
                            <th>Duration</th>
                            <th>Standing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {map}
                    </tbody>
                </table>
            </>
        );
    }
}

export default MainContests;