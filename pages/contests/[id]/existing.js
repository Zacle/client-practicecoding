import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InContestLayout from '../../../components/contest/inContestLayout';



class AddExistingContest extends Component {

    constructor(props) {
        super(props);

        this.username = props.router.query.username;
    }

    render () {
        const title="zackle Add Existing | Practice Coding OJ";
        
        return (
            <>
                <br />
                <InContestLayout title={title} username={this.username}>
                    <br /><br />
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="offset-md-3 col-md-7 offset-2">
                                <form>
                                    <div className="row form-group">
                                        <label htmlFor="team" className="col-3 col-form-label col-form-label-sm">Contest ID</label>
                                        <div className="col-8 col-md-4">
                                            <input type="text" className="form-control form-control-sm" name="name" id="team" placeholder="Contest ID" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-3"></div>
                                        <div className="col-8 col-md-4">
                                            <button type="button" className="btn btn-primary col-8 col-md-5">Add</button>
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

export default withRouter(AddExistingContest);