import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

// actions to dispatch
import { DELETE_GARDEN } from '../stores/data/actions';

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

    const deleteGarden = (garden) => {
        // to delete a garden we need the garden._id to filter it out of the dataState
        dispatch({ type: DELETE_GARDEN, payload: garden._id });

        const deleteMyGarden = async () => {
            try {
                const URL = `${process.env.REACT_APP_DB_URL}/mygardens/${garden._id}`;

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

        deleteMyGarden();
    };

    return (
        <div className="MyGardens">
            <main className="MyGardens__body">
                <header className="MyGardens__body__header">
                    <h1 className="MyGardens__body__header__title">Your Gardens</h1>
                </header>

                <section className="MyGardens__body__gardens">
                    {(!dataState.myGardens || dataState.myGardens.length === 0) && <h2>Create your first garden!!</h2>}
                    {dataState.myGardens &&
                        dataState.myGardens.map((garden, i) => (
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
