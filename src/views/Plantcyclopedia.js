import { useState, useContext, useEffect } from 'react';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

// actions to dispatch
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../stores/data/actions';

// components
import PlantcyclopediaCard from '../components/PlantcyclopediaCard';
import SearchResultCard from '../components/SearchResultCard';

const Plantcyclopedia = () => {
    // contexts
    const { userData, authToken } = useContext(authContext);
    const { dataState, dispatch } = useContext(dataContext);

    // state
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [noResultFound, setNoResultFound] = useState(false);
    const [selected, setSelected] = useState('');
    const [favoritesToPut, setFavoritesToPut] = useState({ myFavorites: [] });

    // PUT favorites ID to BE on dataState.myFavorites change
    useEffect(() => {
        console.log('PlantCyclopedia View - useEffect runs on dataState.myFav change!!');
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

    // fetch plants based on name
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        // resets before fetching
        setSearchResults([]);
        setNoResultFound(false);
        setSelected('');

        // fetch from this URL
        const URL = `http://localhost:3000/plants?plantName=${searchTerm}`;

        try {
            const response = await fetch(URL);
            const data = await response.json();

            // backend returns an empty array if no results
            // so we need to set the no results to true
            if (data.length === 0) setNoResultFound(true);

            // take all favorites in dataState and make an array out of the IDs
            const favoritesIDs = dataState.myFavorites.map(({ _id }) => _id);

            // now check the search results against the favoritesIDs
            // add a boolean to render isFavorite
            const dataWithFavorites = data.map((result) => {
                return favoritesIDs.includes(result._id)
                    ? { ...result, isFavorite: true }
                    : { ...result, isFavorite: false };
            });

            setSearchResults(dataWithFavorites);

            // reset after fetching
            setSearchTerm('');
        } catch (error) {
            console.log(error);
        }
    };

    // fetch plants based on the type category
    const getPlantsByType = async (type) => {
        // resets before fetching
        setSearchResults([]);
        setNoResultFound(false);
        setSelected(type);

        // fetch from this URL
        const URL = `http://localhost:3000/plants/plantcyclopedia/type/${type}`;

        try {
            const response = await fetch(URL);
            const data = await response.json();

            // backend returns an empty array if no results
            // so we need to set the no results to true
            if (data.length === 0) setNoResultFound(true);

            // take all favorites in dataState and make an array out of the IDs
            const favoritesIDs = dataState.myFavorites.map(({ _id }) => _id);

            // now check the search results against the favoritesIDs
            // add a boolean to render isFavorite
            const dataWithFavorites = data.map((result) => {
                return favoritesIDs.includes(result._id)
                    ? { ...result, isFavorite: true }
                    : { ...result, isFavorite: false };
            });

            setSearchResults(dataWithFavorites);
        } catch (error) {
            console.log(error);
        }
    };

    // toggleFavorites happens in the resultCard:
    // changes isFavorite
    // dispatches to dataState
    // set favorites IDs to send to BE

    const toggleFavorite = (plant) => {
        // map the search results and toggle isFavorite for the plant you pass
        const updatedSearchResults = searchResults.map((result) => {
            return result._id === plant._id ? { ...result, isFavorite: !result.isFavorite } : result;
        });

        // based on isFavorite dispatch to reducer
        // to add a favorite we need the whole plant object (render in myFavorites view)
        // to remove favorite we need the plant._id to filter it out of the dataState
        !plant.isFavorite
            ? dispatch({ type: ADD_FAVORITE, payload: plant })
            : dispatch({ type: REMOVE_FAVORITE, payload: plant._id });

        // set favoritesToPut state for the useEffect to PUT them
        const favoritesData = { ...favoritesToPut, myFavorites: dataState.myFavorites.map(({ _id }) => _id) };
        setFavoritesToPut(favoritesData);

        // now update the searchResults state
        setSearchResults(updatedSearchResults);
    };

    return (
        <div className="Plantcyclopedia">
            <main className="Plantcyclopedia__body">
                <header className="Plantcyclopedia__body__header">
                    <h1 className="Plantcyclopedia__body--header__title">Plantcyclopedia</h1>
                </header>
                <section className="Plantcyclopedia__body--search">
                    <form className="Plantcyclopedia__body--search__form" onSubmit={handleSubmit}>
                        {/* <h2 className="Plantcyclopedia__body--search__title">Search by Name</h2> */}
                        <label htmlFor="searchWord" className="Plantcyclopedia__body--search__form__label">
                            <input
                                className="Plantcyclopedia__body--search__form__input"
                                type="text"
                                name="searchWord"
                                id="searchWord"
                                placeholder="Search for plants"
                                value={searchTerm}
                                onChange={(evt) => setSearchTerm(evt.target.value)}
                            />
                            <button type="submit" className="Plantcyclopedia__body--search__form__button">
                                <img src="https://img.icons8.com/cotton/64/000000/search--v2.png" alt="search icon" />
                            </button>
                        </label>
                    </form>
                    <section className="Plantcyclopedia__body--searchByType">
                        {/* <h2 className="Plantcyclopedia__body--searchByType__title">Search by Type</h2> */}
                        <div className="Plantcyclopedia__body--searchByType__cards">
                            <PlantcyclopediaCard
                                plantType={'fruits'}
                                getPlantsByType={getPlantsByType}
                                selected={selected === 'fruits'}
                            />
                            <PlantcyclopediaCard
                                plantType={'vegetables'}
                                getPlantsByType={getPlantsByType}
                                selected={selected === 'vegetables'}
                            />
                            <PlantcyclopediaCard
                                plantType={'roots'}
                                getPlantsByType={getPlantsByType}
                                selected={selected === 'roots'}
                            />
                            <PlantcyclopediaCard
                                plantType={'herbs'}
                                getPlantsByType={getPlantsByType}
                                selected={selected === 'herbs'}
                            />
                        </div>
                    </section>
                </section>

                <section className="Plantcyclopedia__body--results">
                    {noResultFound ? (
                        <h3 className="noResults">No results found</h3>
                    ) : (
                        searchResults.map((plant, i) => {
                            return (
                                <SearchResultCard
                                    key={plant._id}
                                    plant={plant}
                                    delay={i}
                                    toggleFavorite={toggleFavorite}
                                />
                            );
                        })
                    )}
                </section>
            </main>
        </div>
    );
};

export default Plantcyclopedia;
