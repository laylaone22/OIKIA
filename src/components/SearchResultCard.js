import React from 'react';

export default function SearchResultCard({ plantName, img }) {
    return (
        <section
            className="search-results__card"
            style={{
                background: `url(${img}) no-repeat center`,
                backgroundSize: 'cover'
            }}
        ></section>
    );
}
