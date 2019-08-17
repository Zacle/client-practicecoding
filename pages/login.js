import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { login } from '../redux/actions/authActions';
import Link from 'next/link';
import Head from '../components/main/head';
import { Form, Input, FormFeedback, Alert } from 'reactstrap';
import { FacebookLoginButton, GithubLoginButton, LinkedInLoginButton } from "react-social-login-buttons";

/**
 * Login Page
 */
class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            touched: {
                email: false,
                password: false
            },
            visible: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    validate(email) {
        const errors = {
            email: ''
        };

        if (this.state.touched.email) {
            if (!this.validateEmail(email)) {
                errors.email = "Invalid email";
            }
        }
        return errors;
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
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
            password: this.state.password
        }
        this.props.login(user);
    }

    render() {
        const errors = this.validate(this.state.email);
        let error = errors.email !== '' || (this.state.email === '' && this.state.password === '');
        return (
            <>
                <Head title="Sign in | Practice Coding OJ" description="Sign in to Practcice Coding OJ"/>
                <div className="modal-dialog text-center">
                    <div className="col-sm-9 main-section">
                        <div className="modal-content">
                            <div className="col-12 user-img">
                                <img src="../static/images/face.png" />
                            </div>
                            <div className="col-12 form-input">
                                    {this.props.user.errMsg &&
                                    (
                                        <Alert color="danger">
                                            {this.props.user.errMsg}
                                        </Alert>
                                    )}
                                <Form onSubmit={this.handleSubmit} noValidate>
                                    
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><FontAwesomeIcon icon="envelope" /></div>
                                            </div>
                                            <Input type="email" 
                                                   className="form-control" 
                                                   placeholder="Enter Email" 
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
                                                   placeholder="Enter Password" 
                                                   name="password"
                                                   required
                                                   value={this.state.password}
                                                   onChange={this.handleInputChange}/>
                                        </div>
                                    </div>
                                    {error && (<button type="submit" className="btn btn-danger" disabled>Login</button>)}
                                    {!error && (<button type="submit" className="btn btn-primary">Login</button>)}
                                </Form>
                            </div>
                            <div className="col-12 forgot">
                                <Link prefetch href="/forgot" ><a href="/forgot">Forgot Password?</a></Link>
                            </div>
                            <div className="col-12 forgot">
                                <span style={{color: "white"}}>Don't have an account?</span> <Link prefetch href="/register" ><a href="register">Register</a></Link>
                            </div>
                            <div className="col-12">
                                <p style={{color: "white"}}>Or</p>
                                <FacebookLoginButton />
                                <GithubLoginButton />
                                <LinkedInLoginButton />
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

export default connect(
    state => ({user: state.authentication}),
    { login }
)(Login);