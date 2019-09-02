import React, { Component } from 'react';
import {withRouter} from 'next/router';
import init from '../../utils/initialize';
import {connect} from 'react-redux';
import {deauthenticate} from '../../redux/actions/authActions';
import {IsomorphicEditor} from '../../components/editor';
import { Form, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import EditorLayout from '../../components/editor/editorLayout';
import Loading from '../../components/loading';
import {getCode, postCode, putCode} from '../../redux/actions/editorActions';


class Source extends Component {

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
        this.id = props.router.query.id;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.update = this.update.bind(this);
        this.save = this.save.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx);
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

    async handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        await this.setState({
          [name]: value
        });
    }

    async componentDidMount() {
        await this.props.getCode(this.id);
        if (this.props.source.source) {
            await this.setState({
                language: this.props.source.source.language,
                theme: this.props.source.source.theme,
                input: this.props.source.source.input,
                source: this.props.source.source.source,
                name: this.props.source.source.name
            });
        }
    }

    async update() {
        const data = {
            language: this.state.language,
            theme: this.state.theme,
            name: this.state.name,
            source: this.state.source
        };
        console.log("DATA: ", data);
        await this.props.putCode(data, this.id, this.props.auth.token);
    }

    async save() {
        const data = {
            language: this.state.language,
            theme: this.state.theme,
            name: this.state.name || "Source Code",
            source: this.state.source
        };
        console.log("DATA: ", data);
        await postCode(data, this.props.auth.token);
    }

    render() {
        let canSave = false;
        let canEdit = false;
        let out = !canSave && !canEdit;
        
        if (this.props.source.sourceError) {
            const title = "Practice Coding OJ";
            return (
                <EditorLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="error row justify-content-center">
                            <p className="error">{this.props.source.sourceError}</p>
                        </div>
                    </div>
                </EditorLayout>
            );
        }
        else if (this.props.source.source) {
            if (this.props.source.source && this.props.auth.isLoggedIn) {
                if (this.props.source.source.author.username === this.props.auth.user.username) {
                    canSave = true;
                }
                else {
                    canEdit = true;
                }
                out = false;
            }
            const title = (this.props.source.source.name || "Source Code") + " | Practice Coding OJ";
            const description = "Edit, compile and run your code on Practice Coding OJ";

            return (
                <>
                    <EditorLayout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} description={description} >
                        <div className="container">
                            <br />
                            <div className="row">
                                <div className="col-md-7">
                                    {this.props.auth.isLoggedIn && (<div className="row justify-content-center">
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
                                    </div>)}
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
                                        {canEdit && (<button onClick={this.save} className="btn btn-success">Edit</button>)}
                                        {canSave && (<button onClick={this.update} className="btn btn-success">Save</button>)}
                                        {out && (<p>Log in to edit and save</p>)}
                                    </div>
                                </div>
                            </div>
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

export default withRouter(connect(
    mapStateToProps,
    {deauthenticate, getCode, postCode, putCode}
)(Source));