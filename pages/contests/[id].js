import React, { Component } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import InGroupLayout from '../../components/contest/inContestLayout';


class Home extends Component {

    constructor(props) {
        super(props);

        this.id = props.router.query.id;
        this.name = "Test";
        this.owner = "zhack";
        this.start = "24/07/2019";
        this.duration = "2 hours";
        this.registrants = 200;
    }

    render () {
        const title = "Test Contest Name | Practice Coding OJ";
        const description = "Contest on Practice Coding OJ";
        
        return (
            <>
                <br />
                <InGroupLayout id={this.id} title={title} description={description}>
                    <br /><br />
                    <div className="container">
                        <table className="table table-bordered table-responsive-sm text-center">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Contest Name</th>
                                    <th>Contest Owner</th>
                                    <th>Start</th>
                                    <th>Duration</th>
                                    <th>Registrants</th>
                                    <th>Standing</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.name}</td>
                                    <td>{this.owner}</td>
                                    <td>{this.start}</td>
                                    <td>{this.duration}</td>
                                    <td><Link prefetch href="/contests/[id]/registrants" as={`/contests/${this.id}/registrants`}><a href={`/contests/${this.id}/registrants`}>{this.registrants}</a></Link></td>
                                    <td><Link prefetch href="/contests/[id]/standing" as={`/contests/${this.id}/standing`}><a href={`/contests/${this.id}/standing`}>Standing</a></Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </InGroupLayout>
            </>
        );
    }
}

export default withRouter(Home);