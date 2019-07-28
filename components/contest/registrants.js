import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';


const Registrant = registrant => {
    return (
        <>
            <tr>
                <td>
                    <Link prefetch href="/profile/[username]" as={`/profile/${registrant.username}`}><a href={`/profile/${registrant.username}`}>{registrant.username} {' '}</a></Link>
                </td>
                <td><FontAwesomeIcon icon="trash-alt" /></td>
            </tr>
        </>
    );
}

const TeamRegistrant = registrant => {
    return (
        <>
            <tr>
                <td>
                    <Link prefetch href="/teams/[id]" as={`/teams/${registrant._id}`}><a href={`/teams/${registrant._id}`}>{registrant.name} {' '}</a></Link>
                </td>
                <td><FontAwesomeIcon icon="trash-alt" /></td>
            </tr>
        </>
    );
}

const Registrants = ({registrants = []}) => {

    if (registrants.length === 0) {
        return (
            <>
                <div className="row justify-content-center">
                    No registrants to this contest yet.
                </div>
            </>
        );
    }

    const map = registrants.map((registrant, i) => {
        return (
            <Registrant key={i} registrant={registrant} />
        );
    });

    return (
        <>
            <table className="table table-bordered table-striped table-responsive-sm table-hover">
                <thead>
                    <tr>
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

export default Registrants;