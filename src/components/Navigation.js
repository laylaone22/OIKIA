import { useContext, useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

import NavigationHandler from '../utilities/NavigationHandler';

const Navigation = () => {
    // dropdown logic
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = NavigationHandler(dropdownRef, false);
    const onClick = () => {
        setIsActive(!isActive);
    };

    // auth context data
    const { isLoggedIn, setIsLoggedIn, setUserData, setAuthToken } = useContext(authContext);

    // useHistory to redirect when needed
    const history = useHistory();

    // logout logic
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        setUserData({ userName: '' });
        setAuthToken('');
        history.push('/');
    };

    return (
        <div className="Navigation">
            <div className="Navigation-logo">
                <div>
                    <div
                        className="navbar-brand"
                        onClick={() => {
                            history.push('/');
                        }}
                    >
                        OIKIA
                    </div>
                </div>
                <div>
                    <div className={`Menu-btn ${isActive ? 'open' : ''}`} onClick={onClick}>
                        <div className="Menu-btn__burger"></div>
                    </div>
                </div>
            </div>
            <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                <ul>
                    <li>
                        <NavLink to="/plantcyclopedia" activeClassName="text-link" onClick={onClick}>
                            Plantcyclopedia
                        </NavLink>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <NavLink to="/userdashboard" className="nav-link" aria-current="page" onClick={onClick}>
                                My Profile
                            </NavLink>
                        </li>
                    )}

                    {isLoggedIn ? (
                        <>
                            <li>
                                <NavLink to="" activeClassName="text-link" aria-current="page" onClick={handleLogout}>
                                    Log out
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/signup" activeClassName="text-link" onClick={onClick}>
                                    Sign up
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/login" activeClassName="text-link" onClick={onClick}>
                                    Log in
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navigation;
