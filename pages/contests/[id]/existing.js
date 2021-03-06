import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InContestLayout from '../../../components/contest/inContestLayout';
import {connect} from 'react-redux';
import {deauthenticate} from '../../../redux/actions/authActions';
import init from '../../../utils/initialize';
import {fetchContest, addExistingContest} from '../../../redux/actions/contestActions';
import Layout from '../../../components/main/layout';
import Loading from '../../../components/loading';


class AddExistingContest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: ''
        };

        this.id = props.router.query.id;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
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
        if (this.state.id !== '') {
            await addExistingContest(this.id, this.state.id, this.props.auth.token);
        }
    }

    render () {
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
            const title="Add problems from an existing contest | Practice Coding OJ";
        
            return (
                <>
                    <InContestLayout contest={this.props.contests.getContest} auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} id={this.id}>
                        <br /><br />
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="offset-md-3 col-md-7 offset-2">
                                    <form onSubmit={this.handleSubmit} noValidate>
                                        <div className="row form-group">
                                            <label htmlFor="team" className="col-3 col-form-label col-form-label-sm">Contest ID</label>
                                            <div className="col-8 col-md-5">
                                                <input type="text" className="form-control form-control-sm" name="id" id="team" placeholder="Contest ID" onChange={this.handleInputChange} value={this.state.id} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-3"></div>
                                            <div className="col-8 col-md-4">
                                                <button type="submit" className="btn btn-primary col-8 col-md-5">Add</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <br /><br />
                        <div className="container">
                            <div className="row justify-content-center">
                                <p>How to get Contest ID? </p>
                            </div>
                            <div className="row justify-content-center">
                                <p>Head over to the contest where you want to copy problems from. </p>
                            </div>
                            <div className="row justify-content-center">
                                <p>From the browser copy the id, It comes after contests</p><br />
                            </div>
                            <div className="row justify-content-center">
                                <p>E.g contests/123456abcd, then 123456abcd is the contest ID</p>
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
)(AddExistingContest));