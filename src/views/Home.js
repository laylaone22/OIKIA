import { useContext, useState } from 'react';
import { useHistory } from 'react-router';

// contexts
import { authContext } from '../stores/auth/auth';

// assets
import Plantcyclopedia from '../assets/img/Plantcyclopedia.png';
import Favorites from '../assets/img/Favorites.png';
import GardenOverview from '../assets/img/gardenView.png';
import MyGardens from '../assets/img/yourGardens.png';

const Home = () => {
    const history = useHistory();
    // auth
    const { isLoggedIn } = useContext(authContext);

    //states
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="Home">
            <main className="Home__body">
                <header className="Home__body__header">
                    <h1 className="Home__body--header__title">
                        Oops!
                        <br /> I <span>Killed</span>
                        <br /> It Again
                    </h1>
                </header>
                <section className="Home__body">
                    <div className="Home__body--text">
                        <h2>The answer to saving all your little friends.</h2>
                        <p>
                            OIKIA is all about collecting, organizing, and adding all kinds of information on your
                            little plant-friends. <br />
                            <br />
                            How much water do they need? <br />
                            During which seasons do they grow? <br />
                            When are they dormant? <br />
                            Do they require lots of sun? <br />
                            <br />
                            Basically, creating your own garden plant database in a visual way.
                        </p>
                    </div>
                    {isLoggedIn ? (
                        <>
                            <div className="Home__body__takeATour_buttons">
                                <button className="button button__secondary" onClick={handleExpanded}>
                                    Take A Tour
                                </button>
                            </div>
                            <div className={`Tour__body ${!isExpanded && 'hide'}`}>
                                <div className="Tour__body__section text-right">
                                    <h3 className="Tour__body__section--text ">
                                        Find out all the information you need about your plants
                                    </h3>
                                    <img
                                        className="Tour__body__section--img img-left"
                                        src={Plantcyclopedia}
                                        alt="Plant information database"
                                    />
                                </div>

                                <div className="Tour__body__section text-left">
                                    <h3 className="Tour__body__section--text ">
                                        Keep track of all the plants you love, for now or later
                                    </h3>
                                    <img
                                        className="Tour__body__section--img img-right"
                                        src={Favorites}
                                        alt="list of plants"
                                    />
                                </div>

                                <div className="Tour__body__section text-right">
                                    <h3 className="Tour__body__section--text ">See your gardens at a glance</h3>
                                    <img
                                        className="Tour__body__section--img img-left"
                                        src={MyGardens}
                                        alt="My gardens list"
                                    />
                                </div>

                                <div className="Tour__body__section text-left">
                                    <h3 className="Tour__body__section--text ">Visualize your garden</h3>
                                    <img
                                        className="Tour__body__section--img img-right"
                                        src={GardenOverview}
                                        alt="Garden editor"
                                    />
                                </div>
                            </div>
                            <div className="Home__body__callAction_myProfile">
                                <button
                                    className="button button__primary"
                                    onClick={() => history.push('/userdashboard')}
                                >
                                    My Profile
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="Home__body__takeATour_buttons">
                                <button className="button button__secondary" onClick={handleExpanded}>
                                    Take A Tour
                                </button>
                            </div>
                            <div className={`Tour__body ${!isExpanded && 'hide'}`}>
                                <div className="Tour__body__section text-right">
                                    <h3 className="Tour__body__section--text ">
                                        Find out all the information you need about your plants
                                    </h3>
                                    <img
                                        className="Tour__body__section--img img-left"
                                        src={Plantcyclopedia}
                                        alt="Plant information database"
                                    />
                                </div>

                                <div className="Tour__body__section text-left">
                                    <h3 className="Tour__body__section--text ">
                                        Keep track of all the plants you love, for now or later
                                    </h3>
                                    <img
                                        className="Tour__body__section--img img-right"
                                        src={Favorites}
                                        alt="list of plants"
                                    />
                                </div>

                                <div className="Tour__body__section text-right">
                                    <h3 className="Tour__body__section--text ">See your gardens at a glance</h3>
                                    <img
                                        className="Tour__body__section--img img-left"
                                        src={MyGardens}
                                        alt="My gardens list"
                                    />
                                </div>

                                <div className="Tour__body__section text-left">
                                    <h3 className="Tour__body__section--text ">Visualize your garden</h3>
                                    <img
                                        className="Tour__body__section--img img-right"
                                        src={GardenOverview}
                                        alt="Garden editor"
                                    />
                                </div>
                            </div>
                            <div className="Home__body__callAction_buttons">
                                <button className="button button__primary" onClick={() => history.push('/logIn')}>
                                    Login
                                </button>
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
