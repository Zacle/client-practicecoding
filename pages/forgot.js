import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from '../components/main/head';
import { connect } from 'react-redux';
import { forgotPassword } from '../redux/actions/authActions';
import {Alert, UncontrolledAlert} from 'reactstrap';

/**
 * Login Page
 */
class Forgot extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            submit: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const email = {
            email: this.state.email
        };
        await this.props.forgotPassword(email);
        await this.setState({
            submit: true
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
        return (
            <>
                <Head title="Forgot Password | Practice Coding OJ" description="Sign in to Practcice Coding OJ"/>
                <div className="modal-dialog text-center">
                    <div className="col-sm-9 main-section">
                        <div className="modal-content">
                            <div className="col-12 user-img">
                                <img src="../static/images/face.png" />
                            </div>
                            <div className="col-12 form-input">
                                {this.state.submit && this.props.user.forgot &&
                                (
                                    <Alert color="danger">
                                        {this.props.user.forgot}
                                    </Alert>
                                )}
                                {this.state.submit && !this.props.user.forgot &&
                                (
                                    <UncontrolledAlert color="success">
                                        <p>An email has been sent to reset your password.</p>
                                        <p>If you can't see it. Check your spam folder</p>
                                    </UncontrolledAlert>
                                )}
                                <form onSubmit={this.handleSubmit} noValidate>
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><FontAwesomeIcon icon="envelope" /></div>
                                            </div>
                                            <input type="email"
                                                   className="form-control"
                                                   placeholder="Enter Email"
                                                   name="email"
                                                   required
                                                   value={this.state.email}
                                                   onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary" >Submit</button>
                                </form>
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
    { forgotPassword }
)(Forgot);