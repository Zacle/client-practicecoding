import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    Form,
    FormGroup,
    Input,
    Container
} from 'reactstrap';
import Link from 'next/link';
import Head from '../components/head';
import { FacebookLoginButton, GithubLoginButton, LinkedInLoginButton } from "react-social-login-buttons";

/**
 * Register Page
 */
export default class extends Component {

    constructor(props) {
        super(props);
    }

    render() {
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
                                <form>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><FontAwesomeIcon icon="user-lock" /></div>
                                            </div>
                                            <input type="text" className="form-control" placeholder="Enter Your Username" name="username" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><FontAwesomeIcon icon="user" /></div>
                                            </div>
                                            <input type="text" className="form-control" placeholder="Enter Your Full Name" name="fullname" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><FontAwesomeIcon icon="envelope" /></div>
                                            </div>
                                            <input type="email" className="form-control" placeholder="Enter Your Email" name="email" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><FontAwesomeIcon icon="key" /></div>
                                            </div>
                                            <input type="password" className="form-control" placeholder="Enter Your Password" name="password" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><FontAwesomeIcon icon="key" /></div>
                                            </div>
                                            <input type="password" className="form-control" placeholder="Confirm Your Password" name="confirmation" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><FontAwesomeIcon icon="globe" /></div>
                                            </div>
                                            <select type="password" className="form-control" placeholder="Select Your Country" name="country" >
                                                <option value="DRC" >DRC</option>
                                                <option value="USA" >USA</option>
                                                <option value="Egypt" >Egypt</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary" >Register</button>
                                </form>
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
                        background: url(../static/images/auth.jpg) no-repeat center center fixed;
                        background-color: cover;
                    }
                    .main-section {
                        margin: 0 auto;
                        margin-top: 150px;
                        padding: 0;
                    }
                    .modal-content {
                        background-color: #434e5a;
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