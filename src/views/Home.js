import { useHistory } from 'react-router';
import { useContext, useRef, useState } from 'react';
import { authContext } from '../stores/auth/auth';

import Plantcyclopedia from '../assets/img/Plantcyclopedia.png';
import Favorites from '../assets/img/Favorites.png';
import GardenOverview from '../assets/img/GardenOverview.png';
import MyGardens from '../assets/img/MyGardens.png';

const Home = () => {
    const history = useHistory();
    const [isExpanded, setIsExpanded] = useState(false);
    const { isLoggedIn, setIsLoggedIn, setUserData, setAuthToken } = useContext(authContext);
    const handleExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className="Home">
            <main className="Home__body">
                <header className="Home__body__header">
                    <h1 className="Home__body--header__title">
                        Oops!
                        <br /> I Killed
                        <br /> It Again
                    </h1>
                </header>
                <section className="Home__body">
                    <div className="Home__body--text">
                        <h2>
                            The answer to saving all your little friends.
                            {/* OIKIA Plant APP is all about collecting, organizing, and adding all kinds of information of
                            your little friends(Plants). How much water does it need? During which seasons does it grow?
                            When is it dormant? Does it require lots of sun? Basically, creating your own garden plant
                            database in a visual way. */}
                        </h2>
                    </div>
                    {isLoggedIn ? (
                        <>
                            <div>
                                <button
                                    className="button button__primary"
                                    onClick={() => history.push('/userdashboard')}
                                >
                                    My Profile
                                </button>
                            </div>
                            <div>
                                <button className="button button__secondary">Take A Tour</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <button className="button button__secondary" onClick={handleExpanded}>
                                    Take A Tour
                                </button>
                            </div>
                            <div className={`Tour__body ${!isExpanded && 'hide'}`}>
                                <div className="Tour__body__section">
                                    <img
                                        className="Tour__body__section--img img-left"
                                        src={Plantcyclopedia}
                                        alt="Plant information database"
                                    />
                                    <h3 className="Tour__body__section--text text-right">
                                        Find out all the information you need about your plants
                                    </h3>
                                </div>

                                <div className="Tour__body__section">
                                    <h3 className="Tour__body__section--text text-left">
                                        Keep track of all the plants you love, for now or later
                                    </h3>
                                    <img
                                        className="Tour__body__section--img img-right"
                                        src={Favorites}
                                        alt="list of plants"
                                    />
                                </div>

                                <div className="Tour__body__section">
                                    <img
                                        className="Tour__body__section--img img-left"
                                        src={MyGardens}
                                        alt="My gardens list"
                                    />
                                    <h3 className="Tour__body__section--text text-right">
                                        See your gardens at a glance
                                    </h3>
                                </div>

                                <div className="Tour__body__section">
                                    <h3 className="Tour__body__section--text text-left">Visualise your garden</h3>
                                    <img
                                        className="Tour__body__section--img img-right"
                                        src={GardenOverview}
                                        alt="Garden editor"
                                    />
                                </div>
                            </div>
                            <div>
                                <button className="button button__primary" onClick={() => history.push('/logIn')}>
                                    Login
                                </button>{' '}
                                <button className="button button__primary" onClick={() => history.push('/signUp')}>
                                    Sign Up
                                </button>
                            </div>
                        </>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Home;
