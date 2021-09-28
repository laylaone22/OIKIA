import { BrowserRouter, Switch, Route } from 'react-router-dom';

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

const App = () => {
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
                        <UserDashboard />
                    </Route>
                    <Route exact path="/gardeneditor">
                        <GardenEditor />
                    </Route>
                    <Route exact path="/signup">
                        <Signup />
                    </Route>
                    <Route exact path="/login">
                        <Login />
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
