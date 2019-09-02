import React from 'react';
import Link from 'next/link';


const Problem = ({problem, i}) => {
    
    return (
        <>
            <th scope="col"><a href={problem.link} target="_blank" title={problem.name + ` (${problem.plateform})`}> {"P"+(i+1)} </a></th>
        </>
    );
}

const Standing = ({problems = [], tracker, index, standing}) => {
    if (standing.contestID.type === 2) {
        return (
            <StandingTeam key={index} problems={problems} tracker={tracker} index={index} />
        );
    }
    else {
        return (
            <StandingUser key={index} problems={problems} tracker={tracker} index={index} />
        );
    }
}

const StandingUser = ({problems = [], tracker, index}) => {
    
    
    const map = problems.map((problem, i) => {
        let color = "white";
        let data = "";
        if (tracker.unSolved[i] != 0) {
            data = tracker.unSolved[i];
            color = "red";
        }
        if (tracker.solved[i] != 0) {
            color = "lightgreen";
        }
        return (
            <td key={i+1} style={{backgroundColor: color}}>{data}</td>
        );
    });

    return (
        <tr key={index} className="text-center">
            <td scope="row">{index}</td>
            <td>
                <Link prefetch href="/profile/[username]" as={"/profile/" + tracker.contestant.username} ><a href={"/profile/" + tracker.contestant.username}>{tracker.contestant.username}</a></Link>
            </td>
            <td>{tracker.solvedCount}</td>
            <td>{tracker.penalty}</td>
            {map}
        </tr>
    );
}

const StandingTeam = ({problems = [], tracker, index}) => {
    
    const map = problems.map((problem, i) => {
        let color = "white";
        let data = "";
        if (tracker.unSolved[i] != 0) {
            data = tracker.unSolved[i];
            color = "red";
        }
        if (tracker.solved[i] != 0) {
            color = "lightgreen";
        }
        return (
            <>
                <td key={i+1} style={{backgroundColor: color}}>{data}</td>
            </>
        );
    });

    return (
        <tr key={index} className="text-center">
            <td scope="row">{index}</td>
            <td>
                <Link prefetch href="/teams/[id]" as={"/teams/" + tracker.contestants._id} ><a href={"/teams/" + tracker.contestants._id}>{tracker.contestants.name}</a></Link>
            </td>
            <td>{tracker.solvedCount}</td>
            <td>{tracker.penalty}</td>
            {map}
        </tr>
    );
}

const Standings = ({problems = [], standing}) => {

    const mp = problems.map((problem, i) => {
        return (
            <Problem key={i+1} problem={problem} i={i} />
        );
    });

    const ms = standing.trackers.map((tracker, i) => {
        return (
            <Standing key={i+1} standing={standing} index={i+1} problems={problems} tracker={tracker} />
        );
    });

    let message = "Automatic update occur every 3 minutes";

    if (standing.contestID.type === 2) {
        message = "Automatic update occur every 5 minutes";
    }

    return (
        <>
            <div className="card-text row justify-content-center">
                {message}
            </div>
            <div className="table-responsive">
                <table className="table table-sm table-bordered table-striped table-hover table-fixed">
                    <thead className="thead-dark">
                        <tr className="text-center">
                            <th scope="col">Rank</th>
                            <th scope="col">Contestant</th>
                            <th scope="col">Solved</th>
                            <th scope="col">Penalty</th>
                            {mp}
                        </tr>
                    </thead>
                    <tbody>
                        {ms}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Standings;