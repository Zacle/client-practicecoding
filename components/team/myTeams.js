import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Team = ({team, count}) => {
    let date = new Date(team.creation);
    return (
        <>
            <tr>
                <td>
                    <Link prefetch href="teams/[id]" as={"/teams/" + team._id} ><a href={"/teams/" + team._id}>{team.name}</a></Link>
                </td>
                <td>
                    <Link prefetch href="/profile/[username]" as={"/profile/" + team.admin.username} ><a href={"/profile/" + team.admin.username}>{team.admin.username}</a></Link>
                </td>
                <td> {count} </td>
                <td>
                    {date.toLocaleString('en-GB')}
                </td>
                <td>
                    <FontAwesomeIcon icon="user-times" />
                </td>
            </tr>
        </>
    );
}

const Teams = ({teams=[]}) => {

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
            <Team key={i} count={team.members.length} team={team} />
        );
    });

    return (
        <>
            <table className="table table-bordered table-striped table-responsive-sm table-hover">
                <thead>
                    <tr>
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