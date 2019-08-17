import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Member = ({team, user, remove, member}) => {
    let isAdmin = false;
    let canDelete = false;
    let admin = false;
    if (user) {
        isAdmin = user.username === team.admin.username;
        canDelete = (user.username === member.username);
        admin = isAdmin && (team.admin.username === member.username);
    }
    if (admin) {
        return (
            <div >
                <FontAwesomeIcon icon="user" />
                <Link prefetch href="/profile/[username]" as={"/profile/" + member.username} ><a className="ml-2" href={"/profile/" + member.username}>{member.username}</a></Link>
            </div>
        );
    }
    else if (canDelete) {
        return (
            <div>
                <button className="btn" onClick={() => remove(member._id)}><span data-toggle="tooltip" data-placement="top" title="Click to leave this team"><FontAwesomeIcon icon="user-times" /></span></button>
                <Link prefetch href="/profile/[username]" as={"/profile/" + member.username} ><a href={"/profile/" + member.username}>{member.username}</a></Link>
            </div>
        );
    }
    else if (isAdmin) {
        return (
            <div>
                <button className="btn" onClick={() => remove(member._id)}><span data-toggle="tooltip" data-placement="top" title="Click to remove this user"><FontAwesomeIcon icon="user-times" /></span></button>
                <Link prefetch href="/profile/[username]" as={"/profile/" + member.username} ><a href={"/profile/" + member.username}>{member.username}</a></Link>
            </div>
        );
    }
    else {
        return (
            <div>
                <FontAwesomeIcon icon="user" />
                <Link prefetch href="/profile/[username]" as={"/profile/" + member.username} ><a className="ml-2" href={"/profile/" + member.username}>{member.username}</a></Link>
            </div>
        );
    }
}

const Members = ({team, user, remove}) => {
    const map = team.members.map((member, i) => {
        return (
            <div key={i+1} className="col-12">
                <Member team={team} remove={remove} user={user} member={member} key={i+1} />
            </div>
        );
    });
    return (
        <div className="row justify-content-center">
            {map}
        </div>
    );
}

export default Members;