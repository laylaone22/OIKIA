import { useState } from 'react';

const Plantcyclopedia = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="Plantcyclopedia">
            <div className="Plantcyclopedia__gradient"></div>
            <main className="Plantcyclopedia__body">
                <header className="Plantcyclopedia__body__header">
                    <h1 className="Plantcyclopedia__body--header__title">Plantcyclopedia</h1>
                </header>
                <section className="Plantcyclopedia__body--search">
                    <form className="Plantcyclopedia__body--search__form">
                        <label htmlFor="searchWord" className="Plantcyclopedia__body--search__form__label">
                            Search by name
                        </label>
                        <input
                            type="text"
                            name="searchWord"
                            id="searchWord"
                            className="Plantcyclopedia__body--search__form__input"
                            placeholder="Search for plants"
                        />
                    </form>
                    <section className="Plantcyclopedia__body--searchByType">
                        <h2>search by type</h2>
                    </section>
                </section>

                <section className="Plantcyclopedia__body--results">
                    <h2>results</h2>
                </section>
            </main>
        </div>
    );
};

export default Plantcyclopedia;
