import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Team = ({team, count, user, remove}) => {
    let date = new Date(team.creation);
    let canDelete = false;
    if (user) {
        canDelete = team.admin.username === user.username;
    }

    return (
        <>
            <tr className="text-center">
                <td>
                    <Link prefetch href="/teams/[id]" as={"/teams/" + team._id} ><a href={"/teams/" + team._id}>{team.name}</a></Link>
                </td>
                <td>
                    <Link prefetch href="/profile/[username]" as={"/profile/" + team.admin.username} ><a href={"/profile/" + team.admin.username}>{team.admin.username}</a></Link>
                </td>
                <td> {count} </td>
                <td>
                    {date.toLocaleString('en-GB')}
                </td>
                <td>
                    {canDelete && (
                        <button className="btn" onClick={() => remove(team._id)}><span data-toggle="tooltip" data-placement="top" title="Delete this team"><FontAwesomeIcon icon="trash-alt" /></span></button>
                    )}
                </td>
            </tr>
        </>
    );
}

const Teams = ({teams = [], remove, user}) => {

    if (teams.length === 0) {
        return (
            <>
                <div className="row justify-content-center">
                    You have no teams yet.
                </div>
            </>
        );
    }

    const map = teams.map((team, i) => {
        return (
            <Team user={user} remove={remove} key={i} count={team.members.length} team={team} />
        );
    });

    return (
        <>
            <table className="table table-sm table-bordered table-striped table-responsive-sm table-hover">
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Owner</th>
                        <th>Members count</th>
                        <th>Creation</th>
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


export default Teams;