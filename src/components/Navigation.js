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
                    <li>
                        <NavLink to="/userdashboard" activeClassName="text-link" onClick={onClick}>
                            My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/gardeneditor" activeClassName="text-link" onClick={onClick}>
                            Garden Editor
                        </NavLink>
                    </li>

                    {/* 
                        
                        ONCE THE AUTHENTICATION IS IMPLEMENTED render only myProfile if logged in
                        the garden editor should be accessible only from the myProfile commands

                        isLoggedIn && 
                            <NavLink to="/userdashboard" className="nav-link" aria-current="page">
                                My Profile
                            </NavLink>
                        
                        */}

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

        // <nav className="navbar navbar-expand-md navbar-light bg-light">
        //     <div className="container-fluid">
        //         <NavLink to="/" className="navbar-brand">
        //             OIKIA
        //         </NavLink>

        //         <button
        //             className="navbar-toggler"
        //             type="button"
        //             data-bs-toggle="collapse"
        //             data-bs-target="#navbarSupportedContent"
        //             aria-controls="navbarSupportedContent"
        //             aria-expanded="false"
        //             aria-label="Toggle navigation"
        //         >
        //             <span className="navbar-toggler-icon"></span>
        //         </button>

        //         <div className="collapse navbar-collapse " id="navbarSupportedContent">
        //             <div className="navbar-nav me-auto mb-2 mb-lg-0">
        //                 <NavLink to="/plantcyclopedia" className="nav-link" aria-current="page">
        //                     Plantcyclopedia
        //                 </NavLink>
        //                 <NavLink to="/userdashboard" className="nav-link" aria-current="page">
        //                     My Profile
        //                 </NavLink>
        //                 <NavLink to="/gardeneditor" className="nav-link" aria-current="page">
        //                     Garden Editor
        //                 </NavLink>
        //                 {/*

        //                 ONCE THE AUTHENTICATION IS IMPLEMENTED render only myProfile if logged in
        //                 the garden editor should be accessible only from the myProfile commands

        //                 isLoggedIn &&
        //                     <NavLink to="/userdashboard" className="nav-link" aria-current="page">
        //                         My Profile
        //                     </NavLink>

        //                 */}
        //                 {isLoggedIn ? (
        //                     <NavLink to="" className="nav-link" aria-current="page" onClick={handleLogout}>
        //                         Log out
        //                     </NavLink>
        //                 ) : (
        //                     <>
        //                         <NavLink to="/signup" className="nav-link" aria-current="page">
        //                             Sign up
        //                         </NavLink>
        //                         <NavLink to="/login" className="nav-link" aria-current="page">
        //                             Log in
        //                         </NavLink>
        //                     </>
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // </nav>
    );
};

export default Navigation;
