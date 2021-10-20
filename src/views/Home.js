import { useHistory } from 'react-router';
import { useContext, useRef, useState } from 'react';
import { authContext } from '../stores/auth/auth';

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
                            INTRO
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
                                    User Dashboard
                                </button>
                            </div>
                            <div>
                                <button className="button button__secondary">Take A Tour</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <button className="button button__primary" onClick={() => history.push('/logIn')}>
                                    Login
                                </button>{' '}
                                <button className="button button__primary" onClick={() => history.push('/signUp')}>
                                    Sign Up
                                </button>
                            </div>
                            <div>
                                <button className="button button__secondary">Take A Tour</button>
                            </div>
                        </>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Home;
