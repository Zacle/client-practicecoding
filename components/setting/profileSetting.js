import React, { Component } from 'react';
import { Form, Input, FormFeedback, UncontrolledAlert } from 'reactstrap';
import countryList from 'react-select-country-list';
import Option from '../../components/main/option';


export default class extends Component {

    constructor(props) {
        super(props);

        this.options = countryList().getLabels();

        this.state = {
            fullname: '',
            codeforces: '',
            uva: '',
            livearchive: '',
            country: '',
            submit: false,
            touched: {
                fullname: false,
                codeforces: false,
                uva: false,
                livearchive: false
            },
            options: this.options
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    async componentDidMount() {
        await this.setState({
            fullname: this.props.user.fullname,
            codeforces: this.props.user.codeforces,
            uva: this.props.user.uva,
            livearchive: this.props.user.livearchive,
            country: this.props.user.country
        });
    }

    validate() {
        const errors = {
            fullname: ''
        };

        if (this.state.touched.fullname) {
            if (this.state.fullname.length < 2) {
                errors.fullname = "Provide your Full Name";
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
        const user = {
            fullname: this.state.fullname,
            country: this.state.country,
            codeforces: this.state.codeforces,
            uva: this.state.uva,
            livearchive: this.state.livearchive
        }
        await this.props.submitInfo(user);
        await this.setState({
            submit: true
        });
        
    }

    render() {
        const errors = this.validate();
        const error = (errors.fullname !== '' || this.state.fullname == '');
        return (
            <>
                <br />
                <h2>Update Personal Info</h2>
                <hr />
                <div className="container">
                    {this.props.error &&
                    (
                        <div className="row justify-content-center">
                            <UncontrolledAlert color="danger">
                                {this.props.error}
                            </UncontrolledAlert>
                        </div>
                    )}
                    {!this.props.error && this.state.submit &&
                    (
                        <div className="row justify-content-center">
                            <UncontrolledAlert color="success">
                                Info Updated
                            </UncontrolledAlert>
                        </div>
                    )}
                    <Form onSubmit={this.handleSubmit} noValidate>
                        <div className="form-group row">
                            <label htmlFor="fullname" className="col-4 col-form-label col-form-label-sm">Full Name</label>
                            <div className="col-8 col-md-4">
                                <Input type="text"
                                       className="form-control form-control-sm"
                                       name="fullname"
                                       id="fullname"
                                       placeholder="Full Name"
                                       valid={errors.fullname === ''}
                                       invalid={errors.fullname !== ''}
                                       onBlur={this.handleBlur('fullname')}
                                       required
                                       value={this.state.fullname}
                                       onChange={this.handleInputChange} />
                                <FormFeedback> {errors.fullname} </FormFeedback>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="codeforces" className="col-4 col-form-label col-form-label-sm">Codeforces Handle</label>
                            <div className="col-8 col-md-4">
                                <Input type="text"
                                        className="form-control form-control-sm"
                                        name="codeforces"
                                        id="codeforces"
                                        placeholder="Codeforces Handle"
                                        onBlur={this.handleBlur('codeforces')}
                                        required
                                        value={this.state.codeforces}
                                        onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="uva" className="col-4 col-form-label col-form-label-sm">Uva Handle</label>
                            <div className="col-8 col-md-4">
                                <Input type="text"
                                            className="form-control form-control-sm"
                                            name="uva"
                                            id="uva"
                                            placeholder="Uva Handle"
                                            onBlur={this.handleBlur('uva')}
                                            required
                                            value={this.state.uva}
                                            onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="livearchive" className="col-4 col-form-label col-form-label-sm">Live Archive Handle</label>
                            <div className="col-8 col-md-4">
                                <input type="text"
                                       className="form-control form-control-sm"
                                       name="livearchive"
                                       id="livearchive"
                                       placeholder="Live Archive Handle"
                                       onBlur={this.handleBlur('livearchive')}
                                       required
                                       value={this.state.livearchive}
                                       onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="country" className="col-4 col-form-label col-form-label-sm">Country</label>
                            <div className="col-8 col-md-4">
                                <select type="select" className="form-control" name="country" onChange={this.handleInputChange} value={this.state.country}>
                                    <Option options={this.state.options} />
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4"></div>
                            <div className="col-8 col-md-4">
                                {error && (<button type="submit" className="btn btn-danger" disabled>Update</button>)}
                                {!error && (<button type="submit" className="btn btn-primary">Update</button>)}
                            </div>
                        </div>
                    </Form>
                </div>
            </>
        );
    }
}