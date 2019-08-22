import React, { Component } from 'react';
import { withRouter } from 'next/router';
import ProfileLayout from '../../../components/profile/profileLayout';
import {connect} from 'react-redux';
import {deauthenticate} from '../../../redux/actions/authActions';
import init from '../../../utils/initialize';
import Loading from '../../../components/loading';
import Layout from '../../../components/main/layout';
import {fetchUSerComingContests, fetchUSerRunningContests, fetchUSerPastContests, deleContest} from '../../../redux/actions/contestActions';
import MyContests from '../../../components/contest/myContests';

class UserContests extends Component {

    constructor(props) {
        super(props);

        this.username = props.router.query.username;
        this.delete = this.delete.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx);
    }

    async componentDidMount() {
        await this.props.fetchUSerComingContests(this.username);
        await this.props.fetchUSerPastContests(this.username);
        await this.props.fetchUSerRunningContests(this.username);
    }

    async delete(id) {
        await this.props.deleContest(id, this.props.auth.token);
    }

    render() {
        if (this.props.contests.userContestsError) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="row justify-content-center">
                            <p className="error">{this.props.contests.userContestsError}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.contests.userComingContests && this.props.contests.userPastContests && this.props.contests.userRunningContests) {
            const title = this.username + " contests | Practice Coding OJ";

            return (
                <>
                    <ProfileLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} username={this.username}>
                        <br />
                        <div className="container">
                            <MyContests username={this.username} user={this.props.auth.user} contests={this.props.contests.userComingContests} status="COMING" remove={this.delete} />
                            <br />
                            <MyContests username={this.username} user={this.props.auth.user} contests={this.props.contests.userRunningContests} status="RUNNING" remove={this.delete} />
                            <br />
                            <MyContests username={this.username} user={this.props.auth.user} contests={this.props.contests.userPastContests} status="PAST" remove={this.delete} />
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
        contests: state.contests
    }
);

export default withRouter(connect(
    mapStateToProps,
    {deauthenticate, fetchUSerComingContests, fetchUSerRunningContests, fetchUSerPastContests, deleContest}
)(UserContests));