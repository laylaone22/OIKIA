import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

// components
import Garden from './Garden';

const GardenDisplay = ({ gardenID, selectedFav, myPlantData }) => {
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
            <Garden
                selectedFav={selectedFav}
                gardenID={gardenID}
                setIsRequestedFav={setIsRequestedFav}
                myPlantData={myPlantData}
            />
        </div>
    );
};

export default GardenDisplay;
