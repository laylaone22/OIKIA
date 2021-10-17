import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

// actions to dispatch
import { REMOVE_FAVORITE } from '../stores/data/actions';

// components
import MyFavoriteCard from '../components/MyFavoriteCard.js';

// assets
import add from '../assets/icons/ui/add-1.svg';

const MyFavorites = () => {
    const history = useHistory();

    // contexts
    const { userData, authToken } = useContext(authContext);
    const { dataState, dispatch } = useContext(dataContext);

    // state
    const [favoritesToPut, setFavoritesToPut] = useState({ myFavorites: [] });

    // PUT favorites ID to BE on dataState.myFavorites change
    useEffect(() => {
        console.log('myFavorites View - useEffect runs on dataState.myFav change!!');
        // take all favorites in dataState and make an array out of the IDs
        const favoritesData = { ...favoritesToPut, myFavorites: dataState.myFavorites.map(({ _id }) => _id) };

        // POST the array of myFavorite IDs
        const updateMyFavorites = async () => {
            const URL = `http://localhost:3000/users/${userData._id}`;

            const OPTIONS = {
                method: 'PUT',
                body: JSON.stringify(favoritesData),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': authToken
                }
            };

            try {
                const response = await fetch(URL, OPTIONS);
                const data = await response.json();
            } catch (error) {
                console.log(error);
            }
        };

        updateMyFavorites();

        // run every time myFavorites changes
    }, [dataState.myFavorites]);

    // removeFavorites happens in the MyFavoriteCard:
    // dispatches to dataState
    // set favorites IDs to send to BE

    const removeFavorite = (plant) => {
        // to remove favorite we need the plant._id to filter it out of the dataState
        dispatch({ type: REMOVE_FAVORITE, payload: plant._id });

        // set favoritesToPut state for the useEffect to PUT them
        const favoritesData = { ...favoritesToPut, myFavorites: dataState.myFavorites.map(({ _id }) => _id) };
        setFavoritesToPut(favoritesData);
    };

    return (
        <div className="MyFavorites">
            <main className="MyFavorites__body">
                <header className="MyFavorites__body__header">
                    <h1 className="MyFavorites__body__header__title">{`Hi ${userData.name}`}</h1>
                </header>
                <h2>Your Favorite Plants</h2>
                <section className="MyFavorites__body__favorites">
                    {dataState.myFavorites.length === 0 && <h2>Add some plants to your favorites</h2>}
                    {dataState.myFavorites.map((favorite, i) => (
                        <MyFavoriteCard
                            key={favorite._id}
                            favorite={favorite}
                            delay={i}
                            removeFavorite={removeFavorite}
                        />
                    ))}
                </section>
            </main>
            <div className="MyFavorites__addFavorites">
                <img src={add} alt="add more favorites" onClick={() => history.push('/plantcyclopedia')} />
            </div>
        </div>
    );
};

export default MyFavorites;
