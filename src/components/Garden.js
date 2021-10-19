import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

import EmptyTile from './EmptyTile';
import PlantTile from './PlantTile';

const Garden = ({ selectedFav, gardenID, selectedGarden }) => {
    const history = useHistory();

    // contexts
    const { userData, authToken } = useContext(authContext);
    const { dataState } = useContext(dataContext);

    const gardenBerlin = {
        _id: '616428b2207157d8e2235598',
        userID: '616421ca29e8480ca5f9b369',
        gardenName: 'Balcony',
        gardenType: 'outdoor',
        width: 10,
        length: 5,
        myGardenPlants: [],
        id: '616428b2207157d8e2235598'
    };

    const [garden, setGarden] = useState(gardenBerlin);
    const [renderedGarden, setRenderedGarden] = useState([]);
    //const [selectedGarden, setSelectedGarden] = useState({});

    /*
    // useEffect to get garden data from mongoDB on mount
    useEffect(() => {
        console.log('GardenDisplay Component - useEffect fetches garden on mount!!');

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
                console.log(data);
                setSelectedGarden(data);
                console.log(selectedGarden);
            } catch (error) {
                console.log(error);
            }
        };

        // run the fetch
        getGarden();

        // fetch on mount
    }, []);
*/
    const setArea = () => {
        //console.log(selectedGarden.length);
        const gardenArea = Number(selectedGarden.width) * Number(selectedGarden.length);
        console.log(gardenArea);

        // if no plants
        if (!selectedGarden.myGardenPlants || selectedGarden?.myGardenPlants?.length === 0) {
            const emptyGarden = new Array(gardenArea).fill(null);

            setRenderedGarden(emptyGarden);
        }

        // if plants
        if (selectedGarden.myGardenPlants && selectedGarden.myGardenPlants?.length !== 0) {
            const emptyGarden = new Array(gardenArea).fill(null);

            const filledGarden = emptyGarden.map((tile, i) => {
                for (const myPlant of garden.myGardenPlants) {
                    if (i === myPlant.position) return myPlant;
                }
                return tile;
            });

            setRenderedGarden(filledGarden);
        }
    };

    useEffect(() => {
        //setArea();

        const gardenCopy = { ...selectedGarden };
        console.log(gardenCopy);
    }, []);

    const handleClick = (id) => {
        const copySelectedFav = { ...selectedFav, position: id };

        const copyGarden = {
            ...garden,
            myGardenPlants: [...garden.myGardenPlants, copySelectedFav]
        };

        setGarden(copyGarden);
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
