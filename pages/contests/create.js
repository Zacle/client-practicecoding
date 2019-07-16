import React, { Component } from 'react';
import Link from 'next/link';
import ContestLayout from '../../components/contestLayout';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <>
                <br />
                <ContestLayout title="Create Contest | Practice Coding OJ" description="Create a new contest on Practice Coding OJ" ></ContestLayout>
            </>
        );
    }
}