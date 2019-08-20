import React, { Component } from 'react';
import Link from 'next/link';
import ContestLayout from '../../components/contest/contestLayout';
import MainContests from '../../components/contest/contests';
import {connect} from 'react-redux';
import {deauthenticate} from '../../redux/actions/authActions';
import {fetchPastContests} from '../../redux/actions/contestActions';
import init from '../../utils/initialize';
import Layout from '../../components/main/layout';
import Loading from '../../components/loading';
import Pagination from '../../components/train/pagination';



class PastContests extends Component {

    constructor(props) {
        super(props);

        this.onPageChanged = this.onPageChanged.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx);
    }

    async componentDidMount() {
        await this.props.fetchPastContests(1);
    }

    async onPageChanged(currentPage) {
        await this.props.fetchPastContests(currentPage);
    }

    render () {
        if (this.props.contests.pastError) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="error row justify-content-center">
                            <p className="error">{this.props.contests.pastError}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.contests.pastContests) {
            const display = this.props.contests.pastContests.contests.length > 0;
            return (
                <>
                    <ContestLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title="Past Contests | Practice Coding OJ" description="Coming contests on Practice Coding OJ" >
                        <br />
                        <div className="container">
                            <MainContests contests={this.props.contests.pastContests.contests} status="PAST" />
                            <div className="row justify-content-center">
                                {display && (
                                    <>
                                        <br />
                                        <div className="d-flex flex-row py-4 align-items-center">
                                            <Pagination totalRecords={this.props.contests.pastContests.total} pageLimit={this.props.contests.pastContests.per_page} pageNeighbours={2} onPageChanged={this.onPageChanged} />
                                        </div>
                                    </>
                                )}
                            </div>
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
    {deauthenticate, fetchPastContests}
)(PastContests);