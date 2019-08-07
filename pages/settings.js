import React, { Component } from 'react';
import {
    Container
} from 'reactstrap';
import UpdatePassword from '../components/setting/passwordSetting';
import UpdateInfo from '../components/setting/profileSetting';
import UpdateEmail from '../components/setting/emailSetting';
import Layout from '../components/main/layout';
import {connect} from 'react-redux';
import init from '../utils/initialize';
import {deauthenticate} from '../redux/actions/authActions';
import {getUser, updatePassword, updateInfo, updateEmail} from '../redux/actions/userActions';
import Loading from '../components/loading';


class Settings extends Component {

    constructor(props) {
        super(props);
        this.submitPassword = this.submitPassword.bind(this);
        this.submitInfo = this.submitInfo.bind(this);
        this.submitEmail = this.submitEmail.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx, true);
    }

    async componentDidMount() {
        await this.props.getUser(this.props.auth.user.username);
    }

    async submitPassword(password) {
        await this.props.updatePassword(password, this.props.auth.token);
    }

    async submitInfo(info) {
        await this.props.updateInfo(info, this.props.auth.token);
    }

    async submitEmail(email) {
        await this.props.updateEmail(email, this.props.auth.token)
    }

    render () {
        if (this.props.user.user) {
            return (
                <>
                    <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title="Settings | Practice Coding OJ" description = "Update your info on Practice Coding OJ">
                        <Container className="sub-nav">
                            <UpdatePassword submitPassword={this.submitPassword} auth={this.props.auth} user={this.props.user.user} />
                            <UpdateInfo submitInfo={this.submitInfo} auth={this.props.auth}  user={this.props.user.user} error={this.props.user.error} />
                            <UpdateEmail submitEmail={this.submitEmail} auth={this.props.auth} error={this.props.user.error} email={this.props.user.email} />
                        </Container>
                    </Layout>
                </>
            );
        }
        else {
            return (
                <Loading auth={this.props.auth} deauthenticate={this.props.deauthenticate} />
            );
        }
        
    }
}

const mapStateToProps = state => ({user: state.user,
        auth: state.authentication
    }
);

export default connect(
    mapStateToProps,
    {deauthenticate, getUser, updatePassword, updateInfo, updateEmail}
)(Settings);