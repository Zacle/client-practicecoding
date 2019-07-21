import React, { Component } from 'react';
import ProfileLayout from '../../components/profile/profileLayout';
import { withRouter } from 'next/router';


class Profile extends Component {

    constructor(props) {
        super(props);

        this.user = this.props.router.query.username;
    }

    render() {
        const title = this.user + " | Practice Coding OJ";
        const description = `Profile of ${this.user} on Practice Coding OJ`;
        return (
            <>
                <br />
                <ProfileLayout title={title} description={description} username={this.user}>
                    <div className="container">
                        <div className="justify-content-left">
                            <div className="row">
                                <div className="col-4 col-md-4">Full Name: </div>
                                <div className="col-8 col-md-6">{this.user}</div>
                            </div>
                            <div className="row">
                                <div className="col-4 col-md-4">Codeforces Handle: </div>
                                <div className="col-8 col-md-6">{this.user}</div>
                            </div>
                            <div className="row">
                                <div className="col-4 col-md-4">Uva Handle: </div>
                                <div className="col-8 col-md-6">{this.user}</div>
                            </div>
                            <div className="row">
                                <div className="col-4 col-md-4">Live Archive: </div>
                                <div className="col-8 col-md-6">{this.user}</div>
                            </div>
                            <div className="row">
                                <div className="col-4 col-md-4">Join on: </div>
                                <div className="col-8 col-md-6">{this.user}</div>
                            </div>
                        </div>
                    </div>
                </ProfileLayout>
            </>
        );
    }
}

export default withRouter(Profile);
