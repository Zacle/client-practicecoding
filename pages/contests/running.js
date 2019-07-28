import React, { Component } from 'react';
import Link from 'next/link';
import ContestLayout from '../../components/contest/contestLayout';
import MainContests from '../../components/contest/contests';


export default class extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <>
                <br />
                <ContestLayout title="Running Contests | Practice Coding OJ" description="Current running contests on Practice Coding OJ" >
                    <br />
                    <div className="container">
                        <MainContests status="RUNNING" />
                    </div>
                </ContestLayout>
            </>
        );
    }
}