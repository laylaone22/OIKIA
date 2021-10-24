import { useState } from 'react';

// helpers
import { calculateAge } from '../utilities/helpers';
import MyPlants from '../views/MyPlants';

// components
import MyPlantCard from './MyPlantCard';

const PlantTile = ({ id, tile, handleClick, selectedFav, isMyPlantInfoOpen }) => {
    console.log(tile);
    console.log(isMyPlantInfoOpen);

    // use the calculateAge() helper to get the difference between today and the planted day
    // if the modulo of the difference is equal zero than you must water the plant
    const pleaseWaterMe = tile && calculateAge(tile.plantedAt) % tile.userWatering === 0;

    return (
        <div
            className={`Tile ${tile ? 'PlantTile' : 'EmptyTile'} ${pleaseWaterMe ? 'needsWater' : ''} ${
                tile && !tile.isAlive ? 'isDead' : ''
            }`}
            onClick={() => handleClick(id)}
        >
            {tile && (
                <img src={`${process.env.REACT_APP_DB_URL}${tile.plantID.icon}`} alt={`${tile.plantID.name} icon`} />
            )}
            {/*tile && isMyPlantInfoOpen && (
                <div className="PlantTile__miniInfo">
                    <div className="PlantTile__miniInfo__header"></div>
                </div>
            )*/}
        </div>
    );
};

export default PlantTile;
