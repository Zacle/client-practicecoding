import React, { Component } from 'react';
import { withRouter } from 'next/router';
import ProfileLayout from '../../../components/profile/profileLayout';
import Groups from '../../../components/group/myGroups';
import {connect} from 'react-redux';
import {deauthenticate} from '../../../redux/actions/authActions';
import init from '../../../utils/initialize';
import {fetchUserGroups, deleteGroup} from '../../../redux/actions/groupActions';
import Loading from '../../../components/loading';
import Layout from '../../../components/main/layout';


class UserGroups extends Component {

    constructor(props) {
        super(props);

        this.username = props.router.query.username;
        this.delete = this.delete.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx);
    }

    async componentDidMount() {
        await this.props.fetchUserGroups(this.username);
    }

    async delete(id) {
        await this.props.deleteGroup(id, this.props.auth.token);
    }

    render () {
        if (this.props.groups.error) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="row justify-content-center">
                            <p className="error">{this.props.groups.error}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.groups.userGroups) {
            const title = this.username + " groups | Practice Coding OJ";

            return (
                <>
                    <ProfileLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} username={this.username}>
                        <br />
                        <div className="container">
                            <Groups groups={this.props.groups.userGroups} username={this.username} user={this.props.auth.user} remove={this.delete} />
                        </div>
                    </ProfileLayout>
                </>
            );
        }
        else {
            return (
                <Loading auth={this.props.auth} deauthenticate={this.props.deauthenticate} />
            );
        }
    }
}

const mapStateToProps = state => ({
        auth: state.authentication,
        groups: state.groups
    }
);

export default withRouter(connect(
    mapStateToProps,
    {deauthenticate, fetchUserGroups, deleteGroup}
)(UserGroups));