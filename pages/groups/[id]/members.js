import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InGroupLayout from '../../../components/group/inGroupLayout';
import Members from '../../../components/group/members';

class GroupMembers extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
    }

    render () {
        const title= `Group Test Members | Parctice Coding OJ`;
        return (
            <>
                <br />
                <InGroupLayout id={this.id} title={title}>
                    <div className="container">
                        <Members />
                    </div>
                </InGroupLayout>
            </>
        );
    }
}

export default withRouter(GroupMembers);