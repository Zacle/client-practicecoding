import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InGroupLayout from '../../../components/group/inGroupLayout';
import {connect} from 'react-redux';
import {deauthenticate} from '../../../redux/actions/authActions';
import init from '../../../utils/initialize';
import {fetchGroup, updateInfo} from '../../../redux/actions/groupActions';
import Loading from '../../../components/loading';
import Layout from '../../../components/main/layout';
import Router from 'next/router';
import { UncontrolledAlert } from 'reactstrap';


class EditGroup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            description: '',
            access: '',
            submit: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.id = props.router.query.id;
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
        const query = {
            description: this.state.description,
            access: this.state.access
        };
        await this.props.updateInfo(query, this.id, this.props.auth.token);
        await this.setState({
            submit: true
        });
    }

    static getInitialProps(ctx) {
        init(ctx, true);
    }

    async componentDidMount() {
        await this.props.fetchGroup(this.id, this.props.auth.user.username, this.props.auth.token);
        if (this.props.groups.inGroup) {
            if (this.props.groups.inGroup.admin.username !== this.props.auth.user.username) {
                Router.push(`/groups/${id}`);
            }
            await this.setState({
                description: this.props.groups.inGroup.description,
                access: (this.props.groups.inGroup.access == 0) ? "PRIVATE" : "PUBLIC"
            });
        }
        
    }

    render () {
        if (this.props.groups.error) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="row justify-content-center">
                            <p className="error">{this.props.groups.error}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.groups.inGroup) {
            const title = "Edit | Practice Coding OJ";
            return (
                <>
                    <InGroupLayout group={this.props.groups.inGroup} auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} id={this.id}>
                        <div className="container">
                            <div className="offset-md-3 justify-content-left">
                                <br />
                                {this.props.groups.updateError && this.state.submit &&
                                (
                                    <UncontrolledAlert className="text-center" color="danger">
                                        {this.props.groups.updateError}
                                    </UncontrolledAlert>
                                )}
                                {this.props.groups.inGroup && this.state.submit &&
                                (
                                    <UncontrolledAlert className="text-center" color="success">
                                        Group Info Updated
                                    </UncontrolledAlert>
                                )}
                                <form onSubmit={this.handleSubmit} noValidate>
                                    <div className="form-group row">
                                        <label htmlFor="cdes" className="col-3 col-form-label col-form-label-sm">Description</label>
                                        <div className="col-5">
                                            <textarea value={this.state.description} onChange={this.handleInputChange} id="cdes" className="form-control form-control-sm" rows="3" name="description" ></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="cAccess" className="col-4 col-md-3 col-form-label col-form-label-sm">Access</label>
                                        <div className="col-8 col-md-3">
                                            <select type="select" value={this.state.access} onChange={this.handleInputChange} className="form-control form-control-sm" name="access" id="cAccess">
                                                <option value="" disabled>Select Access</option>
                                                <option value="PUBLIC">PUBLIC</option>
                                                <option value="PRIVATE">PRIVATE</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-4 col-md-3"></div>
                                        <div className="col-8 col-md-4">
                                            <button type="submit" className="btn btn-primary col-8 col-md-5">Edit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </InGroupLayout>
                </>
            );
        }
        else {
            return (
                <Loading auth={this.props.auth} deauthenticate={this.props.deauthenticate} />
            );
        }
    }
}

const mapStateToProps = state => ({
        auth: state.authentication,
        groups: state.groups
    }
);

export default withRouter(connect(
    mapStateToProps,
    {deauthenticate, fetchGroup, updateInfo}
)(EditGroup));