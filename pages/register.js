import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Head from '../components/main/head';
import { FacebookLoginButton, GithubLoginButton, LinkedInLoginButton } from "react-social-login-buttons";
import { connect } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { Form, Input, FormFeedback, Alert } from 'reactstrap';
import countryList from 'react-select-country-list';
import Option from '../components/main/option';


/**
 * Register Page
 */
class Register extends Component {

    constructor(props) {
        super(props);

        this.options = countryList().getLabels();

        this.state = {
            username: '',
            fullname: '',
            email: '',
            password: '',
            confirmation: '',
            country: null,
            touched: {
                username: false,
                fullname: false,
                email: false,
                password: false,
                confirmation: false
            },
            options: this.options,
            visible: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    validate() {
        const errors = {
            email: '',
            username: '',
            password: '',
            confirmation: '',
            fullname: ''
        };

        if (this.state.touched.email) {
            if (!this.validateEmail(this.state.email)) {
                errors.email = "Invalid email";
            }
        }
        if (this.state.touched.username) {
            if (this.state.username.length < 3) {
                errors.username = "Username length must be greater than 2";
            }
            else if (this.state.username.length > 10) {
                errors.username = "Username length must be less than 11";
            }
        }
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
        if (this.state.touched.fullname) {
            if (this.state.fullname.length < 2) {
                errors.fullname = "Provide your Full Name";
            }
        }

        return errors;
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
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

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
            fullname: this.state.fullname,
            country: this.state.country
        }
        this.props.register(user);
        
    }

    render() {
        const errors = this.validate();
        let InputError = (errors.email !== '' ||
                          errors.password !== '' ||
                          errors.confirmation !== '' ||
                          errors.fullname !== '' ||
                          errors.username !== '');
        const empty = ( this.state.email === '' ||
                        this.state.password === '' ||
                        this.state.confirmation === '' ||
                        this.state.fullname === '' ||
                        this.state.username === '');
        return (
            <>
                <Head title="Register | Practice Coding OJ" description="Register to Practcice Coding OJ"/>
                <div className="modal-dialog text-center">
                    <div className="col-sm-9 main-section">
                        <div className="modal-content">
                            <div className="col-12 user-img">
                                <img src="../static/images/face.png" />
                            </div>
                            <div className="col-12 form-input">
                                {this.props.user.errMsg &&
                                (
                                    <div>
                                        <Alert color="danger">
                                            {this.props.user.errMsg}
                                        </Alert>
                                    </div>
                                )}
                                <Form onSubmit={this.handleSubmit} noValidate>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><FontAwesomeIcon icon="user-lock" /></div>
                                            </div>
                                            <Input type="text" 
                                                   className="form-control" 
                                                   placeholder="Enter Your Username" 
                                                   name="username"
                                                   valid={errors.username === ''}
                                                   invalid={errors.username !== ''}
                                                   onBlur={this.handleBlur('username')}
                                                   required
                                                   value={this.state.username}
                                                   onChange={this.handleInputChange} />
                                            <FormFeedback> {errors.username} </FormFeedback>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><FontAwesomeIcon icon="user" /></div>
                                            </div>
                                            <Input type="text"
                                                   className="form-control"
                                                   placeholder="Enter Your Full Name"
                                                   name="fullname"
                                                   valid={errors.fullname === ''} 
                                                   invalid={errors.fullname !== ''}
                                                   onBlur={this.handleBlur('fullname')}
                                                   required
                                                   value={this.state.fullname}
                                                   onChange={this.handleInputChange} />
                                            <FormFeedback> {errors.fullname} </FormFeedback>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><FontAwesomeIcon icon="envelope" /></div>
                                            </div>
                                            <Input type="text"
                                                   className="form-control"
                                                   placeholder="Enter Your Email"
                                                   name="email"
                                                   valid={errors.email === ''} 
                                                   invalid={errors.email !== ''}
                                                   onBlur={this.handleBlur('email')}
                                                   required
                                                   value={this.state.email}
                                                   onChange={this.handleInputChange} />
                                            <FormFeedback> {errors.email} </FormFeedback>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><FontAwesomeIcon icon="key" /></div>
                                            </div>
                                            <Input type="password"
                                                   className="form-control"
                                                   placeholder="Enter Your Password"
                                                   name="password"
                                                   valid={errors.password === ''} 
                                                   invalid={errors.password !== ''}
                                                   onBlur={this.handleBlur('password')}
                                                   required
                                                   value={this.state.password}
                                                   onChange={this.handleInputChange} />
                                            <FormFeedback> {errors.password} </FormFeedback>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><FontAwesomeIcon icon="key" /></div>
                                            </div>
                                            <Input type="password"
                                                   className="form-control"
                                                   placeholder="Confirm Your Password"
                                                   name="confirmation"
                                                   valid={errors.confirmation === ''} 
                                                   invalid={errors.confirmation !== ''}
                                                   onBlur={this.handleBlur('confirmation')}
                                                   required
                                                   value={this.state.confirmation}
                                                   onChange={this.handleInputChange} />
                                            <FormFeedback> {errors.confirmation} </FormFeedback>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><FontAwesomeIcon icon="globe" /></div>
                                            </div>
                                            <select type="select" className="form-control" name="country" onChange={this.handleInputChange}>
                                                <Option options={this.state.options} />
                                            </select>
                                        </div>
                                    </div>
                                    {(InputError || empty) && (<button type="submit" className="btn btn-danger" disabled>Register</button>)}
                                    {(!InputError && !empty) && (<button type="submit" className="btn btn-primary">Register</button>)}
                                </Form>
                            </div>
                            <div className="col-12 forgot">
                                <span style={{color: "white"}}>Already have an account?</span> <Link prefetch href="/login" ><a href="/login">Login</a></Link>
                            </div>
                            <div className="col-12">
                                <p style={{color: "white"}}>Or</p>
                                <FacebookLoginButton >Register with Facebook</FacebookLoginButton>
                                <GithubLoginButton >Register with GitHub</GithubLoginButton>
                                <LinkedInLoginButton >Register with LinkedIn</LinkedInLoginButton>
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
                        letter-spacing: 1px;
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

export default connect(
    state => ({user: state.authentication}),
    { register }
)(Register);