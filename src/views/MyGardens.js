import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

// actions to dispatch
import { ADD_GARDEN, EDIT_GARDEN, DELETE_GARDEN } from '../stores/data/actions';

// components
import MyGardenCard from '../components/MyGardenCard.js';

// assets
import add from '../assets/icons/ui/add-1.svg';

const MyGardens = () => {
    const history = useHistory();

    // contexts
    const { userData, authToken } = useContext(authContext);
    const { dataState, dispatch } = useContext(dataContext);

    /*
    // POST new Gardens ID to BE on dataState.myGardens change
    useEffect(() => {
        console.log('myGardens View - useEffect runs on dataState.myGardens change!!');

        // take all favorites in dataState and make an array out of the IDs
        const myGardensData = { ...favoritesToPut, myFavorites: dataState.myFavorites.map(({ _id }) => _id) };

        // POST the array of myFavorite IDs
        const updateMyFavorites = async () => {
            const URL = `http://localhost:3000/users/${userData._id}`;

            const OPTIONS = {
                method: 'PUT',
                body: JSON.stringify(favoritesData),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': authToken
                }
            };

            try {
                const response = await fetch(URL, OPTIONS);
                const data = await response.json();
            } catch (error) {
                console.log(error);
            }
        };

        updateMyFavorites();

        // run every time myGardens changes
    }, [dataState.myGardens]);
*/

    const myGardensUser = [
        {
            _id: '616428b2207157d8e2235598',
            userID: '616421ca29e8480ca5f9b369',
            gardenName: 'garden berlin',
            gardenType: 'indoor',
            width: 3,
            length: 5,
            myGardenPlants: [],
            id: '616428b2207157d8e2235598',
            createdAt: '2021-10-11T12:59:34.219Z'
        },
        {
            _id: '616428b2207157d8e2235599',
            userID: '616421ca29e8480ca5f9b369',
            gardenName: 'balcony berlin',
            gardenType: 'outdoor',
            width: 5,
            length: 7,
            myGardenPlants: [],
            id: '616428b2207157d8e2235598',
            createdAt: '2021-10-11T12:59:34.219Z'
        }
    ];

    const deleteGarden = ({ garden }) => {
        console.log(garden);
        // to remove a garden we need the garden._id to filter it out of the dataState
        dispatch({ type: EDIT_GARDEN, payload: garden._id });

        const deleteMyGarden = async () => {
            const URL = `http://localhost:3000/mygardens/${garden._id}`;

            const OPTIONS = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': authToken
                }
            };

            try {
                const response = await fetch(URL, OPTIONS);
                const data = await response.json();
            } catch (error) {
                console.log(error);
            }
        };

        deleteMyGarden();
    };

    return (
        <div className="MyGardens">
            <main className="MyGardens__body">
                <header className="MyGardens__body__header">
                    <h1 className="MyGardens__body__header__title">{`Hi ${userData.name}`}</h1>
                </header>
                <h2>Your Gardens</h2>
                <section className="MyGardens__body__gardens">
                    {myGardensUser.length === 0 && <h2>Create your first garden!!</h2>}
                    {myGardensUser &&
                        myGardensUser.map((garden, i) => (
                            <MyGardenCard key={garden._id} garden={garden} delay={i} deleteGarden={deleteGarden} />
                        ))}
                </section>
                <div className="MyGardens__addGardens">
                    <img src={add} alt="add more gardens" onClick={() => history.push('/createGarden')} />
                </div>
            </main>
        </div>
    );
};

export default MyGardens;
