import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InGroupLayout from '../../../components/group/inGroupLayout';
import {deauthenticate} from '../../../redux/actions/authActions';
import init from '../../../utils/initialize';
import {addUser, fetchGroup} from '../../../redux/actions/groupActions';
import Loading from '../../../components/loading';
import Layout from '../../../components/main/layout';
import {connect} from 'react-redux';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import {API} from '../../../config';
import axios from 'axios';
import {UncontrolledAlert} from 'reactstrap';


class GroupInvitation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            isLoading: false,
            options: [],
            submit: false
        };
        this.id = props.router.query.id;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx, true);
    }

    async componentDidMount() {
        await this.props.fetchGroup(this.id, this.props.auth.user.username, this.props.auth.token);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const user = this.state.selected[0];
        await this.props.addUser(this.id, user._id, this.props.auth.token);
        await this.setState({
            submit: true
        });
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
        else if (this.props.groups.inGroup && this.props.groups.inGroup.admin) {
            const title = "Add user | Practice Coding OJ";
            return (
                <>
                    <InGroupLayout group={this.props.groups.inGroup} title={title} auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} id={this.id}>
                        <div className="container">
                            <div className="offset-md-3 justify-content-left">
                                <br />
                                    {this.props.groups.addUserError && this.state.submit &&
                                    (
                                        <UncontrolledAlert className="text-center" color="danger">
                                            {this.props.groups.addUserError}
                                        </UncontrolledAlert>
                                    )}
                                    {!this.props.groups.addUserError && this.state.submit &&
                                    (
                                        <UncontrolledAlert className="text-center" color="success">
                                            User added to the group
                                        </UncontrolledAlert>
                                    )}
                                <form onSubmit={this.handleSubmit} noValidate>
                                    <div className="form-group row">
                                        <label htmlFor="username" className="col-4 col-md-3 col-form-label col-form-label-sm">Username</label>
                                        <div className="col-8 col-md-5">
                                            <AsyncTypeahead
                                                        isLoading={this.state.isLoading}
                                                        allowNew={false}
                                                        multiple={false}
                                                        id="username"
                                                        labelKey="username"
                                                        minLength={1}
                                                        onChange={selected => this.setState({ selected })}
                                                        placeholder="Search username..."
                                                        onSearch={query => {
                                                            this.setState({isLoading: true});
                                                            axios.get(`${API}/users/${query}`,
                                                            {
                                                                headers: {
                                                                    Accept: "application/json",
                                                                    'Content-Type': 'application/json'                                                        }
                                                            })
                                                            .then((response) => { /* eslint-disable-line camelcase */
                                                                const options = response.data.map((user) => ({
                                                                    _id: user._id,
                                                                    username: user.username
                                                                }));
                                                                console.log("DATA: ", options);
                                                                this.setState({
                                                                    isLoading: false,
                                                                    options: options,
                                                                });
                                                            });
                                                        }}
                                                        options={this.state.options} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-4 col-md-3"></div>
                                        <div className="col-8 col-md-4">
                                            <button type="submit" className="btn btn-primary col-8 col-md-5">Add</button>
                                        </div>
                                    </div>
                                </form>
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
    {deauthenticate, addUser, fetchGroup}
)(GroupInvitation));