import { useContext } from 'react';
import { useHistory } from 'react-router';

// contexts
import { authContext } from '../stores/auth/auth.js';
import { dataContext } from '../stores/data/store';

// assets
import click from '../assets/icons/ui/click.svg';

const UserDashboard = () => {
    // history
    const history = useHistory();

    // context auth data
    const { userData } = useContext(authContext);
    const { dataState } = useContext(dataContext);

    return (
        <div className="UserDashboard">
            <main className="UserDashboard__body">
                <header className="UserDashboard__body__header">
                    <h1 className="UserDashboard__body__header__title">{`Hi ${userData.name}`}</h1>
                </header>
                <section className="UserDashboard__body__dashboard">
                    <section
                        className="UserDashboard__body__dashboard__favorites"
                        onClick={() => history.push('/myfavorites')}
                    >
                        <div className="UserDashboard__body__dashboard__display">
                            <h2>Your Favorites</h2>
                            <div>
                                <h3>You selected:</h3>
                                <h4>{`${dataState.myFavorites.length} plants`}</h4>
                            </div>
                            <div className="display__icon">
                                <img src={click} alt="enter icon" />
                            </div>
                        </div>
                    </section>
                    <section
                        className="UserDashboard__body__dashboard__gardens"
                        onClick={() => history.push('/mygardens')}
                    >
                        <div className="UserDashboard__body__dashboard__display">
                            <h2>Your Gardens</h2>
                            <div>
                                <h3>You created:</h3>
                                <h4>{`${dataState.myGardens.length} gardens`}</h4>
                            </div>

                            <div className="display__icon">
                                <img src={click} alt="enter icon" />
                            </div>
                        </div>
                    </section>
                    <section
                        className="UserDashboard__body__dashboard__plants"
                        onClick={() => history.push('/myplants')}
                    >
                        <div className="UserDashboard__body__dashboard__display">
                            <h2>Your Plants</h2>
                            <div>
                                <h3>You added:</h3>
                                <h4>{`${dataState.myPlants.length} plants`}</h4>
                            </div>

                            <div className="display__icon">
                                <img src={click} alt="enter icon" />
                            </div>
                        </div>
                    </section>
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;
