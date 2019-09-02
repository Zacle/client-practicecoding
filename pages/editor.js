import React, { Component } from 'react';
import ReactAce from 'react-ace-editor';
import Layout from '../components/main/layout';
import init from '../utils/initialize';
import {connect} from 'react-redux';
import {deauthenticate} from '../redux/actions/authActions';
import {IsomorphicEditor} from '../components/editor';
import { Form, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import EditorLayout from '../components/editor/editorLayout';
import Loading from '../components/loading';
import {postCode} from '../redux/actions/editorActions';


class Editor extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            language: 'c_cpp',
            theme: 'ambiance',
            activeTab: '1',
            input: '',
            output: '',
            name: '',
            source: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx, true);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    onChange(value) {
        console.log("VALUE: ", value);
        this.setState({
            source: value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const data = {
            language: this.state.language,
            theme: this.state.theme,
            name: this.state.name,
            source: this.state.source
        };
        console.log("DATA: ", data);
        await postCode(data, this.props.auth.token);
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
        const title = "Editor | Practice Coding OJ";
        const description = "Edit, compile and run your code on Practice Coding OJ";

        return (
            <>
                <EditorLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} description={description} >
                    <div className="container">
                        <br />
                        <div className="row">
                            <div className="col-md-7">
                                <div className="row justify-content-center">
                                    <div className="col-3">
                                        <select className="form-control form-control-sm" name="language" onChange={this.handleInputChange} value={this.state.language} >
                                            <option value="" disabled>Select Language</option>
                                            <option value="c_cpp">C++</option>
                                            <option value="clojure">Clojure</option>
                                            <option value="csharp">C#</option>
                                            <option value="java">Java</option>
                                            <option value="javascript">JavaScript</option>
                                            <option value="haskell">Haskell</option>
                                            <option value="perl">Perl</option>
                                            <option value="php">PHP</option>
                                            <option value="python">Python</option>
                                            <option value="ruby">Ruby</option>
                                        </select>
                                    </div>
                                    <div className="col-3">
                                        <select className="form-control form-control-sm" name="theme" onChange={this.handleInputChange} value={this.state.theme}>
                                            <option value="" disabled>Choose theme</option>
                                            <option value="ambiance">ambiance</option>
                                            <option value="chrome">chrome</option>
                                            <option value="clouds_midnight">clouds_midnight</option>
                                            <option value="cobalt">cobalt</option>
                                            <option value="github">github</option>
                                            <option value="eclipse">eclipse</option>
                                            <option value="monokai">monokai</option>
                                        </select>
                                    </div>
                                </div>
                                <br />
                                <IsomorphicEditor onChange={this.onChange} mode={this.state.language} theme={this.state.theme} style={{width: "100%", fontSize: "14px"}} source={this.state.source} />
                            </div>
                            <div className="col-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-3">
                                    </div>
                                    <div className="col-3">
                                    </div>
                                </div>
                                <br /><br />
                                <div className="row justify-content-center">
                                    <form onSubmit={this.handleSubmit} noValidate>
                                        <div className="form-group row">
                                            <input name="name" className="form-control form-control-sm" type="text" value={this.state.name} onChange={this.handleInputChange} placeholder="Enter name" />
                                        </div>
                                        <div className="form-group row">
                                            <button className="btn btn-primary" type="submit" >Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </EditorLayout>
            </>
        );
    }
}

const mapStateToProps = state => ({
        auth: state.authentication
    }
);

export default connect(
    mapStateToProps,
    {deauthenticate}
)(Editor);