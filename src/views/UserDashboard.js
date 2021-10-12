import { useContext } from 'react';
import { useHistory } from 'react-router';

// contexts
import { authContext } from '../stores/auth/auth.js';
import { dataContext } from '../stores/data/store';

// assets
import enter from '../assets/icons/ui/enter-dark.png';

const UserDashboard = () => {
    // history
    const history = useHistory();

    // context data
    const { userData, isLoggedIn, authToken } = useContext(authContext);
    const { dataState } = useContext(dataContext);

    return (
        <div className="UserDashboard">
            <main className="UserDashboard__body">
                <header className="UserDashboard__body__header">
                    <h1 className="UserDashboard__body__header__title">{`Hi ${dataState.name}`}</h1>
                </header>
                <section className="UserDashboard__body__dashboard">
                    <section
                        className="UserDashboard__body__dashboard__gardens"
                        onClick={() => history.push('/mygardens')}
                    >
                        <h2>Your Gardens</h2>

                        <div className="UserDashboard__body__dashboard__display">
                            <h3>You created:</h3>
                            <h4>{`${!dataState.myGardens ? 0 : dataState.myGardens.length} gardens`}</h4>
                            <img src={enter} alt="enter icon" />;
                        </div>
                    </section>
                    <section
                        className="UserDashboard__body__dashboard__plants"
                        onClick={() => history.push('/myplants')}
                    >
                        <h2>Your Plants</h2>

                        <div className="UserDashboard__body__dashboard__display">
                            <h3>You added:</h3>
                            <h4>{`${!dataState.myPlants ? 0 : dataState.myPlants.length} plants`}</h4>
                            <img src={enter} alt="enter icon" />;
                        </div>
                    </section>
                    <section
                        className="UserDashboard__body__dashboard__favorites"
                        onClick={() => history.push('/myfavorites')}
                    >
                        <h2>Your Favorites</h2>

                        <div className="UserDashboard__body__dashboard__display">
                            <h3>You liked:</h3>
                            <h4>{`${!dataState.myFavorites ? 0 : dataState.myFavorites.length} plants`}</h4>
                            <img src={enter} alt="enter icon" />;
                        </div>
                    </section>
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;
