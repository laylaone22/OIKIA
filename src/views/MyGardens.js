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

    // state
    const [myGardensData, setMyGardenData] = useState([]);

    // load gardens on mount
    useEffect(() => {
        console.log('myGardens View - useEffect runs on dataState.myGardens change!!');

        // GET the array of myFavorite IDs
        const loadMyGardens = async () => {
            const URL = `http://localhost:3000/users/${userData._id}/mygardens`;

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
                setMyGardenData(data);
            } catch (error) {
                console.log(error);
            }
        };

        loadMyGardens();

        // run only on mount
    }, []);

    const deleteGarden = (garden) => {
        //console.log(garden);
        // to delete a garden we need the garden._id to filter it out of the dataState
        //dispatch({ type: DELETE_GARDEN, payload: garden._id });

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
                    {myGardensData.length === 0 && <h2>Create your first garden!!</h2>}
                    {myGardensData &&
                        myGardensData?.map((garden, i) => (
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
