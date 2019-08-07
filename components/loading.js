import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from './main/layout';


const Loading = ({auth, deauthenticate}) => {
    const title = "Loading... | Practice Coding OJ";
    return (
        <Layout auth={auth} deauthenticate={deauthenticate} title={title}>
            <div className="info container">
                <div className="row justify-content-center">
                    <FontAwesomeIcon icon="spinner" spin size="3x" />
                </div>
            </div>
        </Layout>
    );
}

export default Loading;