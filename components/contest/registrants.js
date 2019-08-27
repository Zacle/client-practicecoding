import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';


const DeleteOption = ({isAdmin, canDelete, remove, id}) => {
    if (canDelete) {
        return (
            <button className="btn" onClick={() => remove(id)}><span data-toggle="tooltip" data-placement="top" title="Click to leave"><FontAwesomeIcon icon="trash-alt" /></span></button>
        );
    }
    else if (isAdmin) {
        return (
            <button className="btn" onClick={() => remove(id)}><span data-toggle="tooltip" data-placement="top" title="Click to remove"><FontAwesomeIcon icon="trash-alt" /></span></button>
        );
    }
    else {
        return (
            <></>
        );
    }
}

const Registrant = ({contest, contestant, user, remove}) => {
    let isAdmin = false;
    let canDelete = false;
    let date = new Date(contest.startDate);
    let end = new Date(contest.endDate);
    let contestStarted = date.getTime() < Date.now();
    let contestEnded = end.getTime() < Date.now();
    if (user) {
        isAdmin = (contest.owner.username === user.username) && !contestEnded;
        canDelete = (user.username === contestant.username) && !contestStarted;
    }
    return (
        <>
            <tr className="text-center">
                <td>
                    <Link prefetch href="/profile/[username]" as={`/profile/${contestant.username}`}><a href={`/profile/${contestant.username}`}>{contestant.username}</a></Link>
                </td>
                <td><DeleteOption isAdmin={isAdmin} canDelete={canDelete} remove={remove} id={contestant._id} /></td>
            </tr>
        </>
    );
}

const Team = ({contest, team, user, remove}) => {
    let isAdmin = false;
    let canDelete = false;
    let date = new Date(contest.startDate);
    let end = new Date(contest.endDate);
    let contestStarted = date.getTime() < Date.now();
    let contestEnded = end.getTime() < Date.now();
    if (user) {
        isAdmin = (contest.owner.username === user.username) && !contestEnded;
        canDelete = (user.username === team.admin.username) && !contestStarted;
    }
    return (
        <>
            <tr className="text-center">
                <td>
                    <Link prefetch href="/teams/[id]" as={`/teams/${team._id}`}><a href={`/teams/${team._id}`}>{team.name}</a></Link>
                </td>
                <td><DeleteOption isAdmin={isAdmin} canDelete={canDelete} remove={remove} id={team._id} /></td>
            </tr>
        </>
    );
}

const TeamRegistrants = ({contest, user, remove}) => {
    if (contest.teams.length === 0) {
        return (
            <>
                <div className="row justify-content-center">
                    No registrants to this contest yet.
                </div>
            </>
        );
    }
    const map = contest.teams.map((team, i) => {
        return (
            <Team key={i+1} team={team} contest={contest} user={user} remove={remove} />
        );
    });

    return (
        <>
            <table className="table table-sm table-bordered table-striped table-hover">
                <thead className="thead-dark">
                    <tr className="text-center">
                        <th>Team</th>
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

const UserRegistrants = ({contest, user, remove}) => {
    if (contest.users.length === 0) {
        return (
            <>
                <div className="row justify-content-center">
                    No registrants to this contest yet.
                </div>
            </>
        );
    }
    const map = contest.users.map((contestant, i) => {
        return (
            <Registrant key={i+1} contestant={contestant} contest={contest} user={user} remove={remove} />
        );
    });

    return (
        <>
            <table className="table table-sm table-bordered table-striped table-hover">
                <thead className="thead-dark">
                    <tr className="text-center">
                        <th>Contestant</th>
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

const Registrants = ({contest, user, remove}) => {

    if (contest.type === 2) {
        return (
            <>
                <TeamRegistrants contest={contest} user={user} remove={remove} />
            </>
        );
    }
    else {
        return (
            <>
                <UserRegistrants contest={contest} user={user} remove={remove} />
            </>
        );
    }
}

export default Registrants;