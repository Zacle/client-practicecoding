import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InContestLayout from '../../../components/contest/inContestLayout';
import Standings from '../../../components/contest/standing';
import {connect} from 'react-redux';
import {deauthenticate} from '../../../redux/actions/authActions';
import {fetchStanding, updateStanding} from '../../../redux/actions/contestActions';
import init from '../../../utils/initialize';
import Layout from '../../../components/main/layout';
import Loading from '../../../components/loading';



class ContestStanding extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
    }

    static getInitialProps(ctx) {
        init(ctx);
    }

    async componentDidMount() {
        await this.props.updateStanding(this.id);

        if (this.props.contests.standing.standing.contestID.type === 1) {
            this.interval = setInterval(() => this.props.updateStanding(this.id), 180000);
        }
        else {
            this.interval = setInterval(() => this.props.updateStanding(this.id), 240000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
        if (this.props.contests.standingError) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="error row justify-content-center">
                            <p className="error">{this.props.contests.standingError}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.contests.standing) {
            const title = "Standing | Practice Coding OJ";
            const description = "Standing for this contest";

            return (
                <>
                    <InContestLayout contest={this.props.contests.standing.standing.contestID} auth={this.props.auth} deauthenticate={this.props.deauthenticate} id={this.id} title={title} description={description} >
                        <br />
                        <div className="container">
                            <Standings problems={this.props.contests.standing.problems} standing={this.props.contests.standing.standing} />
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
    {deauthenticate, fetchStanding, updateStanding}
)(ContestStanding));