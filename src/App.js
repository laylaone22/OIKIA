import { useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// views
import Home from './views/Home.js';
import Plantcyclopedia from './views/Plantcyclopedia.js';
import UserDashboard from './views/UserDashboard.js';
import GardenEditor from './views/GardenEditor.js';
import Signup from './views/Signup.js';
import Login from './views/Login.js';
import NotFound from './views/NotFound.js';

// components
import Navigation from './components/Navigation.js';

// contexts
import { authContext } from './stores/auth/auth';
import { dataContext } from './stores/data/store';

const App = () => {
    // auth context data
    const { isLoggedIn, setIsLoggedIn, setUserData, setAuthToken } = useContext(authContext);

    // on mount store auth data in localStorage
    // use isLoggedIn for conditional rendering
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userData = localStorage.getItem('userData');
        const authToken = localStorage.getItem('authToken');
        if (isLoggedIn && userData && authToken) {
            setIsLoggedIn(JSON.parse(isLoggedIn));
            setUserData(JSON.parse(userData));
            setAuthToken(JSON.parse(authToken));
        }
    }, []);

    return (
        <BrowserRouter>
            <div className="App">
                <Navigation />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/plantcyclopedia">
                        <Plantcyclopedia />
                    </Route>
                    <Route exact path="/userdashboard">
                        {isLoggedIn ? <UserDashboard /> : <Redirect to="/signup" />}
                    </Route>
                    <Route exact path="/gardeneditor">
                        {isLoggedIn ? <GardenEditor /> : <Redirect to="/signup" />}
                    </Route>
                    <Route exact path="/signup">
                        {!isLoggedIn ? <Signup /> : <Redirect to="/" />}
                    </Route>
                    <Route exact path="/login">
                        {!isLoggedIn ? <Login /> : <Redirect to="/" />}
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
