import { useState } from 'react';

const FavoriteTile = ({ id, favorite, handleSelect }) => {
    //const [isClicked, setIsClicked] = useState(false);
    console.log(favorite);

    return (
        <div className="FavoriteTile" onClick={() => handleSelect(favorite)}>
            {favorite && <img src={favorite.icon} alt="favorite" />}
        </div>
    );
};

export default FavoriteTile;
