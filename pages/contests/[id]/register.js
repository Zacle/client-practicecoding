import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InContestLayout from '../../../components/contest/inContestLayout';
import {connect} from 'react-redux';
import {deauthenticate} from '../../../redux/actions/authActions';
import init from '../../../utils/initialize';
import {fetchContest, registerUser, registerTeam} from '../../../redux/actions/contestActions';
import {API} from '../../../config';
import Layout from '../../../components/main/layout';
import Loading from '../../../components/loading';
import axios from 'axios';
import {RegisterOption} from '../../../components/contest/options';



class ContestRegistration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teamID: '',
            myTeams: []
        };

        this.id = props.router.query.id;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.register = this.register.bind(this);
    }

    async componentDidMount() {
        let myTeams = [];
        try {
            console.log("CALLING PROPS");
            const list = await axios.get(`${API}/teams/myown`,
                    {
                        params: {
                            username: this.props.auth.user.username
                        },
                        headers: {
                            Accept: "application/json",
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + this.props.auth.token
                        }
                    });
            myTeams = list.data;
            console.log("TEAMS: ", myTeams);
        }
        catch (err) {
            myTeams = [];
        }
        await this.setState({
            myTeams: myTeams
        });
        await this.props.fetchContest(this.id);
    }

    async handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        await this.setState({
          [name]: value
        });
    }

    static async getInitialProps(ctx) {
        init(ctx, true);
    }

    async handleSubmit(e) {
        e.preventDefault();
        await registerTeam(this.id, this.state.teamID, this.props.auth.token)
    }

    async register() {
        await registerUser(this.id, this.props.auth.user.username, this.props.auth.token);
    }

    render() {
        if (this.props.contests.getContestError) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="error row justify-content-center">
                            <p className="error">{this.props.contests.getContestError}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.contests.getContest) {
            const title = "Register | Practice Coding OJ";
            const description = "Register to this contest";
            const type = this.props.contests.getContest.type;
            const individual = type === 1;

            return (
                <>
                    <InContestLayout contest={this.props.contests.getContest} auth={this.props.auth} deauthenticate={this.props.deauthenticate} id={this.id} title={title} description={description} >
                        <br /><br />
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="offset-md-2 col-md-7 offset-md-2">
                                    <br />
                                    {individual && (<><p className="text-center">Register to this contest. Note you can only leave the contest if it's not yet started unless you're the owner</p>
                                    <br /><div className="row justify-content-center"><button className="btn btn-primary col-8 col-md-5" onClick={() => this.register()}>Register</button></div></>)}
                                    {!individual && (<>
                                        <p className="text-center">Register your team to this contest. Note you can only leave the contest if it's not yet started unless you're the owner</p>
                                        <form onSubmit={this.handleSubmit} noValidate>
                                            <div className="form-group row">
                                                <label htmlFor="oj" className="col-4 col-form-label col-form-label-sm">Team name</label>
                                                <div className="col-8 col-md-5">
                                                    <select id="oj" type="select" className="form-control form-control-sm" name="teamID" onChange={this.handleInputChange} value={this.state.teamID}>
                                                        <option value="" disabled>Select team name</option>
                                                        <RegisterOption options={this.state.myTeams} />
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-4"></div>
                                                <div className="col-8">
                                                    <button type="submit" className="btn btn-primary col-8 col-md-5">Register Team</button>
                                                </div>
                                            </div>
                                        </form>
                                    </>)}
                                </div>
                            </div>
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
    {deauthenticate, fetchContest}
)(ContestRegistration));