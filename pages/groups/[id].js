import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InGroupLayout from '../../components/group/inGroupLayout';
import {connect} from 'react-redux';
import {deauthenticate} from '../../redux/actions/authActions';
import init from '../../utils/initialize';
import {fetchGroup} from '../../redux/actions/groupActions';
import Link from 'next/link';
import Loading from '../../components/loading';
import Layout from '../../components/main/layout';


class Home extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
    }

    static getInitialProps(ctx) {
        init(ctx, true);
    }

    async componentDidMount() {
        await this.props.fetchGroup(this.id, this.props.auth.user.username, this.props.auth.token);
    }

    render() {
        if (this.props.groups.error) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="row justify-content-center">
                            <p className="error">{this.props.groups.error}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.groups.inGroup && this.props.groups.inGroup.admin) {
            const title = this.props.groups.inGroup.name +  " | Practice Coding OJ";
            let date = new Date(this.props.groups.inGroup.creation);
            let access = "Public";
            if (this.props.groups.inGroup.access === 0) {
                access = "Private";
            }
            return (
                <>
                    <InGroupLayout group={this.props.groups.inGroup} auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} id={this.id}>
                        <br />
                        <div className="main-info container">
                            <div className="row justify-content-center">
                                <div className="offset-md-4 col-4 col-md-3">Name: </div>
                                <div className="col-8 col-md-5"><b>{this.props.groups.inGroup.name}</b></div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="offset-md-4 col-4 col-md-3">Description: </div>
                                <div className="col-8 col-md-5">{this.props.groups.inGroup.description}</div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="offset-md-4 col-4 col-md-3">Creator: </div>
                                <div className="col-8 col-md-5"><Link href="/profile/[username]" as={"/profile/" + this.props.groups.inGroup.admin.username} ><a href={"/profile/" + this.props.groups.inGroup.admin.username}>{this.props.groups.inGroup.admin.username}</a></Link></div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="offset-md-4 col-4 col-md-3">Created On: </div>
                                <div className="col-8 col-md-5">{date.toLocaleString('en-GB')}</div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="offset-md-4 col-4 col-md-3">Access: </div>
                                <div className="col-8 col-md-5">{access}</div>
                            </div>
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
        groups: state.groups
    }
);

export default withRouter(connect(
    mapStateToProps,
    {deauthenticate, fetchGroup}
)(Home));