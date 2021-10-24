import { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

// components
import GardenDisplay from '../components/GardenDisplay';
import FavoriteTile from '../components/FavoriteTile';
import MyPlantForm from '../components/MyPlantForm';
import LegendTile from '../components/LegendTile';

// assets
import caret from '../assets/icons/ui/caret.svg';

const GardenEditor = () => {
    // Take out the value I need (gardenID) from useParams
    const { gardenID } = useParams();
    const history = useHistory();

    // contexts
    const { userData, authToken } = useContext(authContext);
    const { dataState } = useContext(dataContext);

    // initial form state for user defined data about myPlants
    const initialState = {
        name: '', // form
        plantedAt: '', // form
        userWatering: '', // form
        notes: '', // form
        isAlive: true
    };

    // states
    // this is the fetched garden from the backend
    const [selectedGarden, setSelectedGarden] = useState({});
    const [selectedFav, setSelectedFav] = useState(undefined);
    const [isExpanded, setIsExpanded] = useState(true);
    const [myPlantData, setMyPlantData] = useState(initialState);

    // useEffect to get garden data from mongoDB on mount
    useEffect(() => {
        console.log('GardenEditor Component - useEffect fetches garden on mount!!');

        // GET the garden based on the ID
        const getGarden = async () => {
            try {
                const URL = `${process.env.REACT_APP_DB_URL}/mygardens/${gardenID}`;

                const OPTIONS = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': authToken
                    }
                };

                const response = await fetch(URL, OPTIONS);
                const data = await response.json();

                setSelectedGarden(data);
            } catch (error) {
                console.log(error);
            }
        };

        // run the fetch
        getGarden();

        // fetch on mount
    }, []);

    // handler to open and close the selectPlants
    const handleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    // handler to pass the selectedFav to the different components
    const handleSelect = (favorite) => {
        setSelectedFav(favorite);
    };

    // on submit we just collapse form and selectPlants selection
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setIsExpanded(false);
    };

    return (
        <div className="GardenEditor">
            <main className="GardenEditor__body">
                <aside className="GardenEditor__info">
                    <h1 className="GardenEditor__info__title">{selectedGarden.gardenName}</h1>
                    <div className="GardenEditor__aside__legend">
                        <LegendTile type={'LegendEmpty empty'} />
                        <LegendTile type={'LegendEmpty normal'} />
                        <LegendTile type={'LegendEmpty needsWater'} />
                        <LegendTile type={'LegendEmpty badCompanion'} />
                        <LegendTile type={'LegendEmpty isDead'} />
                    </div>
                </aside>

                <GardenDisplay
                    gardenID={gardenID}
                    selectedFav={selectedFav}
                    myPlantData={myPlantData}
                    selectedGarden={selectedGarden}
                    setSelectedGarden={setSelectedGarden}
                />

                <aside className={`GardenEditor__aside__plantSelection ${!isExpanded && 'hide'}`}>
                    <div className="GardenEditor__aside__plantSelection__header">
                        {!selectedFav ? (
                            ''
                        ) : (
                            <MyPlantForm
                                gardenID={gardenID}
                                selectedFav={selectedFav}
                                handleSubmit={handleSubmit}
                                setMyPlantData={setMyPlantData}
                                myPlantData={myPlantData}
                                initialState={initialState}
                            />
                        )}
                        <h6 className="GardenEditor__aside__plantSelection__text">
                            Click on the plant you want to place
                        </h6>
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
