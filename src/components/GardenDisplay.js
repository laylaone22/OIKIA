import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

// components
import Garden from './Garden';

const GardenDisplay = ({ gardenID, selectedFav, myPlantData, selectedGarden, setSelectedGarden }) => {
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
            <Garden
                selectedFav={selectedFav}
                selectedGarden={selectedGarden}
                setSelectedGarden={setSelectedGarden}
                gardenID={gardenID}
                setIsRequestedFav={setIsRequestedFav}
                myPlantData={myPlantData}
            />
        </div>
    );
};

export default GardenDisplay;
