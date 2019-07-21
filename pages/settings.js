import React, { Component } from 'react';
import {
    Container
} from 'reactstrap';
import UpdatePassword from '../components/setting/passwordSetting';
import UpdateInfo from '../components/setting/profileSetting';
import UpdateEmail from '../components/setting/emailSetting';
import Layout from '../components/main/layout';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <>
                <Layout title="Settings | Practice Coding OJ" description = "Update your info on Practice Coding OJ">
                    <br /><br />
                    <Container>
                        <UpdatePassword />
                        <UpdateInfo />
                        <UpdateEmail />
                    </Container>
                </Layout>
            </>
        );
    }
}