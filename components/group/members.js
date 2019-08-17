import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DeleteOption = ({isAdmin, canDelete, admin, remove, id}) => {
    if (admin) {
        return (
            <FontAwesomeIcon icon="user"  />
        );
    }
    else if (canDelete) {
        return (
            <button className="btn" onClick={() => remove(id)}><span data-toggle="tooltip" data-placement="top" title="Click to leave this group"><FontAwesomeIcon icon="user-times" /></span></button>
        );
    }
    else if (isAdmin) {
        return (
            <button className="btn" onClick={() => remove(id)}><span data-toggle="tooltip" data-placement="top" title="Click to remove this user"><FontAwesomeIcon icon="user-times" /></span></button>
        );
    }
    else {
        return (
            <FontAwesomeIcon icon="user"  />
        );
    }
}

const Member = ({group, user, remove, member}) => {
    let date = new Date(member.joined);
    let isAdmin = false;
    let canDelete = false;
    let admin = false;
    if (user) {
        isAdmin = user.username === group.admin.username;
        canDelete = (user.username === member.user.username);
        admin = isAdmin && (group.admin.username === member.user.username);
    }
    return (
        <>
            <tr className="text-center">
                <td>
                    <Link prefetch href="/profile/[username]" as={"/profile/" + member.user.username} ><a href={"/profile/" + member.user.username}>{member.user.username}</a></Link>
                </td>
                <td>
                    {member.membershipType}
                </td>
                <td>
                    {date.toLocaleString('en-GB')}
                </td>
                <td>
                    <DeleteOption isAdmin={isAdmin} canDelete={canDelete} admin={admin} remove={remove} id={member.user._id} />
                </td>
            </tr>
        </>
    );
}

const Members = ({group, user, remove}) => {

    if (group.members.length === 0) {
        return (
            <>
                <div className="row justify-content-center">
                    No members in this group yet
                </div>
            </>
        );
    }

    const map = group.members.map((member, i) => {
        return (
            <Member key={i+1} member={member} user={user} remove={remove} group={group} />
        );
    });

    return (
        <>
            <table className="table table-sm table-bordered table-striped table-responsive-sm table-hover">
                <thead>
                    <tr className="text-center">
                        <th>Member</th>
                        <th>Membership Type</th>
                        <th>Joined Since</th>
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


export default Members;