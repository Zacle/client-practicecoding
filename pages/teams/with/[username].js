import React, { Component } from 'react';
import { withRouter } from 'next/router';
import ProfileLayout from '../../../components/profile/profileLayout';
import Teams from '../../../components/team/myTeams';

class UserTeams extends Component {

    constructor(props) {
        super(props);

        this.username = props.router.query.username;
    }

    render () {
        const title="zackle teams | Practice Coding OJ";
        
        return (
            <>
                <br />
                <ProfileLayout title={title} username={this.username}>
                    <br /><br />
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="offset-md-3 col-md-7 offset-2">
                                <form>
                                    <div className="row form-group">
                                        <label htmlFor="team" className="col-3 col-form-label col-form-label-sm">Team Name</label>
                                        <div className="col-8 col-md-4">
                                            <input type="text" className="form-control form-control-sm" name="name" id="team" placeholder="Team Name" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-3"></div>
                                        <div className="col-8 col-md-4">
                                            <button type="button" className="btn btn-primary col-8 col-md-5">Create</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <br />
                        <div className="container">
                            <Teams />
                        </div>
                    </div>
                </ProfileLayout>
            </>
        );
    }
}

export default withRouter(UserTeams);