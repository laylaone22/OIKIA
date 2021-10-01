import { useState } from 'react';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper-bundle.css';

// components
import PlantcyclopediaCard from '../components/PlantcyclopediaCard';
import SearchResultCard from '../components/SearchResultCard';

SwiperCore.use([Navigation, Pagination]);

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
                        <h2 className="Plantcyclopedia__body--search__title">Search by Name</h2>
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
                            <Swiper
                                tag="div"
                                spaceBetween={16}
                                slidesPerView={2.5}
                                //navigation
                                pagination={{ clickable: true }}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                            >
                                <SwiperSlide key={'fruits'}>
                                    <PlantcyclopediaCard plantType={'fruits'} getPlantsByType={getPlantsByType} />
                                </SwiperSlide>
                                <SwiperSlide key={'vegetables'}>
                                    <PlantcyclopediaCard plantType={'vegetables'} getPlantsByType={getPlantsByType} />
                                </SwiperSlide>
                                <SwiperSlide key={'roots'}>
                                    <PlantcyclopediaCard plantType={'roots'} getPlantsByType={getPlantsByType} />
                                </SwiperSlide>
                                <SwiperSlide key={'herbs'}>
                                    <PlantcyclopediaCard plantType={'herbs'} getPlantsByType={getPlantsByType} />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </section>
                </section>

                <section className="Plantcyclopedia__body--results">
                    <h2 className="Plantcyclopedia__body--results__title">Results</h2>
                    {noResultFound ? (
                        <h3>No results found</h3>
                    ) : (
                        searchResults.map((plant) => {
                            console.log(plant);
                            return <SearchResultCard key={plant._id} plantName={plant.plantName} img={plant.img} />;
                        })
                    )}
                </section>
            </main>
        </div>
    );
};

export default Plantcyclopedia;
