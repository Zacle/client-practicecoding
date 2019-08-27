import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InContestLayout from '../../../components/contest/inContestLayout';
import Problems from '../../../components/contest/problems';
import {connect} from 'react-redux';
import {deauthenticate} from '../../../redux/actions/authActions';
import {fetchProblems, deleteProblem} from '../../../redux/actions/contestActions';
import init from '../../../utils/initialize';
import Layout from '../../../components/main/layout';
import Loading from '../../../components/loading';



class ContestProblems extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
        this.delete = this.delete.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx);
    }

    async componentDidMount() {
        await this.props.fetchProblems(this.id);
    }

    async delete(id) {
        await this.props.deleteProblem(this.id, id, this.props.auth.token);
    }

    render () {
        if (this.props.contests.problemsError) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="error row justify-content-center">
                            <p className="error">{this.props.contests.problemsError}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.contests.problems) {
            const title = "Problems | Practice Coding OJ";
            const description = "Problems for this contest";

            return (
                <>
                    <InContestLayout contest={this.props.contests.problems} auth={this.props.auth} deauthenticate={this.props.deauthenticate} id={this.id} title={title} description={description} >
                        <br />
                        <div className="container">
                            <Problems contest={this.props.contests.problems} user={this.props.auth.user} remove={this.delete} />
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
    {deauthenticate, fetchProblems, deleteProblem}
)(ContestProblems));