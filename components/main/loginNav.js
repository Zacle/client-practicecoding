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
            <Logged deauthenticate={props.deauthenticate} username={props.username} />
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
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    More
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link prefetch href="/editor">
                        <a href="/editor" className="dropdown-item">Editor</a>
                    </Link>
                    <Link>
                        <a className="dropdown-item">Train</a>
                    </Link>
                    <Link>
                        <a className="dropdown-item">TODO</a>
                    </Link>
                </div>
            </li>
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
                <a className="nav-link">
                    Log out
                </a>
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