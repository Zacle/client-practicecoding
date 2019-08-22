import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InContestLayout from '../../../components/contest/inContestLayout';
import Submissions from '../../../components/contest/submissions';
import {connect} from 'react-redux';
import {deauthenticate} from '../../../redux/actions/authActions';
import {fetchSubmissions} from '../../../redux/actions/contestActions';
import init from '../../../utils/initialize';
import Layout from '../../../components/main/layout';
import Loading from '../../../components/loading';



class ContestSubmissions extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
    }

    static getInitialProps(ctx) {
        init(ctx);
    }

    async componentDidMount() {
        await this.props.fetchSubmissions(this.id);
    }

    render () {
        if (this.props.contests.submissionsError) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="error row justify-content-center">
                            <p className="error">{this.props.contests.submissionsError}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.contests.submissions) {
            const title = "Submissions | Practice Coding OJ";
            const description = "Contest submissions";

            return (
                <>
                    <InContestLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} id={this.id} title={title} description={description} >
                        <br /><br />
                        <div>
                            <Submissions contest={this.props.contests.submissions} />
                        </div>
                    </InContestLayout>
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
    {deauthenticate, fetchSubmissions}
)(ContestSubmissions));