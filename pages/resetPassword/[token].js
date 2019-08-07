import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from '../../components/main/head';
import { connect } from 'react-redux';
import {withRouter} from 'next/router';
import { resetPasswordToken } from '../../redux/actions/authActions';
import { Form, Input, FormFeedback, Alert } from 'reactstrap';

/**
 * Login Page
 */
class ResetPassword extends Component {

    constructor(props) {
        super(props);

        this.token = this.props.router.query.token;

        this.state = {
            password: '',
            confirmation: '',
            submit: false,
            touched: {
                password: false,
                confirmation: false
            }
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

    async handleSubmit(e) {
        e.preventDefault();
        const new_password = {
            password: this.state.password
        };
        await this.props.resetPasswordToken(new_password, this.token);
        await this.setState({
            submit: true
        });
    }

    async componentDidMount() {
        await this.setState({
            submit: false
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

    render() {
        const errors = this.validate();
        const InputError = (errors.password !== '' || errors.confirmation !== '');
        const empty = (this.state.password === '' || this.state.confirmation === '');
        return (
            <>
                <Head title="Reset Password | Practice Coding OJ" description="Sign in to Practcice Coding OJ"/>
                <div className="modal-dialog text-center">
                    <div className="col-sm-9 main-section">
                        <div className="modal-content">
                            <div className="col-12 user-img">
                                <img src="../static/images/face.png" />
                            </div>
                            <div className="col-12 form-input">
                                {this.state.submit && this.props.user.reset &&
                                (
                                    <Alert color="danger">
                                        {this.props.user.reset}
                                    </Alert>
                                )}
                                {this.state.submit && !this.props.user.reset &&
                                (
                                    <Alert color="success">
                                        <p>An email has been sent to reset your password.</p>
                                        <p>If you can't see it. Check your spam folder</p>
                                    </Alert>
                                )}
                                <Form onSubmit={this.handleSubmit} noValidate>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><FontAwesomeIcon icon="key" /></div>
                                            </div>
                                            <Input type="password"
                                                   className="form-control"
                                                   placeholder="New Password"
                                                   name="password"
                                                   required
                                                   valid={errors.password === ''}
                                                   invalid={errors.password !== ''}
                                                   onBlur={this.handleBlur('password')}
                                                   value={this.state.password}
                                                   onChange={this.handleInputChange} />
                                            <FormFeedback> {errors.password} </FormFeedback>
                                        </div>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><FontAwesomeIcon icon="key" /></div>
                                            </div>
                                            <Input type="password"
                                                   className="form-control"
                                                   placeholder="Confirm New Password"
                                                   name="confirmation"
                                                   required
                                                   valid={errors.confirmation === ''}
                                                   invalid={errors.confirmation !== ''}
                                                   onBlur={this.handleBlur('confirmation')}
                                                   value={this.state.confirmation}
                                                   onChange={this.handleInputChange} />
                                            <FormFeedback> {errors.confirmation} </FormFeedback>
                                        </div>
                                    </div>
                                    {(InputError || empty) && (<button type="submit" className="btn btn-danger" disabled>Reset</button>)}
                                    {(!InputError && !empty) && (<button type="submit" className="btn btn-primary">Reset</button>)}
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>{`

                `}</style>
                <style jsx global>{`
                    @import url('https://fonts.googleapis.com/css?family=Roboto');
                    body {
                        font-family: 'Roboto', sans-serif;
                    }
                    .main-section {
                        margin: 0 auto;
                        margin-top: 150px;
                        padding: 0;
                    }
                    .modal-content {
                        background-color: #1e2433;
                        opacity: .8;
                        padding: 0 18px;
                        border-radius: 10px;
                    }
                    .user-img img {
                        height: 120px;
                        width: 120px;
                    }
                    .user-img {
                        margin-top: -60px;
                        margin-bottom: 45px;
                    }
                    .form-group {
                        margin-bottom: 25px;
                    }
                    .form-group input {
                        height: 42px;
                        border-radius: 5px;
                        border: 0;
                        font-size: 18px;
                        letter-spacing: 2px;
                    }
                    
                    .form-input button {
                        width: 40%;
                        margin: 5px 0 25px;
                    }
                    .btn-primary {
                        background-color: #1c6288;
                        font-size: 19px;
                        border-radius: 5px;
                        padding: 7px 14px;
                        border: 1px solid #daf1ff;
                    }
                    .btn-primary:hover {
                        background-color: #13445e;
                        border: 1px solid #daf1ff;
                    }
                    .forgot a {
                        color: lightblue;
                        text-decoration: none;
                    }
                `}</style>
            </>
        );
    }
}

export default withRouter(connect(
    state => ({user: state.authentication}),
    { resetPasswordToken }
)(ResetPassword));