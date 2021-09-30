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


                        

                        <Swiper
                            tag="div"
                            className="Plantcyclopedia__body--searchByType__cards"
                            spaceBetween={0}
                            slidesPerView={1.5}
                            //navigation
                            pagination={{ clickable: true }}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            <SwiperSlide key={'Fruits'}>
                                <PlantcyclopediaCard plantType={'Fruits'} getPlantsByType={getPlantsByType} />
                            </SwiperSlide>
                            <SwiperSlide key={'vegetable'}>
                                <PlantcyclopediaCard plantType={'vegetable'} getPlantsByType={getPlantsByType} />
                            </SwiperSlide>
                            <SwiperSlide key={'Roots'}>
                                <PlantcyclopediaCard plantType={'Roots'} getPlantsByType={getPlantsByType} />
                            </SwiperSlide>
                            <SwiperSlide key={'Herbs'}>
                                <PlantcyclopediaCard plantType={'Herbs'} getPlantsByType={getPlantsByType} />
                            </SwiperSlide>
                        </Swiper>

                    </section>
                </section>

                <section className="Plantcyclopedia__body--results">
                    <h2>Results</h2>

                    <div className="Plantcyclopedia__body--resultCards">
                        <SearchResultCard
                            plantName="Brocolli"
                            img="https://www.beingdad.in/wp-content/uploads/2020/07/broccoli-1200x628-facebook-1200x628.jpg"
                        />
                        <SearchResultCard
                            plantName="Bean"
                            img="https://www.southernexposure.com/media/products/originals/mccaslan-snap-pole-bean-f2c1daf8f9d1600b92990b8f5b2a3ea0.jpg"
                        />
                        <SearchResultCard
                            plantName="Caulifower"
                            img="https://d2fft7k2ovfi2e.cloudfront.net/images/plants/9/85741e8d87badbf541130f56a4bb95ed/facebook/cauliflower_high_2-85741e8d87badbf541130f56a4bb95ed.jpg"
                        />
                    </div>

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
