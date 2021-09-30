import React from 'react';

export default function SearchResultCard({ plantName, img }) {
    function changeFavorite(e) {
        e.target.setAttribute('src', 'https://img.icons8.com/plasticine/100/000000/like--v1.png');
        e.target.setAttribute('alt', 'heart filled symbol');
    }
    return (
        <section
            className="search-results__card"
            style={{
                background: `url(${img}) no-repeat center`,
                backgroundSize: 'cover'
            }}
        >
            <div>
                <p>
                    {plantName}{' '}
                    <img
                        className="search-results__icons icon__add"
                        alt="svgImg"
                        src="https://img.icons8.com/material-outlined/24/000000/info.png"
                    />
                </p>
            </div>

            <div className="search-results__icons-group">
                <img
                    onClick={changeFavorite}
                    className="search-results__icons"
                    alt="Heart outline symbol"
                    src="https://img.icons8.com/plasticine/100/000000/like--v2.png"
                />
                <img
                    className="search-results__icons"
                    alt="Add symbol"
                    src="https://img.icons8.com/ios/50/000000/add--v1.png"
                />
            </div>
        </section>
    );
}
