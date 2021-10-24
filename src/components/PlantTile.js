import { useState } from 'react';

// helpers
import { calculateAge } from '../utilities/helpers';
import MyPlants from '../views/MyPlants';

// components
import MyPlantCard from './MyPlantCard';

const PlantTile = ({ id, tile, handleClick, selectedFav }) => {
    console.log(tile);

    // use the calculateAge() helper to get the difference between today and the planted day
    // if the modulo of the difference is equal zero than you must water the plant
    const pleaseWaterMe = tile && calculateAge(tile.plantedAt) % tile.userWatering === 0;

    return (
        <>
            {/* <MyPlantCard
                key={myPlant._id}
                id={myPlant._id}
                
                plant={tile.plantID}
                
                handleDeath={handleDeath}
                handleRemove={handleRemove}
            /> */}
            <div
                className={`Tile ${tile ? 'PlantTile' : 'EmptyTile'} ${pleaseWaterMe ? 'needsWater' : ''}`}
                onClick={() => handleClick(id)}
            >
                {tile && (
                    <img
                        src={`${process.env.REACT_APP_DB_URL}${tile.plantID.icon}`}
                        alt={`${tile.plantID.name} icon`}
                    />
                )}
            </div>
        </>
    );
};

export default PlantTile;
