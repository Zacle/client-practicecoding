import React, { Component } from 'react';


export default class extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <br />
                <h2>Update Email</h2>
                <hr />
                <div className="container">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="oldEmail" className="col-4 col-form-label col-form-label-sm">Old Email</label>
                            <div className="col-8 col-md-4">
                                <input type="email" className="form-control form-control-sm" name="oldEmail" id="oldEmail" placeholder="Old Email" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="newEmail" className="col-4 col-form-label col-form-label-sm">New Email</label>
                            <div className="col-8 col-md-4">
                                <input type="password" className="form-control form-control-sm" name="newEmail" id="newEmail" placeholder="New Email" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4"></div>
                            <div className="col-8 col-md-4">
                                <button type="button" className="btn btn-primary col-8 col-md-5">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}