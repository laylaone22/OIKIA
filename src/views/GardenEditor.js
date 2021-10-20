import { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

// components
import GardenDisplay from '../components/GardenDisplay';
import FavoriteTile from '../components/FavoriteTile';
import MyPlantForm from '../components/MyPlantForm';

// assets
import caret from '../assets/icons/ui/caret.svg';

const GardenEditor = () => {
    // Take out the value I need (gardenID) from useParams
    const { gardenID } = useParams();
    const history = useHistory();
    //console.log(gardenID);

    // contexts
    const { userData, authToken } = useContext(authContext);
    const { dataState } = useContext(dataContext);

    // const [selectedGarden, setSelectedGarden] = useState({});

    // // useEffect to get garden data from mongoDB on mount
    // useEffect(() => {
    //     console.log('GardenEditor Component - useEffect fetches garden on mount!!');

    //     // GET the garden based on the ID
    //     const getGarden = async () => {
    //         const URL = `http://localhost:3000/mygardens/${gardenID}`;

    //         const OPTIONS = {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'x-auth-token': authToken
    //             }
    //         };

    //         try {
    //             const response = await fetch(URL, OPTIONS);
    //             const data = await response.json();

    //             setSelectedGarden(data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     // run the fetch
    //     getGarden();

    //     // fetch on mount
    // }, []);

    // states

    const [selectedFav, setSelectedFav] = useState(undefined);
    const [isExpanded, setIsExpanded] = useState(true);

    const handleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const handleSelect = (favorite) => {
        setSelectedFav(favorite);
        //console.log(selectedFav);

        //setExpandFav(!expandFav);
        //console.log(expandFav);
    };

    return (
        <div className="GardenEditor">
            <main className="GardenEditor__body">
                {/* <header className="GardenEditor__body__header">
                    <h1 className="GardenEditor__body--header__title">GardenEditor</h1>
                </header> */}

                <GardenDisplay gardenID={gardenID} selectedFav={selectedFav} />

                <aside className={`GardenEditor__aside__plantSelection ${!isExpanded && 'hide'}`}>
                    <div className="GardenEditor__aside__plantSelection__header">
                        {!selectedFav ? '' : <MyPlantForm gardenID={gardenID} selectedFav={selectedFav} />}
                        <h6>Click on the plant you want to place</h6>
                    </div>

                    <div className="GardenEditor__selectPlants">
                        {dataState.myFavorites.map((favorite, i) => (
                            <FavoriteTile
                                key={i}
                                favorite={favorite}
                                handleSelect={handleSelect}
                                selectedFav={selectedFav}
                            />
                        ))}
                    </div>
                </aside>

                <div className="GardenEditor__selectPlants__expand">
                    <img
                        src={caret}
                        alt="expand-collapse favorites list"
                        onClick={handleExpanded}
                        className={`icon__info ${isExpanded && 'flip'}`}
                    />
                </div>
            </main>
        </div>
    );
};

export default GardenEditor;
