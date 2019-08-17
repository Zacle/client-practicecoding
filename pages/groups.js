import React, { Component } from 'react';
import GroupLayout from '../components/group/groupLayout';
import {connect} from 'react-redux';
import {deauthenticate} from '../redux/actions/authActions';
import init from '../utils/initialize';
import {fetchGroups, deleteGroup} from '../redux/actions/groupActions';
import Loading from '../components/loading';
import Layout from '../components/main/layout';
import PublicGroups from '../components/group/groups';


class Groups extends Component {

    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx);
    }

    async delete(id) {
        await this.props.deleteGroup(id, this.props.auth.token);
    }

    async componentDidMount() {
        await this.props.fetchGroups();
    }

    render () {
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
        else if (this.props.groups.groups) {
            return (
                <>
                    <GroupLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title="Groups | Practice Coding OJ" description="All public groups created on Practice Coding OJ" >
                        <br />
                        <div className="container">
                            <PublicGroups groups={this.props.groups.groups} user={this.props.auth.user} remove={this.delete} />
                        </div>
                    </GroupLayout>
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

export default connect(
    mapStateToProps,
    {deauthenticate, fetchGroups, deleteGroup}
)(Groups);