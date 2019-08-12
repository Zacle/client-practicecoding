import React from "react";
import { NavItem, 
    NavLink,
    UncontrolledDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu 
} from "reactstrap";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const LoginNav = (props) => {

    if (props.isLoggedIn) {
        return(
            <Logged deauthenticate={props.deauthenticate} username={props.user.username} />
        );
    }
    else {
        return (
            <NotLogged />
        );
    }
}

const Logged = ({username, deauthenticate}) => {
    
    return (
        <>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  More
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem className="dropdown-item">
                        <Link prefetch href="/editor">
                            <a className="dropdown-item" href="/editor">Editor</a>
                        </Link>
                    </DropdownItem>
                    <DropdownItem className="dropdown-item">
                        <Link prefetch href="/train">
                            <a className="dropdown-item">Train</a>
                        </Link>
                    </DropdownItem>
                    <DropdownItem className="dropdown-item">
                        <Link href="/">
                            <a className="dropdown-item">TODO</a>
                        </Link>
                    </DropdownItem>
                    <DropdownItem className="dropdown-item">
                        <Link prefetch href="/settings">
                            <a href="/settings" className="dropdown-item">Settings</a>
                        </Link>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            <li className="nav-item">
                <Link prefetch href="/">
                    <a className="nav-link" href="/">
                        <FontAwesomeIcon icon="bell" size="lg"></FontAwesomeIcon>
                    </a>
                </Link>
            </li>
            <li className="nav-item">
                <Link prefetch href="/profile/[username]" as={`/profile/${username}`}>
                    <a className="nav-link" href={`/profile/${username}`}>
                        {username}
                    </a>
                </Link>
            </li>
            <li onClick={deauthenticate} className="nav-item">
                <Link href="/">
                    <a className="nav-link">
                        Log out
                    </a>
                </Link>
            </li>
        </>
    );
}

const NotLogged = () => {
    
    return (
        <>
            <li className="nav-item">
                <Link prefetch href="/login">
                    <a className="nav-link" href="/login">
                        Login
                    </a>
                </Link>
            </li>
            <li className="nav-item">
                <Link prefetch href="/register">
                    <a className="nav-link" href="/register">
                        Register
                    </a>
                </Link>
            </li>
        </>
    );
}

export default LoginNav;