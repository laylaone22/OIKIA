import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

// components
import Garden from './Garden';
import FavoriteTile from './FavoriteTile';

//icons

import frost from '../assets/icons/infoCard/frost.svg';
import fullSun from '../assets/icons/infoCard/fullSun.svg';
import lowSun from '../assets/icons/infoCard/lowSun.svg';

const GardenDisplay = ({ gardenID, selectedGarden }) => {
    console.log(selectedGarden);
    const history = useHistory();

    // contexts
    const { userData, authToken } = useContext(authContext);
    const { dataState } = useContext(dataContext);

    // states

    const [selectedFav, setSelectedFav] = useState({});

    // sim data
    const favorites = [
        {
            plantID: '123456780',
            plantName: 'tomato',
            icon: frost
        },
        {
            plantID: '123456781',
            plantName: 'lettuce',
            icon: fullSun
        },
        {
            plantID: '123456782',
            plantName: 'asparagus',
            icon: lowSun
        }
    ];

    const handleSelect = (favorite) => {
        setSelectedFav(favorite);
    };

    return (
        <div className="GardenDisplay">
            <header className="GardenDisplay__body__header">
                <h1 className="GardenDisplay__body--header__title">GardenEditor</h1>
            </header>

            <Garden selectedFav={selectedFav} gardenID={gardenID} selectedGarden={selectedGarden} />

            <div className="GardenDisplay__selectPlants">
                {dataState.myFavorites.map((favorite, i) => (
                    <FavoriteTile key={i} favorite={favorite} handleSelect={handleSelect} />
                ))}
            </div>
            <button className="button button_secondary">+</button>
        </div>
    );
};

export default GardenDisplay;
