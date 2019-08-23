import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InContestLayout from '../../../components/contest/inContestLayout';
import Registrants from '../../../components/contest/registrants';
import {connect} from 'react-redux';
import {deauthenticate} from '../../../redux/actions/authActions';
import {fetchRegistrants} from '../../../redux/actions/contestActions';
import init from '../../../utils/initialize';
import Layout from '../../../components/main/layout';
import Loading from '../../../components/loading';


class ContestRegistrants extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
        this.delete = this.delete.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx);
    }

    async componentDidMount() {
        await this.props.fetchRegistrants(this.id);
    }

    async delete(id) {

    }

    render () {
        if (this.props.contests.registrantsError) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="error row justify-content-center">
                            <p className="error">{this.props.contests.registrantsError}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.contests.registrants) {
            const title = "Registrants | Practice Coding OJ";
            const description = "Registrants for this contest";

            return (
                <>
                    <InContestLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} id={this.id} title={title} description={description} >
                        <br />
                        <div className="container">
                            <Registrants contest={this.props.contests.registrants} user={this.props.auth.user} remove={this.delete} />
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
    {deauthenticate, fetchRegistrants}
)(ContestRegistrants));