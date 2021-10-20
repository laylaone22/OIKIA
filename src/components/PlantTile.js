import { useState } from 'react';

const PlantTile = ({ id, tile, handleClick, selectedFav }) => {
    return (
        <div className={`Tile ${tile ? 'PlantTile' : 'EmptyTile'}`} onClick={() => handleClick(id)}>
            {tile && <img src={`http://localhost:3000${tile.plant.icon}`} alt={`${tile.plant.name} icon`} />}
        </div>
    );
};

export default PlantTile;
