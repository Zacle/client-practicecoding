import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import {withRouter} from 'next/router';
import { validateToken } from '../../redux/actions/authActions';
import Head from '../../components/main/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class EmailValidation extends React.Component {
    
    constructor(props) {
        super(props);

        this.token = this.props.router.query.token;
    }

    async componentDidMount() {
        await validateToken(this.token);
    }
    
    render() {
        return (
            <>
                <Head title="Validating... | Practice Coding OJ" description="Sign in to Practcice Coding OJ"/>
                <div className="info container">
                    <div className="row justify-content-center">
                        <FontAwesomeIcon icon="spinner" spin size="3x" />
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(EmailValidation);