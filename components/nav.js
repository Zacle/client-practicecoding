import React, { Component } from 'react';
import { 
  Navbar,
  Collapse,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container
 } from "reactstrap";
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
        dropdownOpen: false,
        isLoggedIn: false
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
        <Navbar className="navbar navbar-dark bg-dark fixed-top" light expand="md">
          <Container>
            <Link prefetch href="/">
              <NavbarBrand className="mr-auto" href="/">
                Brand Goes Here
              </NavbarBrand>
            </Link>
            <NavbarToggler onClick={this.toggleNav} />
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link prefetch href="/contests/running">
                    <NavLink href="/contests/running">
                      Contests
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link prefetch href="/">
                    <NavLink href="/">
                      Groups
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link prefetch href="/">
                    <NavLink href="/">
                      Messages
                    </NavLink>
                  </Link>
                </NavItem>
                
                <LoginNav isLoggedIn={this.state.isLoggedIn} user={{name: "zackle"}} />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
