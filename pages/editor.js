import React, { Component } from 'react';
import ReactAce from 'react-ace-editor';
import Layout from '../components/main/layout';
import init from '../utils/initialize';
import {connect} from 'react-redux';


class Editor extends Component {

    constructor(props, context) {
        super(props, context);
    }

    static getInitialProps(ctx) {
        init(ctx, true);
    }

    render() {
        const title = "Editor | Practice Coding OJ";
        const description = "Edit, compile and run your code on Practice Coding OJ";

        return (
            <>
                <Layout title={title} description={description} >
                    <br/><br />
                    <div className="container">
                        <br />
                        <div className="row justify-content-center">
                            <div className="row">
                                <div className="col-4">
                                    <select className="form-control form-control-sm">
                                        <option value="c">C</option>
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
                                <div>
                                    <select className="form-control form-control-sm">
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
                        </div>
                        <div className="row justify-content-center">
                            <ReactAce mode="java"
                                theme="monokai"
                                name="code"
                                style={{width: "60%", height: "500px", fontSize: "15px"}}
                                editorProps={{$blockScrolling: Infinity}}
                                onLoad={(editor) => {
                                    editor.focus();
                                    editor.getSession().setUseWrapMode(true);
                                }}
                                ref={instance => { this.ace = instance; }} />
                        </div>
                    </div>
                </Layout>
            </>
        );
    }
}

export default connect(
    state => state
)(Editor);