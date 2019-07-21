import React, { Component } from 'react';


export default class extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <br />
                <h2>Update Personal Info</h2>
                <hr />
                <div className="container">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="fullname" className="col-4 col-form-label col-form-label-sm">Full Name</label>
                            <div className="col-8 col-md-4">
                                <input type="text" className="form-control form-control-sm" name="fullname" id="fullname" placeholder="Full Name" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="codeforces" className="col-4 col-form-label col-form-label-sm">Codeforces Handle</label>
                            <div className="col-8 col-md-4">
                                <input type="text" className="form-control form-control-sm" name="codeforces" id="codeforces" placeholder="Codeforces Handle" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="uva" className="col-4 col-form-label col-form-label-sm">Uva Handle</label>
                            <div className="col-8 col-md-4">
                                <input type="text" className="form-control form-control-sm" name="uva" id="uva" placeholder="Uva Handle" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="livearchive" className="col-4 col-form-label col-form-label-sm">Live Archive Handle</label>
                            <div className="col-8 col-md-4">
                                <input type="text" className="form-control form-control-sm" name="livearchive" id="livearchive" placeholder="Live Archive Handle" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="country" className="col-4 col-form-label col-form-label-sm">Country</label>
                            <div className="col-8 col-md-4">
                                <select type="select" className="form-control form-control-sm" name="country" >
                                    <option value="DRC" >DRC</option>
                                    <option value="USA" >USA</option>
                                    <option value="Egypt" >Egypt</option>
                                </select>
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