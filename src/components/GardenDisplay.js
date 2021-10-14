import { useState, useContext } from 'react';
import { dataContext } from '../stores/data/store';

// components
import Garden from './Garden';
import FavoriteTile from './FavoriteTile';

//icons

import frost from '../assets/icons/infoCard/frost.svg';
import fullSun from '../assets/icons/infoCard/fullSun.svg';
import lowSun from '../assets/icons/infoCard/lowSun.svg';

const GardenDisplay = () => {
    const { dataState } = useContext(dataContext);
    const [selectedFav, setSelectedFav] = useState({});

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
            <Garden selectedFav={selectedFav} />
            <div className="GardenDisplay__selectPlants">
                {favorites.map((favorite, i) => (
                    <FavoriteTile key={i} favorite={favorite} handleSelect={handleSelect} />
                ))}
            </div>
            <button>+</button>
        </div>
    );
};

export default GardenDisplay;
