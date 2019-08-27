import React, { Component } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import InContestLayout from '../../components/contest/inContestLayout';
import {connect} from 'react-redux';
import {deauthenticate} from '../../redux/actions/authActions';
import {fetchContest} from '../../redux/actions/contestActions';
import init from '../../utils/initialize';
import Layout from '../../components/main/layout';
import Loading from '../../components/loading';


class Home extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
    }

    static getInitialProps(ctx) {
        init(ctx);
    }

    async componentDidMount() {
        await this.props.fetchContest(this.id);
    }

    render () {
        if (this.props.contests.getContestError) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="error row justify-content-center">
                            <p className="error">{this.props.contests.getContestError}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.contests.getContest) {
            const title = this.props.contests.getContest.name + " | Practice Coding OJ";
            const description = "Contest on Practice Coding OJ";
            const date = new Date(this.props.contests.getContest.startDate);

            return (
                <>
                    <InContestLayout contest={this.props.contests.getContest} auth={this.props.auth} deauthenticate={this.props.deauthenticate} id={this.id} title={title} description={description}>
                        <br /><br />
                        <div className="container">
                            <table className="table table-sm table-bordered table-striped table-responsive-sm table-hover">
                                <thead className="thead-dark">
                                    <tr className="text-center">
                                        <th>Contest Name</th>
                                        <th>Contest Owner</th>
                                        <th>Start</th>
                                        <th>Duration</th>
                                        <th>Registrants</th>
                                        <th>Standing</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-center">
                                        <td>{this.props.contests.getContest.name}</td>
                                        <td><Link prefetch href="/profile/[username]" as={"/profile/" + this.props.contests.getContest.owner.username} ><a href={"/profile/" + this.props.contests.getContest.owner.username}>{this.props.contests.getContest.owner.username}</a></Link></td>
                                        <td>{date.toLocaleString('en-GB')}</td>
                                        <td>{this.props.contests.getContest.duration}</td>
                                        <td><Link prefetch href="/contests/[id]/registrants" as={`/contests/${this.id}/registrants`}><a href={`/contests/${this.id}/registrants`}>Registrants</a></Link></td>
                                        <td><Link prefetch href="/contests/[id]/standing" as={`/contests/${this.id}/standing`}><a href={`/contests/${this.id}/standing`}>Standing</a></Link></td>
                                    </tr>
                                </tbody>
                            </table>
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
    {deauthenticate, fetchContest}
)(Home));