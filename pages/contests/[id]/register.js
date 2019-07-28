import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InContestLayout from '../../../components/contest/inContestLayout';



class ContestRegistration extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
    }

    render() {
        const title = "Test Registration | Practice Coding OJ";
        const description = "Register to this contest";

        return (
            <>
                <br />
                <InContestLayout id={this.id} title={title} description={description} >
                    <br /><br />
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="offset-md-3 col-md-7 offset-2">
                                <p>This is an individual contest</p>
                                <button type="button" className="btn btn-primary col-8 col-md-5">Register</button>
                                <br />
                                <hr />
                                <p>This is a team contest</p>
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
                                            <button type="button" className="btn btn-primary col-8 col-md-5">Register</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </InContestLayout>
            </>
        );
    }
}