import { useState, useEffect, useContext } from 'react';
import { dataContext } from '../stores/data/store';

import EmptyTile from './EmptyTile';
import PlantTile from './PlantTile';

// //icons
// import carrot from '../assets/1_carrot.svg';
// import lettuce from '../assets/2_lettuce.svg';
// import asparagus from '../assets/18_asparagus.svg';
// import goji from '../assets/82_gojiberry.svg';

//import asparagus from '../assets/asparagus.png';

const Garden = ({ selectedFav }) => {
    const { dataState } = useContext(dataContext);
    //console.log(selectedFav);

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

    const [position, setPosition] = useState(null);
    const [garden, setGarden] = useState(gardenBerlin);
    const [renderedGarden, setRenderedGarden] = useState([]);

    useEffect(() => {
        const gardenArea = garden.width * garden.length;

        // if no plants
        if (garden.myGardenPlants.length === 0) {
            const emptyGarden = new Array(gardenArea).fill(null);
            console.log(emptyGarden);
            setRenderedGarden(emptyGarden);
        }

        // if plants
        if (garden.myGardenPlants.length !== 0) {
            const emptyGarden = new Array(gardenArea).fill(null);

            const filledGarden = emptyGarden.map((tile, i) => {
                for (const myPlant of garden.myGardenPlants) {
                    if (i === myPlant.position) return myPlant;
                }
                return tile;
            });

            setRenderedGarden(filledGarden);
        }
    }, [garden]);

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
                gridTemplateColumns: `repeat(${garden.width}, 5rem)`,
                gridTemplateRows: `repeat(${garden.length}, 5rem)`
            }}
        >
            {renderedGarden.map((tile, i) => (
                <PlantTile key={i} id={i} tile={tile} handleClick={handleClick} selectedFav={selectedFav} />
            ))}
        </div>
    );
};

export default Garden;
