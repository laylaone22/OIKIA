import { useContext } from 'react';

// contexts
import { authContext } from '../stores/auth/auth.js';
import { dataContext } from '../stores/data/store';

// assets
import enter from '../assets/icons/ui/enter-dark.png';

const UserDashboard = () => {
    // context auth data
    const { userData } = useContext(authContext);

    return (
        <div className="UserDashboard">
            <main className="UserDashboard__body">
                <header className="UserDashboard__body__header">
                    <h1 className="UserDashboard__body__header__title">{`Hi ${userData.name}`}</h1>
                </header>
                <section className="UserDashboard__body__dashboard">
                    <section className="UserDashboard__body__dashboard__gardens">
                        <h2>Your Gardens</h2>

                        <div className="UserDashboard__body__dashboard__display">
                            <h3>You created:</h3>
                            <h4>0 gardens</h4>
                            <img src={enter} alt="enter icon" />;
                        </div>
                    </section>
                    <section className="UserDashboard__body__dashboard__plants">
                        <h2>Your Plants</h2>

                        <div className="UserDashboard__body__dashboard__display">
                            <h3>You added:</h3>
                            <h4>0 plants</h4>
                            <img src={enter} alt="enter icon" />;
                        </div>
                    </section>
                    <section className="UserDashboard__body__dashboard__favorites">
                        <h2>Your Favorites</h2>

                        <div className="UserDashboard__body__dashboard__display">
                            <h3>You liked:</h3>
                            <h4>0 plants</h4>
                            <img src={enter} alt="enter icon" />;
                        </div>
                    </section>
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;
