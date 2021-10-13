import { useState } from 'react';

const PlantTile = ({ id, tile, handleClick, selectedFav }) => {
    //const [isClicked, setIsClicked] = useState(false);
    //console.log(tile);

    return (
        <div className="PlantTile" onClick={() => handleClick(id)}>
            {tile && <img src={tile.icon} alt="veggy" />}
        </div>
    );
};

export default PlantTile;
