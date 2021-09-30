import { useState, useEffect } from 'react';
import PlantcyclopediaCard from '../components/PlantcyclopediaCard';

const Plantcyclopedia = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [searchResults, setSearchResults] = useState([]);
    const [noResultFound, setNoResultFound] = useState(false);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setSearchResults([]);
        setNoResultFound(false);

        const URL = `http://localhost:3000/plants?plantName=${searchTerm}`;
        console.log(URL);

        try {
            const response = await fetch(URL);
            console.log(response);
            const data = await response.json();
            console.log(data);

            setSearchResults(data);
            console.log(searchResults);

            if (data.length === 0) setNoResultFound(true);

            setSearchTerm('');
        } catch (error) {
            console.log(error);
        }
    };

    const getPlantsByType = async (type) => {
        setSearchResults([]);
        setNoResultFound(false);

        const URL = `http://localhost:3000/plants/plantcyclopedia/type/${type}`;
        console.log(URL);
        try {
            const response = await fetch(URL);
            const data = await response.json();
            console.log(data);

            setSearchResults(data);
            console.log(searchResults);

            if (data.length === 0) setNoResultFound(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="Plantcyclopedia">
            <main className="Plantcyclopedia__body">
                <header className="Plantcyclopedia__body__header">
                    <h1 className="Plantcyclopedia__body--header__title">Plantcyclopedia</h1>
                </header>
                <section className="Plantcyclopedia__body--search">
                    <form className="Plantcyclopedia__body--search__form" onSubmit={handleSubmit}>
                        <h2>Search by Name</h2>
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
                        <h2 className="Plantcyclopedia__body--searchByType__title">Search by Type</h2>

                        <div className="Plantcyclopedia__body--searchByType__cards">
                            <PlantcyclopediaCard plantType={'Fruits'} getPlantsByType={getPlantsByType} />
                            <PlantcyclopediaCard plantType={'vegetable'} getPlantsByType={getPlantsByType} />
                            <PlantcyclopediaCard plantType={'Roots'} getPlantsByType={getPlantsByType} />
                            <PlantcyclopediaCard plantType={'Herbs'} getPlantsByType={getPlantsByType} />
                        </div>
                    </section>
                </section>

                <section className="Plantcyclopedia__body--results">
                    <h2>Results</h2>
                    {noResultFound ? (
                        <h3>No results found</h3>
                    ) : (
                        searchResults.map((plant) => <h1 key={plant._id}>{plant.plantName}</h1>)
                    )}
                </section>
            </main>
        </div>
    );
};

export default Plantcyclopedia;
