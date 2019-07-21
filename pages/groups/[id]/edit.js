import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InGroupLayout from '../../../components/group/inGroupLayout';


class EditGroup extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
    }

    render () {
        const title = "Edit | Practice Coding OJ";
        return (
            <>
                <br />
                <InGroupLayout title={title} id={this.id}>
                    <div className="container">
                        <div className="offset-md-3 justify-content-left">
                            <form>
                                <div className="form-group row">
                                    <label htmlFor="cAccess" className="col-4 col-md-3 col-form-label col-form-label-sm">Access</label>
                                    <div className="col-8 col-md-3">
                                        <select className="form-control form-control-sm" name="access" id="cAccess">
                                            <option>PUBLIC</option>
                                            <option>PRIVATE</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-4 col-md-3"></div>
                                    <div className="col-8 col-md-4">
                                        <button type="button" className="btn btn-primary col-8 col-md-5">Edit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </InGroupLayout>
            </>
        );
    }
}

export default withRouter(EditGroup);