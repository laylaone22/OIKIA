import { useState } from 'react';

const PlantTile = ({ id, tile, handleClick, selectedFav }) => {
    //console.log(tile);
    return (
        <div className={`Tile ${tile ? 'PlantTile' : 'EmptyTile'}`} onClick={() => handleClick(id)}>
            {tile && <img src={`http://localhost:3000${tile.plantID.icon}`} alt={`${tile.plantID.name} icon`} />}
        </div>
    );
};

export default PlantTile;
