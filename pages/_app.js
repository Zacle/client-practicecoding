import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { Store } from '../redux/store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBell, faEnvelope, faKey, faUser,
    faUserLock, faGlobe, faEdit, faTrashAlt, faUserTimes,
    faSpinner, faSave
} from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';


library.add(fab, faBell, faEnvelope, faKey, faUser, faUserLock, faGlobe,
    faEdit, faTrashAlt, faUserTimes, faSpinner, faSave);

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
        const { Component, pageProps, store } = this.props;

        return (
            <>
                <Container>
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                </Container>
            </>
        );
    }
}

export default withRedux(Store)(MyApp);