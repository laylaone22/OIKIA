import { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

// components
import GardenDisplay from '../components/GardenDisplay';

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

    return (
        <div className="GardenEditor">
            <main className="GardenEditor__body">
                {/* <header className="GardenEditor__body__header">
                    <h1 className="GardenEditor__body--header__title">GardenEditor</h1>
                </header> */}
                {/* <GardenDisplay gardenID={gardenID} selectedGarden={selectedGarden} /> */}
                <GardenDisplay gardenID={gardenID} />
            </main>
        </div>
    );
};

export default GardenEditor;
