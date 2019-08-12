import React, { Component } from 'react';
import TrainLayout from '../components/train/trainLayout';
import {connect} from 'react-redux';
import init from '../utils/initialize';
import {deauthenticate} from '../redux/actions/authActions';
import {AsyncTypeahead, Highlighter} from 'react-bootstrap-typeahead';
import {API} from '../config';
import axios from 'axios';
import Problem from '../components/train/problemSelected';


class Train extends Component {

    constructor(props) {
        super(props);

        this.state = {
            plateform: '',
            selected: [],
            isLoading: false,
            options: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
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

    render() {
        const title = "Search a problem to train | Practice Coding OJ";
        const description = "Train on Practice Coding OJ";

        return (
            <>
                <TrainLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} description={description} >
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="offset-md-3 col-md-7 offset-2">
                                <br />
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
                                                        problemID: problem.problemID,
                                                        name: problem.name,
                                                        plateform: problem.plateform,
                                                        link: problem.link,
                                                        difficulty: problem.difficulty
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
                                
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div className="container">
                        <div className="row justify-content-center">
                            {this.state.selected &&
                            (<Problem problem={this.state.selected[0]} />)
                            }
                        </div>
                    </div>
                </TrainLayout>
            </>
        );
    }
}

const mapStateToProps = state => ({
        auth: state.authentication
    }
);

export default connect(
    mapStateToProps,
    {deauthenticate}
)(Train);