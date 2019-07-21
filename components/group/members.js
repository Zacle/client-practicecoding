import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Member = ({member}) => {
    let date = new Date(member.joined);
    return (
        <>
            <tr>
                <td>
                    <Link prefetch href={"profile/" + member.user.username} ><a href={"profile/" + member.user.username}>{member.user.username}</a></Link>
                </td>
                <td>
                    {member.membershipType}
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

const Members = ({members=[]}) => {

    if (members.length === 0) {
        return (
            <>
                <div className="row justify-content-center">
                    No members in this group yet
                </div>
            </>
        );
    }

    const map = members.map((member, i) => {
        return (
            <Member key={i} member={member} />
        );
    });

    return (
        <>
            <table className="table table-bordered table-striped table-responsive-sm table-hover">
                <thead>
                    <tr>
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