import React from 'react';
import App, { Container } from 'next/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBell, faEnvelope, faKey, faUser,
    faUserLock, faGlobe
} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

library.add(fab, faBell, faEnvelope, faKey, faUser, faUserLock, faGlobe);

class MyApp extends App {

    constructor(props) {
        super(props);
    }

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <Container>
                    <Component {...pageProps} />
                </Container>
            </>
        );
    }
}

export default MyApp;