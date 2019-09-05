import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import LoginNav from "./loginNav";


export default class extends Component {

  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
        isNavOpen: false,
        dropdownOpen: false
    };
  }

  toggleNav() {
    this.setState({
        isNavOpen: !this.state.isNavOpen
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-md fixed-top navbar-custom">
            <Link prefetch href="/">
              <a className="navbar-brand mr-auto mt-2 mt-lg-0" href="/">
                Brand Goes Here
              </a>
            </Link>
            <button className="navbar-dark navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link prefetch href="/contests/running">
                    <a className="nav-link" href="/contests/running">
                      Contests
                    </a>
                  </Link>
                </li>
                <li className="nav-item" >
                  <Link prefetch href="/groups">
                    <a className="nav-link" href="/groups">
                      Groups
                    </a>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link prefetch href="/">
                    <a className="nav-link" href="/">
                      Messages
                    </a>
                  </Link>
                </li> */}
                <LoginNav deauthenticate={this.props.deauthenticate} isLoggedIn={this.props.isLoggedIn} user={this.props.user} />
              </ul>
            </div>
        </nav>
        <style jsx>{`
            
        `}</style>
      </>
    );
  }
}
