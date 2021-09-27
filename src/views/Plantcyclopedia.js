import { useState } from 'react';

const Plantcyclopedia = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [searchResults, setSearchResults] = useState([]);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        console.log(evt);
        // try {
        //     const response = await fetch('URL');
        //     const data = await response.json();

        //     setSearchTerm('');
        // } catch (error) {
        //     console.log(error);
        // }
    };

    return (
        <div className="Plantcyclopedia">
            <main className="Plantcyclopedia__body">
                <header className="Plantcyclopedia__body__header">
                    <h1 className="Plantcyclopedia__body--header__title">Plantcyclopedia</h1>
                </header>
                <section className="Plantcyclopedia__body--search">
                    <form className="Plantcyclopedia__body--search__form" onSubmit={handleSubmit}>
                        <h2>Search by name</h2>
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
                        <h2>Search by type</h2>
                    </section>
                </section>

                <section className="Plantcyclopedia__body--results">
                    <h2>Results</h2>
                </section>
            </main>
        </div>
    );
};

export default Plantcyclopedia;
