import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InGroupLayout from '../../../components/group/inGroupLayout';
import Members from '../../../components/group/members';
import {deauthenticate} from '../../../redux/actions/authActions';
import init from '../../../utils/initialize';
import {fetchMembers, deleteUser} from '../../../redux/actions/groupActions';
import Loading from '../../../components/loading';
import Layout from '../../../components/main/layout';
import {connect} from 'react-redux';


class GroupMembers extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
        this.delete = this.delete.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx, true);
    }

    async delete(id) {
        await this.props.deleteUser(this.id, id, this.props.auth.token);
        if (this.props.groups.removeError) {
            alert(this.props.groups.error);
        }
    }

    async componentDidMount() {
        await this.props.fetchMembers(this.id, this.props.auth.user.username, this.props.auth.token);
    }

    render () {
        if (this.props.groups.groupMemberError) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="row justify-content-center">
                            <p className="error">{this.props.groups.groupMemberError}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.groups.groupMembers) {
            const title = this.props.groups.groupMembers.name + ` members | Parctice Coding OJ`;
            return (
                <>
                    <InGroupLayout group={this.props.groups.groupMembers} auth={this.props.auth} deauthenticate={this.props.deauthenticate} id={this.id} title={title}>
                        <br />
                        <div className="container">
                            <Members group={this.props.groups.groupMembers} user={this.props.auth.user} remove={this.delete} />
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
    {deauthenticate, fetchMembers, deleteUser}
)(GroupMembers));