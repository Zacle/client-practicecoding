import React, { Component } from 'react';
import { withRouter } from 'next/router';
import {connect} from 'react-redux';
import {deauthenticate} from '../../../redux/actions/authActions';
import init from '../../../utils/initialize';
import Loading from '../../../components/loading';
import Layout from '../../../components/main/layout';
import {fetchGroup, fetchGroupComingContests, fetchGroupRunningContests, fetchGroupPastContests} from '../../../redux/actions/groupActions';
import MyContests from '../../../components/contest/myContests';
import InGroupLayout from '../../../components/group/inGroupLayout';
import {deleContest} from '../../../redux/actions/contestActions';


class GroupContests extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
        this.delete = this.delete.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx, true);
    }

    async componentDidMount() {
        await this.props.fetchGroup(this.id, this.props.auth.user.username, this.props.auth.token);
        await this.props.fetchGroupComingContests(this.id, this.props.auth.token);
        await this.props.fetchGroupPastContests(this.id, this.props.auth.token);
        await this.props.fetchGroupRunningContests(this.id, this.props.auth.token);
    }

    async delete(id) {
        await this.props.deleContest(id, this.props.auth.token);
    }

    render() {
        if (this.props.groups.groupContestsError) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="row justify-content-center">
                            <p className="error">{this.props.groups.groupContestsError}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.groups.inGroup && this.props.groups.groupComingContests && this.props.groups.groupPastContests && this.props.groups.groupRunningContests) {
            const title = "Group contests | Practice Coding OJ";

            return (
                <>
                    <InGroupLayout group={this.props.groups.inGroup} auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} username={this.username} id={this.id} >
                        <br />
                        <div className="container">
                            <MyContests user={this.props.auth.user} contests={this.props.groups.groupComingContests} status="COMING" remove={this.delete} />
                            <br />
                            <MyContests user={this.props.auth.user} contests={this.props.groups.groupRunningContests} status="RUNNING" remove={this.delete} />
                            <br />
                            <MyContests user={this.props.auth.user} contests={this.props.groups.groupPastContests} status="PAST" remove={this.delete} />
                        </div>
                    </InGroupLayout>
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
        contests: state.contests,
        groups: state.groups
    }
);

export default withRouter(connect(
    mapStateToProps,
    {deauthenticate, fetchGroup, fetchGroupComingContests, fetchGroupRunningContests, fetchGroupPastContests, deleContest}
)(GroupContests));