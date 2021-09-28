import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">
                    OIKIA
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                        <NavLink to="/plantcyclopedia" className="nav-link" aria-current="page">
                            Plantcyclopedia
                        </NavLink>
                        <NavLink to="/userdashboard" className="nav-link" aria-current="page">
                            My Profile
                        </NavLink>
                        <NavLink to="/gardeneditor" className="nav-link" aria-current="page">
                            Garden Editor
                        </NavLink>
                        <NavLink to="/signup" className="nav-link" aria-current="page">
                            Sign up
                        </NavLink>
                        <NavLink to="/login" className="nav-link" aria-current="page">
                            Log in
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
