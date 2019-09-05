import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InGroupLayout from '../../../components/group/inGroupLayout';
import Option from '../../../components/option';
import {connect} from 'react-redux';
import {deauthenticate} from '../../../redux/actions/authActions';
import {createGroupContest} from '../../../redux/actions/contestActions';
import init from '../../../utils/initialize';
import { Form, Input, UncontrolledAlert, FormFeedback } from 'reactstrap';
import {fetchGroup} from '../../../redux/actions/groupActions';
import Loading from '../../../components/loading';
import Layout from '../../../components/main/layout';
import Router from 'next/router';


class CreateContest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
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
            type: '',
            submit: false,
            touched: {
                name: false
            }
        };
        this.id = props.router.query.id;
        this.handleBlur = this.handleBlur.bind(this);
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

    validate(name) {
        const errors = {
            name: ''
        };

        if (this.state.touched.name) {
            if (this.state.name.length < 3) {
                errors.name = "Contest name length must be greater than 2";
            }
        }
        return errors;
    }

    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const contest = {
            name: this.state.name,
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
            type: this.state.type || "INDIVIDUAL"
        };
        await this.props.createGroupContest(contest, this.id, this.props.auth.token);
        await this.setState({
            submit: true
        });
    }

    static getInitialProps(ctx) {
        init(ctx, true);
    }

    async componentDidMount() {
        await this.props.fetchGroup(this.id, this.props.auth.user.username, this.props.auth.token);
        if (this.props.groups.inGroup && (this.props.groups.inGroup.admin.username !== this.props.auth.user.username)) {
            Router.replace(`/groups/${id}`);
        }
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
        else if (this.props.groups.inGroup) {
            const errors = this.validate(this.state.name);
            let error = errors.name !== '' || this.state.name === '';
            return (
                <>
                    <InGroupLayout group={this.props.groups.inGroup} auth={this.props.auth} deauthenticate={this.props.deauthenticate} title="Create Group Contest | Practice Coding OJ" description="Create a new contest on Practice Coding OJ" id={this.id} >
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    {this.props.contests.groupContestError && this.state.submit &&
                                    (
                                        <UncontrolledAlert className="text-center" color="danger">
                                            {this.props.contests.groupContestError}
                                        </UncontrolledAlert>
                                    )}
                                    {this.props.contests.groupContest && this.state.submit &&
                                    (
                                        <UncontrolledAlert className="text-center" color="success">
                                            Contest created
                                        </UncontrolledAlert>
                                    )}
                                    <Form onSubmit={this.handleSubmit} noValidate>
                                        <div className="form-group row">
                                            <label htmlFor="contestName" className="col-4 col-form-label col-form-label-sm">Name</label>
                                            <div className="col-8 col-md-4">
                                                <Input type="text" 
                                                    className="form-control form-control-sm" 
                                                    name="name" 
                                                    id="contestName" 
                                                    placeholder="Contest Name"
                                                    valid={errors.name === ''}
                                                    invalid={errors.name !== ''}
                                                    onBlur={this.handleBlur('name')}
                                                    required
                                                    value={this.state.name}
                                                    onChange={this.handleInputChange} />
                                                <FormFeedback> {errors.name} </FormFeedback>
                                            </div>
                                        </div>
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
                                            <div className="col-4"></div>
                                            <div className="col-8 col-md-4">
                                                {error && (<button type="submit" className="btn btn-danger" disabled>Create</button>)}
                                                {!error && (<button type="submit" className="btn btn-primary">Create</button>)}
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <style jsx>{`
                            .container {
                                margin-top: 35px;
                            }
                        `}</style>
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
        contests: state.contests,
        groups: state.groups
    }
);

export default withRouter(connect(
    mapStateToProps,
    {deauthenticate, createGroupContest, fetchGroup}
)(CreateContest));