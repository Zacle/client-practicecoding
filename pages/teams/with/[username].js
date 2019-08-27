import React, { Component } from 'react';
import { withRouter } from 'next/router';
import ProfileLayout from '../../../components/profile/profileLayout';
import Teams from '../../../components/team/myTeams';
import {connect} from 'react-redux';
import { Form, Input, UncontrolledAlert } from 'reactstrap';
import init from '../../../utils/initialize';
import {deauthenticate} from '../../../redux/actions/authActions';
import {fetchTeams, deleteTeam, postTeam} from '../../../redux/actions/teamActions';
import Loading from '../../../components/loading';
import Layout from '../../../components/main/layout';


class UserTeams extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            submit: false
        };

        this.username = props.router.query.username;
        this.delete = this.delete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);    }

    async handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        await this.setState({
          [name]: value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        await this.props.postTeam(this.state.name, this.props.auth.token);
        await this.setState({
            name: '',
            submit: true
        });
    }

    static getInitialProps(ctx) {
        init(ctx);
    }

    async componentDidMount() {
        await this.props.fetchTeams(this.username);
    }

    async delete(id) {
        await this.props.deleteTeam(id, this.props.auth.token);
    }

    render () {
        
        if (this.props.teams.error && !this.state.submit) {
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
        else if (this.props.teams.teams) {
            let canAdd = false;
            if (this.props.auth.user) {
                canAdd = this.username === this.props.auth.user.username;
            }
            const title = this.username + " teams | Practice Coding OJ";
        
            return (
                <>
                    <ProfileLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} username={this.username}>
                        <br /><br />
                        {canAdd && 
                        (<div className="container">
                            <div className="row justify-content-center">
                                <div className="offset-md-3 col-md-7 offset-2">
                                    {this.props.teams.addError && this.state.submit &&
                                    (
                                        <UncontrolledAlert color="danger">
                                            {this.props.teams.addError}
                                        </UncontrolledAlert>
                                    )}
                                    <Form onSubmit={this.handleSubmit} noValidate>
                                        <div className="row form-group">
                                            <label htmlFor="team" className="col-3 col-form-label col-form-label-sm">Team Name</label>
                                            <div className="col-8 col-md-4">
                                                <Input type="text"
                                                       className="form-control form-control-sm"
                                                       name="name" 
                                                       id="team" 
                                                       placeholder="Team Name"
                                                       required
                                                       value={this.state.name}
                                                       onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-3"></div>
                                            <div className="col-8 col-md-4">
                                                <button type="submit" className="btn btn-primary col-8 col-md-5">Create</button>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>)}
                        <br />
                        <div className="container">
                            <Teams teams={this.props.teams.teams} remove={this.delete} user={this.props.auth.user} />
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

const mapStateToProps = state => ({
        auth: state.authentication,
        teams: state.teams
    }
);

export default withRouter(connect(
    mapStateToProps,
    {deauthenticate, fetchTeams, deleteTeam, postTeam}
)(UserTeams));