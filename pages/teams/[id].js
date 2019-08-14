import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/main/layout';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import init from '../../utils/initialize';
import {deauthenticate} from '../../redux/actions/authActions';
import {fetchTeam, deleteUser, addUser} from '../../redux/actions/teamActions';
import Loading from '../../components/loading';
import Members from '../../components/team/teamMembers';
import {connect} from 'react-redux';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import {API} from '../../config';
import axios from 'axios';
import {UncontrolledAlert} from 'reactstrap';


class Team extends Component {

    constructor (props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            selected: [],
            isLoading: false,
            options: [],
            submit: false
        };
        this.id = props.router.query.id;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.delete = this.delete.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx);
    }

    async componentDidMount() {
        await this.props.fetchTeam(this.id);
    }

    async delete(userID) {
        await this.props.deleteUser(this.id, userID, this.props.auth.token);
        await this.setState({
            submit: true
        });
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
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
        
        if (this.props.teams.error) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="row justify-content-center">
                            <p className="error">{this.props.teams.error}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.teams.team) {
            const title = this.props.teams.team.name +  " | Practice Coding OJ";
            const date = new Date(this.props.teams.team.creation);
            let isAdmin = false;
            if (this.props.auth.user) {
                isAdmin = this.props.auth.user.username === this.props.teams.team.admin.username;
            }
            let addError = this.props.teams.addError;
            let deleteError = this.props.teams.deleteError;
            return (
                <>
                    <Layout title={title} auth={this.props.auth} deauthenticate={this.props.deauthenticate}>
                        <br /><br />
                        {isAdmin && (
                        <div className="mt-5 container">
                            <div className="justify-content-center offset-md-3 col-md-7 offset-md-2">
                                <h4>Invite a user</h4>
                                <hr/>
                                {deleteError && this.state.submit &&
                                (
                                    <UncontrolledAlert color="danger">
                                        {this.props.teams.deleteError}
                                    </UncontrolledAlert>
                                )}
                                {addError && this.state.submit &&
                                (
                                    <UncontrolledAlert color="danger">
                                        {this.props.teams.addError}
                                    </UncontrolledAlert>
                                )}
                                <form onSubmit={this.handleSubmit} noValidate>
                                    <div className="form-group row">
                                        <label htmlFor="username" className="col-4 col-md-3 col-form-label col-form-label-sm">Username</label>
                                        <div className="col-8 col-md-4">
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
                                            <button type="submit" className="btn btn-primary col-8 col-md-6">Add User</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>)}
                        <br /> <br />
                        <div className="container">
                            <div className="team-info justify-content-center offset-md-3 col-md-6 offset-md-2">
                                <div className="card text-center">
                                    <div className="card-header">
                                        <Nav tabs>
                                            <NavItem>
                                                <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                                                        onClick={() => { this.toggle('1'); }}>
                                                    Info
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                                                        onClick={() => { this.toggle('2'); }}>
                                                    Members
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                    <div className="card-body">
                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane tabId="1">
                                                <div className="row justify-content-left">
                                                    <div className="col-4">Team name:</div>
                                                    <div className="col-8">{this.props.teams.team.name}</div>
                                                </div>
                                                <div className="row justify-content-left">
                                                    <div className="col-4">Created on</div>
                                                    <div className="col-8">{date.toLocaleString('en-GB')}</div>
                                                </div>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <Members team={this.props.teams.team} user={this.props.auth.user} remove={this.delete} />
                                            </TabPane>
                                        </TabContent>
                                    </div>
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
    teams: state.teams
}
);

export default withRouter(connect(
    mapStateToProps,
    {deauthenticate, fetchTeam, deleteUser, addUser}
)(Team));


