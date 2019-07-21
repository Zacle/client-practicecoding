import React, { Component } from 'react';
import Link from 'next/link';
import GroupLayout from '../../components/group/groupLayout';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <>
                <br />
                <GroupLayout title="Create Group | Practice Coding OJ" description="Create a new group on Practice Coding OJ" >
                    <div className="container">
                        <from>
                            <div className="form-group row">
                                <label htmlFor="contestName" className="col-4 col-form-label col-form-label-sm">Name</label>
                                <div className="col-8 col-md-3">
                                    <input type="text" className="form-control form-control-sm" name="name" id="contestName" placeholder="Group Name" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="cAccess" className="col-4 col-form-label col-form-label-sm">Access</label>
                                <div className="col-8 col-md-2">
                                    <select className="form-control form-control-sm" name="access" id="cAccess">
                                        <option>PUBLIC</option>
                                        <option>PRIVATE</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-4"></div>
                                <div className="col-8 col-md-4">
                                    <button type="button" className="btn btn-primary col-8 col-md-5">Create</button>
                                </div>
                            </div>
                        </from>
                    </div>
                    <style jsx>{`
                        .container {
                            margin-top: 35px;
                        }
                    `}</style>
                </GroupLayout>
            </>
        );
    }
}