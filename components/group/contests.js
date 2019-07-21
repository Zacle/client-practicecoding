import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Contest = ({contest}) => {
    let date = new Date(contest.startDate);
    return (
        <>
            <tr>
                <td>
                    <Link prefetch href="contests/[id]" as={`/contests/${contest._id}`} ><a href={`/contests/${contest._id}`}>{contest.name}</a></Link>
                </td>
                <td>
                    {date.toLocaleString('en-GB')}
                </td>
                <td>
                    {contest.duration}
                </td>
                <td>
                    <Link prefetch href="contests/[id]/standing" as={`/contests/${contest._id}/standing`} ><a href={`/contests/${contest._id}/standing`}>Standing</a></Link>
                </td>
                <td>
                    <FontAwesomeIcon icon="trash-alt" />
                </td>
            </tr>
        </>
    );
}

const Contests = ({contests=[]}) => {

    if (contests.length === 0) {
        return (
            <>
                <div className="row justify-content-center">
                    No contests in this group yet
                </div>
            </>
        );
    }

    const map = contests.map((contest, i) => {
        return (
            <Contest key={i} contest={contest} />
        );
    });

    return (
        <>
            <table className="table table-bordered table-striped table-responsive-sm table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
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


export default Contests;