import { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//// views
// home & registration
import Home from './views/Home.js';
import Signup from './views/Signup.js';
import Login from './views/Login.js';
import NotFound from './views/NotFound.js';

// plant database
import Plantcyclopedia from './views/Plantcyclopedia.js';

// user dash
import UserDashboard from './views/UserDashboard.js';
import MyGardens from './views/MyGardens.js';
import MyFavorites from './views/MyFavorites.js';
import MyPlants from './views/MyPlants.js';

// garden
import GardenEditor from './views/GardenEditor.js';

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
                    <Route exact path="/mygardens">
                        {isLoggedIn ? <MyGardens /> : <Redirect to="/signup" />}
                    </Route>
                    <Route exact path="/myfavorites">
                        {isLoggedIn ? <MyFavorites /> : <Redirect to="/signup" />}
                    </Route>
                    <Route exact path="/myplants">
                        {isLoggedIn ? <MyPlants /> : <Redirect to="/signup" />}
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
