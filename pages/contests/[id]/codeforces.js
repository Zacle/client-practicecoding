import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InContestLayout from '../../../components/contest/inContestLayout';
import {connect} from 'react-redux';
import {deauthenticate} from '../../../redux/actions/authActions';
import init from '../../../utils/initialize';
import {fetchContest, addCodeforcesContest} from '../../../redux/actions/contestActions';
import {API} from '../../../config';
import axios from 'axios';
import {CodeforcesOption} from '../../../components/contest/options';
import Layout from '../../../components/main/layout';
import Loading from '../../../components/loading';



class CodeforcesContest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contestID: ''
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
        let contestList = [];
        try {
            const list = await axios.get("https://codeforces.com/api/contest.list");
            contestList = list.data.result;
        }
        catch (err) {
            contestList = [];
        }
        return { contestList };
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.state.contestID !== "") {
            await addCodeforcesContest(this.id, this.state.contestID, this.props.auth.token);
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
            const title="Add problems from codeforces contest | Practice Coding OJ";
        
            return (
                <>
                    <InContestLayout contest={this.props.contests.getContest} auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} id={this.id}>
                        <br /><br />
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="offset-md-3 col-md-7 offset-1">
                                    <form onSubmit={this.handleSubmit} noValidate>
                                        <div className="form-group row">
                                            <label htmlFor="oj" className="col-4 col-form-label col-form-label-sm">Contest name</label>
                                            <div className="col-8 col-md-5">
                                                <select id="oj" type="select" className="form-control form-control-sm" name="contestID" onChange={this.handleInputChange} value={this.state.contestID}>
                                                    <option value="" disabled>Select contest name</option>
                                                    <CodeforcesOption options={this.props.contestList} />
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-4"></div>
                                            <div className="col-8">
                                                <button type="submit" className="btn btn-primary">Add</button>
                                            </div>
                                        </div>
                                    </form>
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
)(CodeforcesContest));