import { useState } from 'react';
import { calculateAge } from '../utilities/helpers';

const PlantTile = ({ id, tile, handleClick, selectedFav }) => {
    // console.log(tile);
    console.log(tile && tile.plantedAt);
    console.log(tile && tile.userWatering);
    console.log(tile && calculateAge(tile.plantedAt) % tile.userWatering === 0);

    // use the calculateAge() helper to get the difference between today and the planted day
    // if the modulo of the difference is equal zero than you must water the plant
    const pleaseWaterMe = tile && calculateAge(tile.plantedAt) % tile.userWatering === 0;

    return (
        <div
            className={`Tile ${tile ? 'PlantTile' : 'EmptyTile'} ${pleaseWaterMe ? 'needsWater' : ''}`}
            onClick={() => handleClick(id)}
        >
            {tile && <img src={`http://localhost:3000${tile.plantID.icon}`} alt={`${tile.plantID.name} icon`} />}
        </div>
    );
};

export default PlantTile;
