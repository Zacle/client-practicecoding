import React, { Component } from 'react';
import countryList from 'react-select-country-list';
import { Form, Input, FormFeedback, UncontrolledAlert } from 'reactstrap';
import {connect} from 'react-redux';


class UpdatePassword extends Component {

    constructor(props) {
        super();

        this.options = countryList().getLabels();

        this.state = {
            password: '',
            confirmation: '',
            touched: {
                password: false,
                confirmation: false
            },
            options: this.options
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    validate() {
        const errors = {
            password: '',
            confirmation: ''
        };

        if (this.state.touched.password) {
            if (this.state.password.length < 7) {
                errors.password = "Password length must be at least 7";
            }
        }
        if (this.state.touched.confirmation) {
            if (this.state.confirmation !== this.state.password) {
                errors.confirmation = "Passwords don't match";
            }
        }

        return errors;
    }

    handleBlur = (field) => async (evt) => {
        await this.setState({
          touched: { ...this.state.touched, [field]: true },
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

    async handleSubmit(e) {
        e.preventDefault();
        const new_password = {
            password: this.state.password
        };
        await this.props.submitPassword(new_password);
        await this.setState({
            password: '',
            confirmation: ''
        });
    }

    render () {
        const errors = this.validate();
        const InputError = (errors.password !== '' || errors.confirmation !== '');
        const empty = (this.state.password === '' || this.state.confirmation === '');
        return (
            <>
                <br/>
                <h2>Update Password</h2>
                <hr />
                <div className="container">
                    {this.props.user.error &&
                    (
                        <div className="row justify-content-center">
                            <UncontrolledAlert color="danger">
                                {this.props.user.error}
                            </UncontrolledAlert>
                        </div>
                    )}
                    {this.props.user.password &&
                    (
                        <div className="row justify-content-center">
                            <UncontrolledAlert color="success">
                                {this.props.user.password}
                            </UncontrolledAlert>
                        </div>
                    )}
                    <Form onSubmit={this.handleSubmit} noValidate>
                        <div className="form-group row">
                            <label htmlFor="newPassword" className="col-4 col-form-label col-form-label-sm">New Password</label>
                            <div className="col-8 col-md-4">
                                <Input type="password"
                                       className="form-control form-control-sm" 
                                       name="password" 
                                       id="newPassword" 
                                       placeholder="New Password"
                                       valid={errors.password === ''}
                                       invalid={errors.password !== ''}
                                       onBlur={this.handleBlur('password')}
                                       required
                                       value={this.state.password}
                                       onChange={this.handleInputChange} />
                                <FormFeedback> {errors.password} </FormFeedback>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="confirmation" className="col-4 col-form-label col-form-label-sm">Confirm Password</label>
                            <div className="col-8 col-md-4">
                                <Input type="password"
                                       className="form-control form-control-sm" 
                                       name="confirmation" 
                                       id="confirmation" 
                                       placeholder="Confirm Password"
                                       valid={errors.confirmation === ''}
                                       invalid={errors.confirmation !== ''}
                                       onBlur={this.handleBlur('confirmation')}
                                       required
                                       value={this.state.confirmation}
                                       onChange={this.handleInputChange} />
                                <FormFeedback> {errors.confirmation} </FormFeedback>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4"></div>
                            <div className="col-8 col-md-4">
                                {(InputError || empty) && (<button type="submit" className="btn btn-danger" disabled>Update</button>)}
                                {(!InputError && !empty) && (<button type="submit" className="btn btn-primary">Update</button>)}
                            </div>
                        </div>
                    </Form>
                </div>
                <style jsx>{`
                    .container {
                        margin-top: 35px;
                    }
                `}</style>
            </>
        );
    }
}

const mapStateToProps = state => ({user: state.user});

export default connect(
    mapStateToProps,
    null
)(UpdatePassword);