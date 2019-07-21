import React, { Component } from 'react';


export default class extends Component {

    constructor(props) {
        super();
    }

    render () {
        return (
            <>
                <br/>
                <h2>Update Password</h2>
                <hr />
                <div className="container">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="oldPassword" className="col-4 col-form-label col-form-label-sm">Old Password</label>
                            <div className="col-8 col-md-4">
                                <input type="password" className="form-control form-control-sm" name="oldPassword" id="oldPassword" placeholder="Old Password" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="newPassword" className="col-4 col-form-label col-form-label-sm">New Password</label>
                            <div className="col-8 col-md-4">
                                <input type="password" className="form-control form-control-sm" name="newPassword" id="newPassword" placeholder="New Password" />
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
                <style jsx>{`
                    .container {
                        margin-top: 35px;
                    }
                `}</style>
            </>
        );
    }
}