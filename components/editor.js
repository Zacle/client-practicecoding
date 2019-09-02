import React, { Component } from 'react';

const Editor = (props) => {
    if (typeof window !== 'undefined') {
        var brace = require('brace');
        var AceEditor = require('react-ace').default;
        let mode = props.mode;
        let theme = props.theme;
        require('brace/mode/' + mode);
        require('brace/theme/' + theme);
  
      return <AceEditor
                        value={props.source}
                        editorProps={{$blockScrolling: Infinity}}
                        onChange={props.onChange}
                        onLoad={(editor) => {
                            editor.focus();
                            editor.getSession().setUseWrapMode(true);
                        }}
                        {...props}/>
    }
  
    return null;
}

export class IsomorphicEditor extends React.Component {
    state = {mounted: false};
  
    componentDidMount() {
      this.setState({mounted: true});
    }
  
    render = () => (this.state.mounted ? <Editor {...this.props} /> : null);
}