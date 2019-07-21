import React, { Component } from 'react';
import Link from 'next/link';
import ContestLayout from '../../components/contest/contestLayout';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <>
                <br />
                <ContestLayout title="Coming Contests | Practice Coding OJ" description="Coming contests on Practice Coding OJ" ></ContestLayout>
            </>
        );
    }
}