import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Group = ({group}) => {
    let date = new Date(group.creation);
    return (
        <>
            <tr>
                <td>
                    <Link prefetch href="groups/[id]" as={"/groups/" + group._id} ><a href={"/groups/" + group._id}>{group.name}</a></Link>
                </td>
                <td>
                    <Link prefetch href="/profile/[username]" as={"/profile/" + group.admin.username} ><a href={"/profile/" + group.admin.username}>{group.admin.username}</a></Link>
                </td>
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

const Groups = ({groups=[]}) => {

    if (groups.length === 0) {
        return (
            <>
                <div className="row justify-content-center">
                    You have no groups yet.
                </div>
            </>
        );
    }

    const map = groups.map((group, i) => {
        return (
            <Group key={i} group={group} />
        );
    });

    return (
        <>
            <table className="table table-bordered table-striped table-responsive-sm table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Owner</th>
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