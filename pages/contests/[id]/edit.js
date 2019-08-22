import React, { Component } from 'react';
import InContestLayout from '../../../components/contest/inContestLayout';
import Option from '../../../components/option';
import {connect} from 'react-redux';
import {deauthenticate} from '../../../redux/actions/authActions';
import {update, fetchContest} from '../../../redux/actions/contestActions';
import init from '../../../utils/initialize';
import { Form, UncontrolledAlert} from 'reactstrap';
import { withRouter } from 'next/router';
import Layout from '../../../components/main/layout';
import Loading from '../../../components/loading';
import Link from 'next/link';



class EditContest extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;

        this.state = {
            startDateDay: '',
            startDateMonth: '',
            startDateYear: '',
            startTimeHour: '',
            startTimeMinute: '',
            endDateDay: '',
            endDateMonth: '',
            endDateYear: '',
            endTimeHour: '',
            endTimeMinute: '',
            access: '',
            submit: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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
        const contest = {
            startDateDay: parseInt(this.state.startDateDay) || 1,
            startDateMonth: parseInt(this.state.startDateMonth) || 1,
            startDateYear: parseInt(this.state.startDateYear) || 2019,
            startTimeHour: parseInt(this.state.startTimeHour) || 0,
            startTimeMinute: parseInt(this.state.startTimeMinute) || 0,
            endDateDay: parseInt(this.state.endDateDay) || 1,
            endDateMonth: parseInt(this.state.endDateMonth) || 1,
            endDateYear: parseInt(this.state.endDateYear) || 2019,
            endTimeHour: parseInt(this.state.endTimeHour) || 0,
            endTimeMinute: parseInt(this.state.endTimeMinute) || 0,
            access: this.state.access || "PUBLIC",
        };
        await this.props.update(this.id, contest, this.props.auth.token);

        await this.setState({
            submit: true
        });
    }

    static getInitialProps(ctx) {
        init(ctx, true);
    }

    async componentDidMount() {
        await this.props.fetchContest(this.id);

        const startDate = new Date(this.props.contests.getContest.startDate);
        const endDate = new Date(this.props.contests.getContest.endDate);
        await this.setState({
            startDateDay: startDate.getDate(),
            startDateMonth: startDate.getMonth()+1,
            startDateYear: startDate.getFullYear(),
            startTimeHour: startDate.getHours(),
            startTimeMinute: startDate.getMinutes(),
            endDateDay: endDate.getDate(),
            endDateMonth: endDate.getMonth()+1,
            endDateYear: endDate.getFullYear(),
            endTimeHour: endDate.getHours(),
            endTimeMinute: endDate.getMinutes(),
            access: (this.props.contests.getContest.access === 0) ? "PRIVATE" : "PUBLIC"
        });
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
            return (
                <>
                    <InContestLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title="Edit Contest | Practice Coding OJ" description="Create a new contest on Practice Coding OJ" >
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    {this.props.contests.updateError && this.state.submit &&
                                    (
                                        <UncontrolledAlert className="text-center" color="danger">
                                            {this.props.contests.updateError}
                                        </UncontrolledAlert>
                                    )}
                                    {this.props.contests.getContest && this.state.submit &&
                                    (
                                        <UncontrolledAlert className="text-center" color="success">
                                            Contest Updated
                                        </UncontrolledAlert>
                                    )}
                                    <Form onSubmit={this.handleSubmit} noValidate>
                                        <div className="form-group row">
                                            <label htmlFor="cStartD" className="col-4 col-form-label col-form-label-sm">Start Date</label>
                                            <div className="row col-8">
                                                <div className="col-2 col-md-2">
                                                    <select onChange={this.handleInputChange} className="form-control form-control-sm" name="startDateDay" id="cStartD" value={this.state.startDateDay} >
                                                        <Option index={1} number={31} />
                                                    </select>
                                                </div>
                                                <div className="col-2 col-md-2">
                                                    <select onChange={this.handleInputChange} className="form-control form-control-sm" name="startDateMonth" value={this.state.startDateMonth} >
                                                        <Option index={1} number={12} />
                                                    </select>
                                                </div>
                                                <div className="col-4 col-md-2">
                                                    <select onChange={this.handleInputChange} className="form-control form-control-sm" name="startDateYear" value={this.state.startDateYear} >
                                                        <Option start={2019} end={2029} />
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="cStartT" className="col-4 col-form-label col-form-label-sm">Start Time</label>
                                            <div className="row col-8">
                                                <div className="col-4 col-md-2">
                                                    <select onChange={this.handleInputChange} className="form-control form-control-sm" name="startTimeHour" id="cStartT" value={this.state.startTimeHour} >
                                                        <Option index={0} number={23} />
                                                    </select>
                                                </div>
                                                <div className="col-4 col-md-2">
                                                    <select onChange={this.handleInputChange} className="form-control form-control-sm" name="startTimeMinute" value={this.state.startTimeMinute} >
                                                        <Option index={0} number={59} />
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="cEndD" className="col-4 col-form-label col-form-label-sm">End Date</label>
                                            <div className="row col-8">
                                                <div className="col-2 col-md-2">
                                                    <select onChange={this.handleInputChange} className="form-control form-control-sm" name="endDateDay" id="cEndD" value={this.state.endDateDay} >
                                                        <Option index={1} number={31} />
                                                    </select>
                                                </div>
                                                <div className="col-2 col-md-2">
                                                    <select onChange={this.handleInputChange} className="form-control form-control-sm" name="endDateMonth" value={this.state.endDateMonth} >
                                                        <Option index={1} number={12} />
                                                    </select>
                                                </div>
                                                <div className="col-4 col-md-2">
                                                    <select onChange={this.handleInputChange} className="form-control form-control-sm" name="endDateYear" value={this.state.endDateYear} >
                                                        <Option start={2019} end={2029} />
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="cEndT" className="col-4 col-form-label col-form-label-sm">End Time</label>
                                            <div className="row col-8">
                                                <div className="col-4 col-md-2">
                                                    <select onChange={this.handleInputChange} className="form-control form-control-sm" name="endTimeHour" id="cEndT" value={this.state.endTimeHour} >
                                                        <Option index={0} number={23} />
                                                    </select>
                                                </div>
                                                <div className="col-4 col-md-2">
                                                    <select onChange={this.handleInputChange} className="form-control form-control-sm" name="endTimeMinute" value={this.state.endTimeMinute} >
                                                        <Option index={0} number={59} />
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="cAccess" className="col-4 col-form-label col-form-label-sm">Access</label>
                                            <div className="col-8 col-md-2">
                                                <select onChange={this.handleInputChange} className="form-control form-control-sm" name="access" id="cAccess" value={this.state.access}>
                                                    <option value="PUBLIC">PUBLIC</option>
                                                    <option value="PRIVATE">PRIVATE</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-4"></div>
                                            <div className="col-8 col-md-4">
                                                <button type="submit" className="btn btn-primary">Edit</button>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 text-center">
                                    <h2>Add Problems</h2>
                                    <hr />
                                </div>
                                <div className="text-center col-12 col-md-4">
                                    <Link prefetch href="/contests/[id]/specific" as={"/contests/" + this.id + "/specific"}><button className="btn btn-primary">Add specific problems</button></Link>
                                </div>
                                <br /><br />
                                <div className="text-center col-12 col-md-4">
                                    <Link prefetch href="/contests/[id]/existing" as={"/contests/" + this.id + "/existing"}><button className="btn btn-primary">Add problems from Existing contest</button></Link>
                                </div>
                                <br /><br />
                                <div className="text-center col-12 col-md-4">
                                    <Link prefetch href="/contests/[id]/codeforces" as={"/contests/" + this.id + "/codeforces"}><button className="btn btn-primary">Add problems from Codeforces contest</button></Link>
                                </div>
                            </div>
                            <br />
                            <div className="row justify-content-center">
                                <div className="text-center col-12 col-md-4">
                                    <Link prefetch href="/contests/[id]/uva" as={"/contests/" + this.id + "/uva"}><button className="btn btn-primary">Add problems from Uva/Uhunt contest</button></Link>
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
    {deauthenticate, update, fetchContest}
)(EditContest));