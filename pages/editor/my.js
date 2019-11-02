import React, { Component } from 'react';
import init from '../../utils/initialize';
import {connect} from 'react-redux';
import {deauthenticate} from '../../redux/actions/authActions';
import { Form, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import EditorLayout from '../../components/editor/editorLayout';
import Loading from '../../components/loading';
import Layout from '../../components/main/layout';
import {fetchCodes, deleteCode} from '../../redux/actions/editorActions';
import Codes from '../../components/editor/codes';


class MyCodes extends Component {

    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx, true);
    }

    async componentDidMount() {
        await this.props.fetchCodes(this.props.auth.token);
    }

    async delete(id) {
        await this.props.deleteCode(id, this.props.auth.token);
    }

    render() {
        if (this.props.source.codesError) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="error row justify-content-center">
                            <p className="error">{this.props.source.codesError || "An errror occurred. Please Try agin later!"}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.source.codes) {
            const title = "My Source Codes | Practice Coding OJ";

            return (
                <>
                    <EditorLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} >
                        <br />
                        <div className="container">
                            <Codes codes={this.props.source.codes} remove={this.delete} />
                        </div>
                    </EditorLayout>
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
        source: state.editor
    }
);

export default connect(
    mapStateToProps,
    {deauthenticate, fetchCodes, deleteCode}
)(MyCodes);