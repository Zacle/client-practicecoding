import React, { Component } from 'react';
import ProfileLayout from '../../components/profile/profileLayout';
import { withRouter } from 'next/router';
import {connect} from 'react-redux';
import init from '../../utils/initialize';
import {deauthenticate} from '../../redux/actions/authActions';
import {getUser} from '../../redux/actions/userActions';
import Layout from '../../components/main/layout';
import Loading from '../../components/loading';


class Profile extends Component {

    constructor(props) {
        super(props);

        this.username = this.props.router.query.username;
    }

    static getInitialProps(ctx) {
        init(ctx);
    }

    async componentDidMount() {
        await this.props.getUser(this.username);
    }

    render() {
        if (this.props.user.error) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="row justify-content-center">
                            <p className="error">{this.props.user.error}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.user.user) {
            let date = new Date(this.props.user.user.joined);
            const title = this.username + " | Practice Coding OJ";
            const description = `Profile of ${this.username} on Practice Coding OJ`;
            return (
                <>
                    <ProfileLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} description={description} username={this.username}>
                        <div className="shadow bg-white rounded container">
                            <div className="profile justify-content-center" style={{fontFamily: "Crimson Pro', serif"}}>
                                <div className="row">
                                    <div className="col-4 col-md-4">Full Name: </div>
                                    <div className="col-8 col-md-6">{this.props.user.user.fullname}</div>
                                </div>
                                <div className="row">
                                    <div className="col-4 col-md-4">Codeforces Handle: </div>
                                    <div className="col-8 col-md-6">{this.props.user.user.codeforces}</div>
                                </div>
                                <div className="row">
                                    <div className="col-4 col-md-4">Uva Handle: </div>
                                    <div className="col-8 col-md-6">{this.props.user.user.uva}</div>
                                </div>
                                <div className="row">
                                    <div className="col-4 col-md-4">Live Archive: </div>
                                    <div className="col-8 col-md-6">{this.props.user.user.livearchive}</div>
                                </div>
                                <div className="row">
                                    <div className="col-4 col-md-4">Joined on: </div>
                                    <div className="col-8 col-md-6">{date.toLocaleString('en-GB')}</div>
                                </div>
                            </div>
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

const mapStateToProps = state => ({user: state.user,
        auth: state.authentication
    }
);

export default withRouter(connect(
    mapStateToProps,
    {deauthenticate, getUser}
)(Profile));
