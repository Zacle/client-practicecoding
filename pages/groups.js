import React, { Component } from 'react';
import Link from 'next/link';
import GroupLayout from '../components/group/groupLayout';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <>
                <br />
                <GroupLayout title="Groups | Practice Coding OJ" description="All publuc groups created on Practice Coding OJ" ></GroupLayout>
            </>
        );
    }
}