import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InGroupLayout from '../../../components/group/inGroupLayout';
import {connect} from 'react-redux';
import {deauthenticate} from '../../../redux/actions/authActions';
import init from '../../../utils/initialize';
import {fetchJoinGroup} from '../../../redux/actions/groupActions';
import Loading from '../../../components/loading';
import Layout from '../../../components/main/layout';
import Link from 'next/link';

class Join extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            access: ''
        };

        this.id = props.router.query.id;
        this.join = this.join.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx, true);
    }

    async join() {

    }

    async componentDidMount() {
        await this.props.fetchJoinGroup(this.id, this.props.auth.token);
        await this.setState({
            name: this.props.groups.inGroup.name,
            description: this.props.groups.inGroup.description,
            access: this.props.groups.inGroup.access
        });
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
        else if (this.props.groups.inGroup) {
            const title = "Join Group | Practice Coding OJ";
            let date = new Date(this.props.groups.inGroup.creation);
            let access = "Public";
            if (this.props.groups.inGroup.access === 0) {
                access = "Private";
            }
            return (
                <>
                    <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} id={this.id}>
                        <br /><br /><br /><br />
                        <div className="main-info container">
                            <div className="row justify-content-center">
                                <h2>Join Group</h2>
                            </div>
                            <br />
                            <div className="row justify-content-center">
                                <div className="offset-md-3 col-4 col-md-3">Name: </div>
                                <div className="col-8 col-md-5"><b>{this.props.groups.inGroup.name}</b></div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="offset-md-3 col-4 col-md-3">Description: </div>
                                <div className="col-8 col-md-5">{this.props.groups.inGroup.description}</div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="offset-md-3 col-4 col-md-3">Creator: </div>
                                <div className="col-8 col-md-5"><Link prefetch href="/profile/[username]" as={"/profile/" + this.props.groups.inGroup.admin.username} ><a href={"/profile/" + this.props.groups.inGroup.admin.username}>{this.props.groups.inGroup.admin.username}</a></Link></div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="offset-md-3 col-4 col-md-3">Created On: </div>
                                <div className="col-8 col-md-5">{date.toLocaleString('en-GB')}</div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="offset-md-3 col-4 col-md-3">Access: </div>
                                <div className="col-8 col-md-5">{access}</div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="offset-md-3 col-4 col-md-3"></div>
                                <div className="col-8 col-md-5">
                                    <button className="btn btn-primary" disabled>Join</button>
                                </div>
                            </div>
                        </div>
                    </Layout>
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
    {deauthenticate, fetchJoinGroup}
)(Join));