import React, { Component } from 'react';
import ReactAce from 'react-ace-editor';
import Layout from '../components/main/layout';
import init from '../utils/initialize';
import {connect} from 'react-redux';
import {deauthenticate} from '../redux/actions/authActions';
import {IsomorphicEditor} from '../components/editor';
import { Form, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';


class Editor extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            language: 'c_cpp',
            theme: 'ambiance',
            activeTab: '1',
            input: '',
            output: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    async handleSubmit(e) {
        e.preventDefault();
        this.toggle('2');
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
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} description={description} >
                    <br/><br />
                    <div className="container">
                        <br />
                        <div className="row">
                            <div className="col-md-6">
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
                                <IsomorphicEditor mode={this.state.language} theme={this.state.theme} style={{width: "100%", fontSize: "14px"}} />
                            </div>
                            <div className="ml-1 col-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-3">
                                    </div>
                                    <div className="col-3">
                                    </div>
                                </div>
                                <br /><br />
                                <div>
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggle('1'); }}
                                            >
                                            Input
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggle('2'); }}
                                            >
                                            Output
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="1">
                                            <Row>
                                                <Col sm="12">
                                                    <form onSubmit={this.handleSubmit} noValidate>
                                                        <textarea value={this.state.input} onChange={this.handleInputChange} id="cdes" className="form-control form-control-sm" rows="7" name="input" ></textarea>
                                                        <br />
                                                        <button type="submit" className="btn btn-success">Compile and Run</button>
                                                    </form>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <Row>
                                                <Col sm="12">
                                                <textarea value={this.state.output} onChange={this.handleInputChange} className="form-control form-control-sm" rows="7" name="output" disabled></textarea>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                    </TabContent>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
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