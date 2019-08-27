import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InContestLayout from '../../../components/contest/inContestLayout';
import {connect} from 'react-redux';
import {deauthenticate} from '../../../redux/actions/authActions';
import {addSpecificProblem} from '../../../redux/actions/contestActions';
import init from '../../../utils/initialize';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import {fetchContest} from '../../../redux/actions/contestActions';
import {API} from '../../../config';
import axios from 'axios';
import Layout from '../../../components/main/layout';
import Loading from '../../../components/loading';



class AddSpecificProblem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            plateform: '',
            selected: [],
            isLoading: false,
            options: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.id = props.router.query.id;
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

    static getInitialProps(ctx) {
        init(ctx, true);
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.state.selected.length > 0) {
            await addSpecificProblem(this.id,this.state.selected[0], this.props.auth.token);
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
            const title="Add Specific Problem | Practice Coding OJ";
        
            return (
                <>
                    <InContestLayout contest={this.props.contests.getContest} auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} id={this.id}>
                        <br /><br />
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="offset-md-3 col-md-7 offset-1">
                                    <form onSubmit={this.handleSubmit} noValidate>
                                        <div className="form-group row">
                                            <label htmlFor="oj" className="col-4 col-form-label col-form-label-sm">Online Judge</label>
                                            <div className="col-8 col-md-5">
                                                <select id="oj" type="select" className="form-control form-control-sm" name="plateform" onChange={this.handleInputChange} value={this.state.plateform}>
                                                    <option value="all">All Online Judges</option>
                                                    <option value="Codeforces">Codeforces</option>
                                                    <option value="Uva">Uva</option>
                                                    <option value="Live Archive">Live Archive</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="pname" className="col-4 col-form-label col-form-label-sm">Problem Name</label>
                                            <div className="col-8 col-md-5">
                                                <AsyncTypeahead
                                                    isLoading={this.state.isLoading}
                                                    allowNew={false}
                                                    multiple={false}
                                                    id="pname"
                                                    labelKey={option => `${option.name} (${option.plateform})`}
                                                    minLength={2}
                                                    onChange={selected => this.setState({ selected })}
                                                    placeholder="Search for a problem"
                                                    onSearch={query => {
                                                        this.setState({isLoading: true});
                                                        axios.get(`${API}/problems/${query}`,
                                                        {
                                                            params: {
                                                                plateform: this.state.plateform
                                                            },
                                                            headers: {
                                                                Accept: "application/json",
                                                                'Content-Type': 'application/json',
                                                                'Authorization': 'Bearer ' + this.props.auth.token
                                                            }
                                                        })
                                                        .then((response) => { /* eslint-disable-line camelcase */
                                                            const options = response.data.map((problem) => ({
                                                                _id: problem._id,
                                                                name: problem.name,
                                                                plateform: problem.plateform,
                                                                problemID: problem.problemID,
                                                                contestID: problem.contestID
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
)(AddSpecificProblem));