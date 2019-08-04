import React, { Component } from "react";
import Head from "./head";
import Nav from "./nav";
import Footer from './footer';

const Layout = ({title, description, auth, deauthenticate, children}) => {
    return (
        <>
            <div id="page-container">
                <div id = "page-wrap">
                    <Head title={title} description={description}></Head>
                    <Nav deauthenticate={deauthenticate} isLoggedIn={auth.isLoggedIn} user={auth.user} />
                    {children}
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Layout;