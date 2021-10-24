import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

// actions to dispatch
import { SET_PLANTS, REMOVE_PLANT, EDIT_PLANT } from '../stores/data/actions';

// components
import MyPlantCard from '../components/MyPlantCard.js';

const MyPlants = () => {
    // history
    const history = useHistory();

    // contexts
    const { userData, authToken } = useContext(authContext);
    const { dataState, dispatch } = useContext(dataContext);

    // state
    const [myPlantsData, setMyPlantsData] = useState([]);
    const [isDead, setIsDead] = useState(null);

    // GET myPlants on mount
    useEffect(() => {
        console.log('myPlants View - useEffect runs on myPlantsMount!!');

        // GET the array of myPlants for the user
        const fetchMyPlants = async () => {
            const URL = `${process.env.REACT_APP_DB_URL}/users/${userData._id}/myplants`;

            const OPTIONS = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': authToken
                }
            };

            try {
                const response = await fetch(URL, OPTIONS);
                const data = await response.json();
                console.log(data);

                dispatch({ type: SET_PLANTS, payload: data });
                setMyPlantsData(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMyPlants();

        // run on mount
    }, []);

    // onClick handler to set myPlant to isAlive: false
    const handleDeath = (myPlant) => {
        //setIsDead({ isAlive: !myPlant.isAlive });
        console.log(myPlant);
        const updatedPlants = myPlantsData.map((plant) => {
            if (plant._id === myPlant._id) return { ...plant, isAlive: !plant.isAlive };
            else return plant;
        });

        setMyPlantsData(updatedPlants);

        dispatch({ type: SET_PLANTS, payload: updatedPlants });

        const updateLifeStatus = async () => {
            try {
                const URL = `${process.env.REACT_APP_DB_URL}/myplants/${myPlant._id}`;

                const OPTIONS = {
                    method: 'PUT',
                    body: JSON.stringify({ isAlive: !myPlant.isAlive }),
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': authToken
                    }
                };

                const response = await fetch(URL, OPTIONS);
                const data = await response.json();
            } catch (error) {
                console.log(error);
            }
        };

        updateLifeStatus();
    };

    // onClick handler to delete myPlant
    const handleRemove = (myPlantId) => {
        console.log(myPlantId);

        // to delete a myPlant we need the myPlantId to filter out of the dataState
        dispatch({ type: REMOVE_PLANT, payload: myPlantId });
        // 61753d2552f8d43616bdf1f5

        const deleteMyPlant = async () => {
            try {
                const URL = `${process.env.REACT_APP_DB_URL}/myplants/${myPlantId}`;

                const OPTIONS = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': authToken
                    }
                };

                const response = await fetch(URL, OPTIONS);
                const data = await response.json();
            } catch (error) {
                console.log(error);
            }
        };

        deleteMyPlant();
    };

    return (
        <div className="MyPlants">
            <main className="MyPlants__body">
                <header className="MyPlants__body__header">
                    <h1 className="MyPlants__body__header__title">Your Plants</h1>
                </header>
                <section className="MyPlants__body__plants">
                    {dataState.myPlants.map((myPlant, i) => (
                        <MyPlantCard
                            key={myPlant._id}
                            id={myPlant._id}
                            garden={myPlant.garden[0]}
                            plant={myPlant.plant[0]}
                            myPlant={myPlant}
                            delay={i}
                            handleDeath={handleDeath}
                            handleRemove={handleRemove}
                        />
                    ))}
                </section>
            </main>
        </div>
    );
};

export default MyPlants;
