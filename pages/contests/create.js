import React, { Component } from 'react';
import Link from 'next/link';
import ContestLayout from '../../components/contestLayout';
import {
    Form,
    FormGroup,
    Col,
    Button,
    Label,
    Input
} from 'reactstrap';
import Option from '../../components/option';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <>
                <br />
                <ContestLayout title="Create Contest | Practice Coding OJ" description="Create a new contest on Practice Coding OJ" >
                    <div className="container">
                        <from>
                            <div className="form-group row">
                                <label for="contestName" className="col-4 col-form-label col-form-label-sm">Name</label>
                                <div className="col-8 col-md-4">
                                    <input type="text" className="form-control form-control-sm" name="name" id="contestName" placeholder="Contest Name" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="cStartD" className="col-4 col-form-label col-form-label-sm">Start Date</label>
                                <div className="row col-8">
                                    <div className="col-2 col-md-2">
                                        <select className="form-control form-control-sm" name="startDateDay" id="cStartD" >
                                            <Option index={1} number={31} />
                                        </select>
                                    </div>
                                    <div className="col-2 col-md-2">
                                        <select className="form-control form-control-sm" name="startDateMonth" >
                                            <Option index={1} number={12} />
                                        </select>
                                    </div>
                                    <div className="col-4 col-md-2">
                                        <select className="form-control form-control-sm" name="startDateYear" >
                                            <Option start={2019} end={2029} />
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="cStartT" className="col-4 col-form-label col-form-label-sm">Start Time</label>
                                <div className="row col-8">
                                    <div className="col-4 col-md-2">
                                        <select className="form-control form-control-sm" name="startTimeHour" id="cStartT" >
                                            <Option index={0} number={23} />
                                        </select>
                                    </div>
                                    <div className="col-4 col-md-2">
                                        <select className="form-control form-control-sm" name="startTimeMinute" >
                                            <Option index={0} number={59} />
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="cEndD" className="col-4 col-form-label col-form-label-sm">End Date</label>
                                <div className="row col-8">
                                    <div className="col-2 col-md-2">
                                        <select className="form-control form-control-sm" name="endDateDay" id="cEndD" >
                                            <Option index={1} number={31} />
                                        </select>
                                    </div>
                                    <div className="col-2 col-md-2">
                                        <select className="form-control form-control-sm" name="endDateMonth" >
                                            <Option index={1} number={12} />
                                        </select>
                                    </div>
                                    <div className="col-4 col-md-2">
                                        <select className="form-control form-control-sm" name="endDateYear" >
                                            <Option start={2019} end={2029} />
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="cEndT" className="col-4 col-form-label col-form-label-sm">End Time</label>
                                <div className="row col-8">
                                    <div className="col-4 col-md-2">
                                        <select className="form-control form-control-sm" name="endTimeHour" id="cEndT" >
                                            <Option index={0} number={23} />
                                        </select>
                                    </div>
                                    <div className="col-4 col-md-2">
                                        <select className="form-control form-control-sm" name="endTimeMinute" >
                                            <Option index={0} number={59} />
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="cAccess" className="col-4 col-form-label col-form-label-sm">Access</label>
                                <div className="col-8 col-md-2">
                                    <select className="form-control form-control-sm" name="access" id="cAccess">
                                        <option>PUBLIC</option>
                                        <option>PRIVATE</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="cType" className="col-4 col-form-label col-form-label-sm">Type</label>
                                <div className="col-8 col-md-2">
                                    <select className="form-control form-control-sm" name="access" id="cType">
                                        <option>INDIVIDUAL</option>
                                        <option>TEAM</option>
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
                </ContestLayout>
            </>
        );
    }
}