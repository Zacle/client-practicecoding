import React from "react";
import { NavItem, 
    NavLink,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu 
} from "reactstrap";
import Link from 'next/link';

const LoginNav = (props) => {

    if (props.isLoggedIn) {
        return(
            <Logged user={props.user} />
        );
    }
    else {
        return (
            <NotLogged />
        );
    }
}

const Logged = ({user}) => {
    
    return (
        <>
            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav caret>
                More
                </DropdownToggle>
                <DropdownMenu>
                <DropdownItem>
                    <Link>
                    <a className="text-muted font-weight-bold">Editor</a>
                    </Link>
                </DropdownItem>
                <DropdownItem>
                    <Link>
                    <a className="text-muted font-weight-bold">Train</a>
                    </Link>
                </DropdownItem>
                <DropdownItem>
                    <Link>
                    <a className="text-muted font-weight-bold">TODO</a>
                    </Link>
                </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <NavItem>
                <Link prefetch href="/">
                    <NavLink href="/">
                        <FontAwesomeIcon icon="bell" size="lg"></FontAwesomeIcon>
                    </NavLink>
                </Link>
            </NavItem>
            <NavItem>
                <Link prefetch href="/">
                    <NavLink href="/">
                        {user.name}
                    </NavLink>
                </Link>
            </NavItem>
            <NavItem>
                <Link prefetch href="/">
                    <NavLink href="/">
                        Log out
                    </NavLink>
                </Link>
            </NavItem>
        </>
    );
}

const NotLogged = () => {
    
    return (
        <>
            <NavItem>
                <Link prefetch href="/login">
                    <NavLink href="/login">
                        Login
                    </NavLink>
                </Link>
            </NavItem>
            <NavItem>
                <Link prefetch href="/register">
                    <NavLink href="/register">
                        Register
                    </NavLink>
                </Link>
            </NavItem>
        </>
    );
}

export default LoginNav;