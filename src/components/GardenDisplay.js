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

const GardenDisplay = ({ gardenID, selectedFav }) => {
    const history = useHistory();

    // contexts
    const { userData, authToken } = useContext(authContext);
    const { dataState } = useContext(dataContext);

    // states

    const [expandFav, setExpandFav] = useState(false);
    // state to force user selecting a favorite
    const [isRequestedFav, setIsRequestedFav] = useState(true);

    return (
        <div className="GardenDisplay">
            {/* <header className="GardenDisplay__body__header">
                <h1 className="GardenDisplay__body--header__title">GardenEditor</h1>
            </header> */}

            {/* <Garden selectedFav={selectedFav} gardenID={gardenID} selectedGarden={selectedGarden} /> */}
            <Garden selectedFav={selectedFav} gardenID={gardenID} setIsRequestedFav={setIsRequestedFav} />
        </div>
    );
};

export default GardenDisplay;
