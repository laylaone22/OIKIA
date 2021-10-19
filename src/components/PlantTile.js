import { useState } from 'react';

const PlantTile = ({ id, tile, handleClick, selectedFav }) => {
    //const [isClicked, setIsClicked] = useState(false);
    console.log(tile && tile.plant.icon);

    return (
        <div className="PlantTile" onClick={() => handleClick(id)}>
            {tile && <img src={`http://localhost:3000${tile.plant.icon}`} alt={`${tile.plant.name} icon`} />}
        </div>
    );
};

export default PlantTile;
