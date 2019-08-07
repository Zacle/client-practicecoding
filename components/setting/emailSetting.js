import React, { Component } from 'react';
import { Form, Input, FormFeedback, UncontrolledAlert } from 'reactstrap';


export default class extends Component {

    constructor(props) {
        super(props);

        this.state = {
            oldEmail: '',
            newEmail: '',
            submit: false,
            touched: {
                oldEmail: false,
                newEmail: false
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    validate(oldEmail, newEmail) {
        const errors = {
            oldEmail: '',
            newEmail: ''
        };

        if (this.state.touched.oldEmail) {
            if (!this.validateEmail(oldEmail)) {
                errors.oldEmail = "Old email is invalid email";
            }
        }
        if (this.state.touched.newEmail) {
            if (!this.validateEmail(newEmail)) {
                errors.newEmail = "New email is invalid email";
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

    async handleSubmit(e) {
        e.preventDefault();
        const email = {
            oldEmail: this.state.oldEmail,
            newEmail: this.state.newEmail
        }
        await this.props.submitEmail(email);
        await this.setState({
            oldEmail: '',
            newEmail: '',
            submit: true
        });
    }

    async componentDidMount() {
        await this.setState({
            submit: false
        });
    }

    render() {
        const errors = this.validate(this.state.oldEmail, this.state.newEmail);
        const InputError = (errors.oldEmail !== '' || errors.newEmail !== '');
        const empty = (this.state.oldEmail === '' || this.state.newEmail === '');
        return (
            <>
                <br />
                <h2>Update Email</h2>
                <hr />
                <div className="container">
                    {this.props.error && this.state.submit &&
                    (
                        <div className="row justify-content-center">
                            <UncontrolledAlert color="danger">
                                {this.props.error}
                            </UncontrolledAlert>
                        </div>
                    )}
                    {this.props.email && this.state.submit &&
                    (
                        <div className="row justify-content-center">
                            <UncontrolledAlert color="success">
                                Email Updated
                            </UncontrolledAlert>
                        </div>
                    )}
                    <Form onSubmit={this.handleSubmit} noValidate>
                        <div className="form-group row">
                            <label htmlFor="oldEmail" className="col-4 col-form-label col-form-label-sm">Old Email</label>
                            <div className="col-8 col-md-4">
                                <Input type="email"
                                       className="form-control form-control-sm"
                                       name="oldEmail" 
                                       id="oldEmail"
                                       placeholder="Old Email"
                                       valid={errors.oldEmail === ''}
                                       invalid={errors.oldEmail !== ''}
                                       onBlur={this.handleBlur('oldEmail')}
                                       required
                                       value={this.state.oldEmail}
                                       onChange={this.handleInputChange} />
                                <FormFeedback> {errors.oldEmail} </FormFeedback>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="newEmail" className="col-4 col-form-label col-form-label-sm">New Email</label>
                            <div className="col-8 col-md-4">
                                <Input type="email"
                                       className="form-control form-control-sm"
                                       name="newEmail" 
                                       id="newEmail"
                                       placeholder="New Email"
                                       valid={errors.newEmail === ''}
                                       invalid={errors.newEmail !== ''}
                                       onBlur={this.handleBlur('newEmail')}
                                       required
                                       value={this.state.newEmail}
                                       onChange={this.handleInputChange} />
                                <FormFeedback> {errors.newEmail} </FormFeedback>
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
            </>
        );
    }
}