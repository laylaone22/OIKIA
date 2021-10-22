const FavoriteTile = ({ id, favorite, handleSelect, selectedFav }) => {
    return (
        <div
            className={`FavoriteTile ${selectedFav && selectedFav._id === favorite._id ? 'animateSelection' : ''}`}
            onClick={() => handleSelect(favorite)}
        >
            {favorite && <img src={`${process.env.REACT_APP_DB_URL}${favorite.icon}`} alt="favorite" />}
        </div>
    );
};

export default FavoriteTile;
