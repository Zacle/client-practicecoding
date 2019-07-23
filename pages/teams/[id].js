import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/main/layout';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';


class Team extends Component {

    constructor (props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
        activeTab: '1'
        };

        this.members = props.members || [];
        this.name = props.name || "Test Name";
        this.date = props.router.query.id;
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render () {
        const title = "Test Team Name | Practice Coding OJ";

        const map = this.members.map((member) => {
            return (
                <li key={member._id}>
                    <Link prefetch href="/profile/[username]" as={`/profile/${member.username}`}><a>{member.username}</a></Link>
                </li>
            );
        });

        return (
            <>
                <Layout title={title}>
                    <br /><br /><br />
                    <div className="container">
                        <div className="justify-content-center offset-md-3 col-md-7 offset-md-2">
                            <h4>Invite a user</h4>
                            <hr/>
                            <form>
                                <div className="form-group row">
                                    <label htmlFor="username" className="col-4 col-md-3 col-form-label col-form-label-sm">Username</label>
                                    <div className="col-8 col-md-4">
                                        <input type="text" className="form-control form-control-sm" name="name" id="username" placeholder="Username" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-4 col-md-3"></div>
                                    <div className="col-8 col-md-4">
                                        <button type="button" className="btn btn-primary col-8 col-md-5">Invite</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br /> <br />
                    <div className="container">
                        <div className="justify-content-center offset-md-3 col-md-6 offset-md-2">
                            <div className="card text-center">
                                <div className="card-header">
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                                                    onClick={() => { this.toggle('1'); }}>
                                                Info
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                                                    onClick={() => { this.toggle('2'); }}>
                                                Members
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>
                                <div className="card-body">
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="1">
                                            <div className="row justify-content-left">
                                                <div className="col-4">Name</div>
                                                <div className="col-8">{this.name}</div>
                                            </div>
                                            <div className="row justify-content-left">
                                                <div className="col-4">Created on</div>
                                                <div className="col-8">{this.date}</div>
                                            </div>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <div className="row justify-content-center">
                                                {map}
                                            </div>
                                        </TabPane>
                                    </TabContent>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </>
        );
    }
}

export default withRouter(Team);


