import React, { Component } from 'react';
import TrainLayout from '../../components/train/trainLayout';
import {connect} from 'react-redux';
import init from '../../utils/initialize';
import {deauthenticate} from '../../redux/actions/authActions';
import {filterProblems} from '../../redux/actions/trainActions';
import Problems from '../../components/train/problems';
import Pagination from '../../components/train/pagination';
import axios from 'axios';
import {API} from '../../config';

class TrainFiltered extends Component {

    constructor(props) {
        super(props);

        this.state = {
            plateform: '',
            difficulty: "easy",
            currentPage: 1,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onPageChanged = this.onPageChanged.bind(this);
        this.save = this.save.bind(this);
    }

    save(problemID) {
        axios.post(`${API}/todos/`,
        {
            problemID: problemID
        },
        {
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.auth.token
            }
        })
        .then(() => alert("Problem saved to todo list"))
        .catch((err) => {
            if (err.response) {
                alert(err.response.data);
            }
            else {
                alert("Sorry! A server error occurred. Try to save this problem later!");
            }
        });
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

    async componentDidMount() {
        const query = {
            difficulty: this.state.difficulty,
            plateform: this.state.plateform,
            page: 1
        };
        await this.props.filterProblems(query, this.props.auth.token);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const query = {
            difficulty: this.state.difficulty,
            plateform: this.state.plateform,
            page: 1
        };
        await this.props.filterProblems(query, this.props.auth.token);
        await this.setState({
            currentPage: 1
        });
    }

    async onPageChanged(currentPage) {
        const query = {
            difficulty: this.state.difficulty,
            plateform: this.state.plateform,
            page: currentPage
        };
        await this.props.filterProblems(query, this.props.auth.token);
        await this.setState({
            currentPage: currentPage
        });
    }

    render() {
        const title = "Filter problems to train | Practice Coding OJ";
        const description = "Problems filtered by Online Judge and difficulty";

        return (
            <>
                <TrainLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} description={description} >
                    <div className="container">
                        <div className="row justify-content-center">
                            <br />
                            <form onSubmit={this.handleSubmit} noValidate>
                                <div className="form-group row">
                                    <label htmlFor="oj" className="col-4 col-form-label col-form-label-sm">Online Judge</label>
                                    <div className="col-8">
                                        <select id="oj" type="select" className="form-control form-control-sm" name="plateform" onChange={this.handleInputChange} value={this.state.plateform}>
                                            <option value="all">All Online Judges</option>
                                            <option value="Codeforces">Codeforces</option>
                                            <option value="Uva">Uva</option>
                                            <option value="Live Archive">Live Archive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="diff" className="col-4 col-form-label col-form-label-sm">Difficulty</label>
                                    <div className="col-8">
                                        <select id="diff" type="select" className="form-control form-control-sm" name="difficulty" onChange={this.handleInputChange} value={this.state.difficulty}>
                                            <option value="" disabled>Select difficulty</option>
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="hard">Hard</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-4"></div>
                                    <div className="col-8">
                                        <button type="submit" className="btn btn-primary">Filter</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br /> <br />
                    <div className="container">
                        <div className="row justify-content-center">
                            {this.props.filter.problems && 
                                (<>
                                    <Problems save={this.save} problems={this.props.filter.problems} />
                                    <br />
                                    <div className="d-flex flex-row py-4 align-items-center">
                                        <Pagination totalRecords={this.props.filter.total} pageLimit={this.props.filter.per_page} pageNeighbours={2} onPageChanged={this.onPageChanged} />
                                    </div>
                                </>)
                            }
                        </div>
                    </div>
                </TrainLayout>
            </>
        );
    }
}

const mapStateToProps = state => ({
        auth: state.authentication,
        filter: state.filterTrain
    }
);

export default connect(
    mapStateToProps,
    {deauthenticate, filterProblems}
)(TrainFiltered);