import React, { Component } from "react";
import Head from "./head";
import Nav from "./nav";
import Footer from './footer';
import {connect} from 'react-redux';
import {deauthenticate} from '../../redux/actions/authActions';

const Layout = ({title, description, auth, deauthenticate, children}) => {
    return (
        <>
            <div id="page-container">
                <div id = "page-wrap">
                    <Head title={title} description={description}></Head>
                    <Nav deauthenticate={deauthenticate} isLoggedIn={auth.isLoggedIn} username={auth.user.username} />
                    {children}
                </div>
                <Footer />
            </div>
        </>
    );
}

const mapStateToProps = state => ({auth: state.authentication});

export default connect(
    mapStateToProps,
    {deauthenticate}
)(Layout);