import React, { Component } from 'react';
import { withRouter } from 'next/router';
import ProfileLayout from '../../../components/profile/profileLayout';
import Groups from '../../../components/group/myGroups';


class UserGroups extends Component {

    constructor(props) {
        super(props);

        this.username = props.router.query.username;
    }

    render () {
        const title="zackle groups | Practice Coding OJ";

        return (
            <>
                <br />
                <ProfileLayout title={title} username={this.username}>
                    <br /><br />
                    <div className="container">
                        <Groups />
                    </div>
                </ProfileLayout>
            </>
        );
    }
}

export default withRouter(UserGroups);