import React, { Component } from 'react';
import ContestLayout from '../../components/contest/contestLayout';
import Option from '../../components/option';
import {connect} from 'react-redux';
import {deauthenticate} from '../../redux/actions/authActions';
import {createContest} from '../../redux/actions/contestActions';
import init from '../../utils/initialize';
import { Form, Input, UncontrolledAlert, FormFeedback } from 'reactstrap';



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
            access: '',
            type: '',
            submit: true,
            touched: {
                name: false
            }
        };
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
            access: this.state.access || "PUBLIC",
            type: this.state.type || "INDIVIDUAL"
        };
        await this.props.createContest(contest, this.props.auth.token);
        await this.setState({
            submit: true
        });
    }

    static getInitialProps(ctx) {
        init(ctx, true);
    }

    render () {
        const errors = this.validate(this.state.name);
        let error = errors.name !== '' || this.state.name === '';
        return (
            <>
                <ContestLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title="Create Contest | Practice Coding OJ" description="Create a new contest on Practice Coding OJ" >
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {this.props.contests.addContestError && this.state.submit &&
                                (
                                    <UncontrolledAlert className="text-center" color="danger">
                                        {this.props.contests.addContestError}
                                    </UncontrolledAlert>
                                )}
                                {this.props.contests.contest &&
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
                                        <label htmlFor="cAccess" className="col-4 col-form-label col-form-label-sm">Access</label>
                                        <div className="col-8 col-md-2">
                                            <select onChange={this.handleInputChange} className="form-control form-control-sm" name="access" id="cAccess" value={this.state.access}>
                                                <option value="PUBLIC">PUBLIC</option>
                                                <option value="PRIVATE">PRIVATE</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="cType" className="col-4 col-form-label col-form-label-sm">Type</label>
                                        <div className="col-8 col-md-2">
                                            <select onChange={this.handleInputChange} className="form-control form-control-sm" name="type" id="cType" value={this.state.type}>
                                                <option value="INDIVIDUAL">INDIVIDUAL</option>
                                                <option value="TEAM">TEAM</option>
                                            </select>
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
                </ContestLayout>
            </>
        );
    }
}

const mapStateToProps = state => ({
        auth: state.authentication,
        contests: state.contests
    }
);

export default connect(
    mapStateToProps,
    {deauthenticate, createContest}
)(CreateContest);