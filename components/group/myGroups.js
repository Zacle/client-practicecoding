import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Group = ({group, count, user, remove}) => {
    let date = new Date(group.creation);
    let canDelete = false;
    if (user) {
        canDelete = group.admin.username === user.username;
    }
    return (
        <>
            <tr className="text-center">
                <td>
                    <Link prefetch href="/groups/[id]" as={"/groups/" + group._id} ><a href={"/groups/" + group._id}>{group.name}</a></Link>
                </td>
                <td>
                    <Link prefetch href="/profile/[username]" as={"/profile/" + group.admin.username} ><a href={"/profile/" + group.admin.username}>{group.admin.username}</a></Link>
                </td>
                <td>
                    {count}
                </td>
                <td>
                    {date.toLocaleString('en-GB')}
                </td>
                <td>
                    {canDelete && (
                        <button className="btn" onClick={() => remove(group._id)}><span data-toggle="tooltip" data-placement="top" title="Delete this group"><FontAwesomeIcon icon="trash-alt" /></span></button>
                    )}
                </td>
            </tr>
        </>
    );
}

const Groups = ({groups=[], username, user, remove}) => {

    if (groups.length === 0) {
        return (
            <>
                <div className="row justify-content-center">
                    No groups yet.
                </div>
            </>
        );
    }
    
    let map;

    if (user && (user.username === username)) {
        map = groups.map((group, i) => {
            return (
                <Group user={user} remove={remove} count={group.members.length} key={i} group={group} />
            );
        });
    }
    else {
        const publicGroups = groups.filter(group => group.access !== 0);
        if (publicGroups.length === 0) {
            return (
                <>
                    <div className="row justify-content-center">
                        No groups yet.
                    </div>
                </>
            );
        }
        map = publicGroups.map((group, i) => {
            return (
                <Group user={user} remove={remove} count={group.members.length} key={i} group={group} />
            );
        });
    }

    

    return (
        <>
            <table className="table table-sm table-bordered table-striped table-responsive-sm table-hover">
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Admin</th>
                        <th>Members Count</th>
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


export default Groups;