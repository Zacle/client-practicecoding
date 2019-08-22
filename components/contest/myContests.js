import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ComingContests = ({contest, user, remove}) => {
    let date = new Date(contest.startDate);
    let canDelete = false;
    if (user) {
        canDelete = contest.owner.username === user.username;
    }
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
                    {canDelete && (
                        <button className="btn" onClick={() => remove(contest._id)}><span data-toggle="tooltip" data-placement="top" title="Delete this contest"><FontAwesomeIcon icon="trash-alt" /></span></button>
                    )}
                </td>
            </tr>
        </>
    );
}

const RunningContests = ({contest, user, remove}) => {
    let date = new Date(contest.startDate);
    let canDelete = false;
    if (user) {
        canDelete = contest.owner.username === user.username;
    }
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
                    <Link prefetch href="/contests/[id]/standing" as={"/contests/" + contest._id + "/standing"}><a href={"/contests/" + contest._id + "/standing"}>Current Standing</a></Link>
                </td>
                <td>
                    {canDelete && (
                        <button className="btn" onClick={() => remove(contest._id)}><span data-toggle="tooltip" data-placement="top" title="Delete this contest"><FontAwesomeIcon icon="trash-alt" /></span></button>
                    )}
                </td>
            </tr>
        </>
    );
}

const PastContests = ({contest, user, remove}) => {
    let date = new Date(contest.startDate);
    let canDelete = false;
    if (user) {
        canDelete = contest.owner.username === user.username;
    }
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
                <td>
                    {canDelete && (
                        <button className="btn" onClick={() => remove(contest._id)}><span data-toggle="tooltip" data-placement="top" title="Delete this contest"><FontAwesomeIcon icon="trash-alt" /></span></button>
                    )}
                </td>
            </tr>
        </>
    );
}

const Contests = ({user, contests, status, remove}) => {
    if (status == "RUNNING") {
        const map = contests.map((contest, i) => {
            return (
                <RunningContests user={user} remove={remove} key={i+1} contest={contest} />
            );
        });
        return (
            <>
                <table className="cap table table-sm table-bordered table-striped table-responsive-sm table-hover">
                    <caption className="cap text-center">Running Contests</caption>
                    <thead>
                        <tr className="text-center">
                            <th>Contest Name</th>
                            <th>Contest Owner</th>
                            <th>Start</th>
                            <th>Duration</th>
                            <th>Standing</th>
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
    else if (status == "COMING") {
        const map = contests.map((contest, i) => {
            return (
                <ComingContests user={user} remove={remove} key={i+1} contest={contest} />
            );
        });
        return (
            <>
                <table className="cap table table-sm table-bordered table-striped table-responsive-sm table-hover">
                    <caption className="cap text-center">Coming Contests</caption>
                    <thead>
                        <tr className="text-center">
                            <th>Contest Name</th>
                            <th>Contest Owner</th>
                            <th>Start</th>
                            <th>Duration</th>
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
    else {
        const map = contests.map((contest, i) => {
            return (
                <PastContests user={user} remove={remove} key={i+1} contest={contest} />
            );
        });
        return (
            <>
                <table className="cap table table-sm table-bordered table-striped table-responsive-sm table-hover">
                    <caption className="cap text-center">Past contests</caption>
                    <thead>
                        <tr className="text-center">
                            <th>Contest Name</th>
                            <th>Contest Owner</th>
                            <th>Start</th>
                            <th>Duration</th>
                            <th>Standing</th>
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
}

/**
 * Display contests given the status (coming, running or past)
 * @param {status, contests} param0 
 */
const MyContests = ({username, user, contests = [], status, remove}) => {
    if (contests.length === 0) {
        return (
            <>
                <div className="row justify-content-center">
                    No {status.toLowerCase()} contests currently.
                </div>
            </>
        );
    }
    if (user && (user.username === username)) {
        return (
            <Contests user={user} contests={contests} status={status} remove={remove} />
        );
    }
    else {
        const publicContests = contests.filter(contest => contest.access !== 0);
        if (publicContests.length === 0) {
            return (
                <></>
            );
        }
        return (
            <Contests user={user} contests={publicContests} status={status} remove={remove} />
        );
    }
}

export default MyContests;