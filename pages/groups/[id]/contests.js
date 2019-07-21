import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InGroupLayout from '../../../components/group/inGroupLayout';
import Contests from '../../../components/group/contests';

class GroupContests extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
    }

    render () {
        const title= `Group Test Members | Practice Coding OJ`;
        return (
            <>
                <br />
                <InGroupLayout id={this.id} title={title}>
                    <div className="container">
                        <Contests />
                    </div>
                </InGroupLayout>
            </>
        );
    }
}

export default withRouter(GroupContests);