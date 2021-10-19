import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

import EmptyTile from './EmptyTile';
import PlantTile from './PlantTile';

const Garden = ({ selectedFav, gardenID, setIsRequestedFav }) => {
    const history = useHistory();

    // contexts
    const { userData, authToken } = useContext(authContext);
    const { dataState } = useContext(dataContext);

    // sim data
    const tomatoGarden = {
        createdAt: '2021-10-19T09:38:52.347Z',
        gardenName: 'tomato garden',
        gardenType: 'outdoor',
        id: '616e922cc77fe03a3931966d',
        length: 4,
        myGardenPlants: [],
        updatedAt: '2021-10-19T09:38:52.347Z',
        userID: '61681fb473ea9c74e11a3139',
        width: 3,
        __v: 0,
        _id: '616e922cc77fe03a3931966d'
    };

    // this is the fetched garden from the backend
    const [selectedGarden, setSelectedGarden] = useState({});
    // this is the garden we render e.g. [null, {plant1}, null, null]
    const [renderedGarden, setRenderedGarden] = useState([]);
    //const [garden, setGarden] = useState(selectedGarden);

    // useEffect to get garden data from mongoDB on mount
    useEffect(() => {
        console.log('GardenEditor Component - useEffect fetches garden on mount!!');

        // GET the garden based on the ID
        const getGarden = async () => {
            const URL = `http://localhost:3000/mygardens/${gardenID}`;

            const OPTIONS = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': authToken
                }
            };

            try {
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

    useEffect(() => {
        console.log('Garden Component - useEffect runs on selectedGarden changes!!');
        const setArea = () => {
            // calculate the area of the garden based on width and length
            const area = Number(selectedGarden.width) * Number(selectedGarden.length);

            // if no plants in myGardenPlants create and empty garden and render it
            if (selectedGarden.myGardenPlants && selectedGarden.myGardenPlants.length === 0) {
                const emptyGarden = new Array(area).fill(null);
                setRenderedGarden(emptyGarden);
                //console.log(renderedGarden);
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
                //console.log(renderedGarden);
            }
        };

        setArea();
    }, [selectedGarden]);

    const handleClick = (id) => {
        if (!selectedFav) setIsRequestedFav(false);
        const copySelectedFav = { ...selectedFav, position: id };

        const myPlantData = {
            userID: userData._id,
            gardenID: gardenID,
            plant: selectedFav,
            name: 'John the tomato',
            plantedAt: '09/09/2021',
            personalWatering: 3,
            position: id
        };
        console.log(myPlantData);
        // dispatch should filter for gardenID in myGardens
        // copy myGardenPlants of that garden
        // add the myPlant to it
        const toDataState = {};

        //console.log(toDispatch);
        // dispatch({type: ADD_PLANT, payload: userID, plantID, position})

        // const copyGarden = {
        //     ...selectedGarden,
        //     myGardenPlants: [...selectedGarden.myGardenPlants, copySelectedFav]
        // };

        const copyGarden = {
            ...selectedGarden,
            myGardenPlants: [...selectedGarden.myGardenPlants, myPlantData]
        };

        console.log(copyGarden);

        setSelectedGarden(copyGarden);
        console.log(selectedGarden);
        //setRenderedGarden(copyGarden);
        // console.log(garden);
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
