import React, { Component } from 'react';
import ProfileLayout from '../../components/profile/profileLayout';
import { withRouter } from 'next/router';
import {connect} from 'react-redux';
import init from '../../utils/initialize';
import {deauthenticate} from '../../redux/actions/authActions';
import {getUser} from '../../redux/actions/userActions';
import Layout from '../../components/main/layout';

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
            const title = this.username + " | Practice Coding OJ";
            const description = `Profile of ${this.username} on Practice Coding OJ`;
            return (
                <>
                    <ProfileLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} description={description} username={this.username}>
                        <div className="container">
                            <div className="profile justify-content-left" style={{fontFamily: "Crimson Pro', serif"}}>
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
                                    <div className="col-4 col-md-4">Join on: </div>
                                    <div className="col-8 col-md-6">{this.props.user.user.joined}</div>
                                </div>
                            </div>
                        </div>
                    </ProfileLayout>
                </>
            );
        }
        else {
            const title = "Loading... | Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="row justify-content-center">
                            <p className="text-info">Loading...</p>
                        </div>
                    </div>
                </Layout>
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
