import React, { Component } from "react";
import Head from "./head";
import Nav from "./nav";
import Footer from './footer';

export default class Layout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {title, description, children} = this.props;
        return (
            <>
                <div id="page-container">
                    <div id = "page-wrap">
                        <Head title={title} description={description}></Head>
                        <Nav />
                        {children}
                    </div>
                    <Footer />
                </div>
                
            </>
        );
    }
}