import React, { Component } from 'react';
import GroupLayout from '../../components/group/groupLayout';
import {connect} from 'react-redux';
import {deauthenticate} from '../../redux/actions/authActions';
import init from '../../utils/initialize';
import {addGroup} from '../../redux/actions/groupActions';
import { Form, Input, UncontrolledAlert, FormFeedback } from 'reactstrap';


class CreateGroup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            access: '',
            submit: false,
            touched: {
                name: false
            }
        };
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx, true);
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
            if (this.state.name.length < 5) {
                errors.name = "Group name length must be at least 5";
            }
            else if (this.state.name.length > 15) {
                errors.name = "Group name length must be less than 16";
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
        const group = {
            name: this.state.name,
            description: this.state.description,
            access: this.state.access
        };
        await this.props.addGroup(group, this.props.auth.token);
        await this.setState({
            name: '',
            description: '',
            access: '',
            submit: true
        });
    }

    render () {
        const errors = this.validate(this.state.name);
        let error = errors.name !== '' || this.state.email === '';
        return (
            <>
                <GroupLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title="Create Group | Practice Coding OJ" description="Create a new group on Practice Coding OJ" >
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="offset-md-2 col-md-5 offset-2">
                                {this.props.groups.addError && this.state.submit &&
                                (
                                    <UncontrolledAlert color="danger">
                                        {this.props.groups.addError}
                                    </UncontrolledAlert>
                                )}
                                {this.props.groups.group &&
                                (
                                    <UncontrolledAlert color="success">
                                        Group added
                                    </UncontrolledAlert>
                                )}
                                <Form onSubmit={this.handleSubmit} noValidate>
                                    <div className="form-group row">
                                        <label htmlFor="contestName" className="col-3 col-form-label col-form-label-sm">Name</label>
                                        <div className="col-9">
                                            <Input type="text"
                                                    className="form-control form-control-sm"
                                                    name="name" 
                                                    id="contestName" 
                                                    placeholder="Group Name"
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
                                        <label htmlFor="cdes" className="col-3 col-form-label col-form-label-sm">Description</label>
                                        <div className="col-9">
                                            <textarea value={this.state.description} onChange={this.handleInputChange} id="cdes" className="form-control form-control-sm" rows="3" name="description" ></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="cAccess" className="col-3 col-form-label col-form-label-sm">Access</label>
                                        <div className="col-9">
                                            <select type="select" value={this.state.access} onChange={this.handleInputChange} className="form-control form-control-sm" name="access" id="cAccess">
                                                <option value="" disabled>Select Access</option>
                                                <option value="PUBLIC">PUBLIC</option>
                                                <option value="PRIVATE">PRIVATE</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-3"></div>
                                        <div className="col-9">
                                        {error && (<button type="submit" className="btn btn-danger" disabled>Create</button>)}
                                        {!error && (<button type="submit" className="btn btn-primary">Create</button>)}
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </GroupLayout>
            </>
        );
    }
}

const mapStateToProps = state => ({
        auth: state.authentication,
        groups: state.groups
    }
);

export default connect(
    mapStateToProps,
    {deauthenticate, addGroup}
)(CreateGroup);