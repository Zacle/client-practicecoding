import React, { Component } from 'react';
import ContestLayout from '../../components/contest/contestLayout';
import MainContests from '../../components/contest/contests';
import {connect} from 'react-redux';
import {deauthenticate} from '../../redux/actions/authActions';
import {fetchRunningContests} from '../../redux/actions/contestActions';
import init from '../../utils/initialize';
import Layout from '../../components/main/layout';
import Loading from '../../components/loading';


class PastContests extends Component {

    constructor(props) {
        super(props);
    }

    static getInitialProps(ctx) {
        init(ctx);
    }

    async componentDidMount() {
        await this.props.fetchRunningContests();
    }

    render () {
        if (this.props.contests.runningError) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="error row justify-content-center">
                            <p className="error">{this.props.contests.runningError}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.contests.runningContests) {
            return (
                <>
                    <ContestLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title="Running Contests | Practice Coding OJ" description="Coming contests on Practice Coding OJ" >
                        <br />
                        <div className="container">
                            <MainContests contests={this.props.contests.runningContests} status="RUNNING" />
                        </div>
                    </ContestLayout>
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

export default connect(
    mapStateToProps,
    {deauthenticate, fetchRunningContests}
)(PastContests);