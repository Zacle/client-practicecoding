import React from 'react';
import Link from 'next/link';


const Problem = ({problem, i}) => {
    
    return (
        <>
            <th scope="col"><a href={problem.link}> {"P"+(i+1)} </a></th>
        </>
    );
}

const Standing = ({problems = [], standing, index}) => {
    let color = "white";
    let data = "";
    
    const map = problems.map((problem, i) => {
        if (standing.unsolved[i] != 0) {
            data = standing.unsolved[i] + "";
            color = "red";
        }
        if (standing.solved[i] != 0) {
            color = "green";
        }
        return (
            <>
                <td key={i} style={{color: color}}>{data}</td>
            </>
        );
    });

    return (
        <>
            <td scope="row">{index}</td>
            <td>
                <Link prefetch href="/profile/[username]" as={"/profile/" + standing.contestant.username} ><a href={"/profile/" + standing.contestant.username}>{standing.contestant.username}</a></Link>
            </td>
            <td>{standing.solvedCount}</td>
            <td>{standing.penalty}</td>
            {map}
        </>
    );
}

const StandingTeam = ({problems = [], standing, index}) => {
    let color = "white";
    let data = "";
    
    const map = problems.map((problem, i) => {
        if (standing.unsolved[i] != 0) {
            data = standing.unsolved[i] + "";
            color = "red";
        }
        if (standing.solved[i] != 0) {
            color = "green";
        }
        return (
            <>
                <td key={i} style={{color: color}}>{data}</td>
            </>
        );
    });

    return (
        <>
            <td scope="row">{index}</td>
            <td>
                <Link prefetch href="/teams/[id]" as={"/profile/" + standing.contestants._id} ><a href={"/profile/" + standing.contestants._id}>{standing.contestants.name}</a></Link>
            </td>
            <td>{standing.solvedCount}</td>
            <td>{standing.penalty}</td>
            {map}
        </>
    );
}

const Standings = ({problems = [], standings = []}) => {

    const mp = problems.map((problem, i) => {
        return (
            <Problem key={i} problem={problem} i={i} />
        );
    });

    const ms = standings.map((standing, i) => {
        return (
            <Standing index={i+1} key={i} problems={problems} standing={standing} />
        );
    });

    return (
        <>
            <table lassName="table table-sm table-bordered table-striped table-responsive-sm table-hover">
                <thead>
                    <tr>
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
        </>
    );
}

export default Standings;