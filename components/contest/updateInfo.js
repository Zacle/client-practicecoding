import React from 'react';
import Option from '../option';
import Link from 'next/link';


const UpdateContestInfo = ({contest, id}) => {

    return (
        <>
            <br />
            <h2>Update Contest Info</h2>
            <hr />
            <div className="container">
                <form>
                    <div className="form-group row">
                        <label htmlFor="contestName" className="col-4 col-form-label col-form-label-sm">Name</label>
                        <div className="col-8 col-md-4">
                            <input type="text" className="form-control form-control-sm" name="name" id="contestName" placeholder="Contest Name" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="cStartD" className="col-4 col-form-label col-form-label-sm">Start Date</label>
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
                        <label htmlFor="cStartT" className="col-4 col-form-label col-form-label-sm">Start Time</label>
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
                        <label htmlFor="cEndD" className="col-4 col-form-label col-form-label-sm">End Date</label>
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
                        <label htmlFor="cEndT" className="col-4 col-form-label col-form-label-sm">End Time</label>
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
                        <label htmlFor="cAccess" className="col-4 col-form-label col-form-label-sm">Access</label>
                        <div className="col-8 col-md-2">
                            <select className="form-control form-control-sm" name="access" id="cAccess">
                                <option>PUBLIC</option>
                                <option>PRIVATE</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="cType" className="col-4 col-form-label col-form-label-sm">Type</label>
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
                </form>
            </div>
            <br />
            <h3>Update Contest Problems</h3>
            <hr />
            <div className="container">
                <div className="row justify-content-center">
                    <Link href="/contests[id]/specific" as={`/contests/${id}/specific`}><a href={`/contests/${id}/specific`}>Add a Specific Problem</a></Link>
                    <Link href="/contests[id]/codeforcescontest" as={`/contests/${id}/codeforcescontest`}><a href={`/contests/${id}/codeforcescontest`}>Add problems from a Codeforces Contest</a></Link>
                    <Link href="/contests[id]/uvacontest" as={`/contests/${id}/uvacontest`}><a href={`/contests/${id}/uvacontest`}>Add problems from a Uva Contest</a></Link>
                    <Link href="/contests[id]/existingcontest" as={`/contests/${id}/existingcontest`}><a href={`/contests/${id}/existingcontest`}>Add problems from an Existing Contest</a></Link>
                </div>
            </div>
        </>
    );
}

export default UpdateContestInfo;