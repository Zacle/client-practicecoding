import React, { Component } from 'react';
import { withRouter } from 'next/router';
import InGroupLayout from '../../components/group/inGroupLayout';

class Home extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
    }

    render() {
        const title = "Group Test";
        return (
            <>
                <br />
                <InGroupLayout title={title} id={this.id}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="offset-md-4 col-4 col-md-3">Name: </div>
                            <div className="col-8 col-md-5">{this.id}</div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="offset-md-4 col-4 col-md-3">Description: </div>
                            <div className="col-8 col-md-5">{this.id}</div>
                        </div>
                        <div className="offset-md-4 offset-2 row">
                            <div className="card w-50 text-center">
                                <div className="card-header">Membership Management</div>
                                <div className="card-body">
                                    <p className="card-text">You are not group member yet, but can request group join.</p>
                                    <button className="btn btn-primary">Join</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </InGroupLayout>
            </>
        );
    }
}

export default withRouter(Home);