import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

// actions
import { ADD_PLANT, REMOVE_PLANT } from '../stores/data/actions';

// components
import PlantTile from './PlantTile';

const Garden = ({ selectedFav, gardenID, setIsRequestedFav, myPlantData }) => {
    const history = useHistory();

    // contexts
    const { userData, authToken } = useContext(authContext);
    const { dataState, dispatch } = useContext(dataContext);

    // states
    // this is the fetched garden from the backend
    const [selectedGarden, setSelectedGarden] = useState({});
    // this is the garden we render e.g. [null, {plant1}, null, null]
    const [renderedGarden, setRenderedGarden] = useState([]);
    // this is to open and close the myPlantInfo display
    const [isMyPlantInfoOpen, setIsMyPlantInfoOpen] = useState(false);

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

    // useEffect to re-render the garden on any change of myGarden (selectedGarden)
    useEffect(() => {
        console.log('Garden Component - useEffect runs on selectedGarden changes!!');
        const setArea = () => {
            // calculate the area of the garden based on width and length
            const area = Number(selectedGarden.width) * Number(selectedGarden.length);

            // if no plants in myGardenPlants create and empty garden and render it
            if (selectedGarden.myGardenPlants && selectedGarden.myGardenPlants.length === 0) {
                const emptyGarden = new Array(area).fill(null);
                setRenderedGarden(emptyGarden);
            }

            // if plants in myGardenPlants create and empty garden and render it
            if (selectedGarden.myGardenPlants && selectedGarden.myGardenPlants?.length !== 0) {
                const emptyGarden = new Array(area).fill(null);

                const filledGarden = emptyGarden.map((tile, i) => {
                    // myPlant is the plant ("John the tomato") we will have in myGarden
                    for (const myPlant of selectedGarden.myGardenPlants) {
                        if (i === myPlant.position) return myPlant;
                    }
                    return tile;
                });

                setRenderedGarden(filledGarden);
            }
        };

        setArea();
    }, [selectedGarden]);

    const handleClick = (id) => {
        if (!selectedFav) setIsRequestedFav(false);

        // the tiles are null when empty thus undefined
        // when you click on an empty tile the selectedGarden.myGardenPlants[i] of that tile is undefined
        // therefore if empty (null) put the new myPlant in the tile

        if (!renderedGarden[id]) {
            // ADD_PLANT to dataState
            const myPlantDataToReducer = {
                ...myPlantData,
                userID: userData._id,
                plantID: { ...selectedFav },
                gardenID: gardenID,
                position: id
            };

            // POST new plant to myPlants DB
            const myPlantDataToDB = {
                ...myPlantData,
                userID: userData._id,
                plantID: selectedFav._id,
                gardenID: gardenID,
                position: id
            };

            const copyGarden = {
                ...selectedGarden,
                myGardenPlants: [...selectedGarden.myGardenPlants, myPlantDataToReducer]
            };

            setSelectedGarden(copyGarden);

            // the function takes the data for the reducer and database and updates
            const updateMyGardenPlants = async () => {
                try {
                    const URL = `${process.env.REACT_APP_DB_URL}/myplants`;

                    const OPTIONS = {
                        method: 'POST',
                        body: JSON.stringify(myPlantDataToDB),
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': authToken
                        }
                    };

                    const response = await fetch(URL, OPTIONS);
                    const data = await response.json();
                    console.log(data);
                    // // set local state to render the name of the garden
                    // setGardenToAdd(data);

                    // dispatch to dataState with the new garden
                    dispatch({ type: ADD_PLANT, payload: data });

                    if (response.ok) {
                        // if the creation is successful set state to true to render a message for the user
                        console.log('success!!');
                    } else {
                        // 400 status codes are not errors with fetch
                        const error = new Error('Plant creation failed');
                        error.error = data.error;
                        throw error;
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            // don't forget to call the update!!
            updateMyGardenPlants();

            // if the tile is not empty then do something else
        } else setIsMyPlantInfoOpen(!isMyPlantInfoOpen);
    };

    return (
        <div
            className="Garden"
            style={{
                gridTemplateColumns: `repeat(${Number(selectedGarden.width)}, 5rem)`,
                gridTemplateRows: `repeat(${Number(selectedGarden.length)}, 5rem)`
            }}
        >
            {renderedGarden.map((tile, i) => (
                <PlantTile key={i} id={i} tile={tile} handleClick={handleClick} selectedFav={selectedFav} />
            ))}
        </div>
    );
};

export default Garden;
