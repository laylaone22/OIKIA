import { useContext } from 'react';
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
