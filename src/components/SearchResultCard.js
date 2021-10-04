import { useState } from 'react';

export default function SearchResultCard({ plantName, img }) {
    const [favorite, setFavorite] = useState(false);

    function changeFavorite() {
        setFavorite(!favorite);
    }

    return (
        <section
            className="search-results__card"
            style={{
                backgroundImage: `url(${img})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}
        >
            <div className="search-results__card--header">
                <h3 className="search-results__card--header__plantName">{plantName}</h3>
                <img
                    className="search-results__icons icon__add"
                    alt="svgImg"
                    src="https://img.icons8.com/material-outlined/24/000000/info.png"
                />
            </div>

            <div className="search-results__icons-group">
                {!favorite ? (
                    <img
                        onClick={changeFavorite}
                        className="search-results__icons"
                        alt="Heart outline symbol"
                        src="https://img.icons8.com/plasticine/100/000000/like--v2.png"
                    />
                ) : (
                    <img
                        onClick={changeFavorite}
                        className="search-results__icons"
                        alt="Heart outline symbol"
                        src="https://img.icons8.com/plasticine/100/000000/like--v1.png"
                    />
                )}

                <img
                    className="search-results__icons"
                    alt="Add symbol"
                    src="https://img.icons8.com/ios/50/000000/add--v1.png"
                />
            </div>
        </section>
    );
}
