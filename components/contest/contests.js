import React from 'react';
import Link from 'next/Link';


const ComingContests = ({contest}) => {
    let date = new Date(contest.startDate);
    return (
        <>
            <tr>
                <td>
                    <Link prefetch href={"contests/" + contest._id} ><a href={"contests/" + contest._id}>{contest.name}</a></Link>
                </td>
                <td>
                    <Link prefetch href={"profile/" + contest.owner.username} ><a href={"profile/" + contest.owner.username}>{contest.owner.username}</a></Link>
                </td>
                <td>
                    {date.toLocaleString('en-GB')}
                </td>
                <td>
                    {contest.duration}
                </td>
                <td>
                    <Link prefetch href={"/contests/register/" + contest._id}><a href={"/contests/register/" + contest._id}>Register</a></Link>
                </td>
            </tr>
        </>
    );
}

const RunningContests = ({contest}) => {
    let date = new Date(contest.startDate);
    return (
        <>
            <tr>
                <td>
                    <Link prefetch href={"contests/" + contest._id} ><a href={"contests/" + contest._id}>{contest.name}</a></Link>
                </td>
                <td>
                    <Link prefetch href={"profile/" + contest.owner.username} ><a href={"profile/" + contest.owner.username}>{contest.owner.username}</a></Link>
                </td>
                <td>
                    {date.toLocaleString('en-GB')}
                </td>
                <td>
                    {contest.duration}
                </td>
                <td>
                    <Link prefetch href={"/contests/register/" + contest._id}><a href={"/contests/register/" + contest._id}>Register</a></Link>
                </td>
                <td>
                    <Link prefetch href={"/contests/standing/" + contest._id}><a href={"/contests/standing/" + contest._id}>Current Standing</a></Link>
                </td>
            </tr>
        </>
    );
}

const PastContests = ({contest}) => {
    let date = new Date(contest.startDate);
    return (
        <>
            <tr>
                <td>
                    <Link prefetch href={"contests/" + contest._id} ><a href={"contests/" + contest._id}>{contest.name}</a></Link>
                </td>
                <td>
                    <Link prefetch href={"profile/" + contest.owner.username} ><a href={"profile/" + contest.owner.username}>{contest.owner.username}</a></Link>
                </td>
                <td>
                    {date.toLocaleString('en-GB')}
                </td>
                <td>
                    {contest.duration}
                </td>
                <td>
                    <Link prefetch href={"/contests/standing/" + contest._id}><a href={"/contests/standing/" + contest._id}>Final Standing</a></Link>
                </td>
            </tr>
        </>
    );
}

/**
 * Display contests given the status (coming, running or past)
 * @param {status, contests} param0 
 */
const MainContests = ({status, contests}) => {
    if (status == "RUNNING") {
        const map = contests.map((contest, i) => {
            return (
                <RunningContests key={i} contest={contest} />
            );
        });
        return (
            <>
                <table className="table table-bordered table-striped table-responsive-sm">
                    <thead>
                        <tr>
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
                <ComingContests key={i} contest={contest} />
            );
        });
        return (
            <>
                <table className="table table-bordered table-striped table-responsive-sm">
                    <thead>
                        <tr>
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
        const map = contests.map((contest) => {
            return (
                <PastContests contest={contest} />
            );
        });
        return (
            <>
                <table className="table table-bordered table-striped table-responsive-sm">
                    <thead>
                        <tr>
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