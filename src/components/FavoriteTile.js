import { useState } from 'react';

const FavoriteTile = ({ id, favorite, handleSelect, selectedFav }) => {
    //console.log(selectedFav._id === favorite._id);

    return (
        <div
            className={`FavoriteTile ${selectedFav && selectedFav._id === favorite._id ? 'animateSelection' : ''}`}
            onClick={() => handleSelect(favorite)}
        >
            {favorite && <img src={`https://safe-crag-23600.herokuapp.com${favorite.icon}`} alt="favorite" />}
        </div>
    );
};

export default FavoriteTile;
