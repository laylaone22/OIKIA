import { useState, useContext } from 'react';
import { useHistory } from 'react-router';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

// actions to dispatch
import { ADD_GARDEN } from '../stores/data/actions';

const CreateGarden = () => {
    const history = useHistory();

    // contexts
    const { userData, authToken } = useContext(authContext);
    const { dispatch } = useContext(dataContext);

    // initial state for the form
    const initialState = {
        userID: userData._id,
        gardenName: '',
        gardenType: '',
        width: '',
        length: ''
    };

    // states
    const [gardenData, setGardenData] = useState(initialState);
    const [isGardenCreated, setIsGardenCreated] = useState(false);
    const [gardenToAdd, setGardenToAdd] = useState(null);

    // change handler for the form
    const handleChange = ({ target: { name, value } }) => setGardenData({ ...gardenData, [name]: value });

    // handleSubmit POSTs the new garden to mongoDB and dispatches to dataState and localStorage
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setGardenData(initialState);
        setIsGardenCreated(false);

        try {
            const URL = `${process.env.REACT_APP_DB_URL}/mygardens`;

            const OPTIONS = {
                method: 'POST',
                body: JSON.stringify(gardenData),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': authToken
                }
            };

            const response = await fetch(URL, OPTIONS);
            const data = await response.json();

            // set local state to render the name of the garden
            setGardenToAdd(data);

            // dispatch to dataState with the new garden
            dispatch({ type: ADD_GARDEN, payload: data });

            if (response.ok) {
                // if the creation is successful set state to true to render a message for the user
                setIsGardenCreated(true);

                // after 2 seconds go to myGardens
                setTimeout(() => {
                    history.push('/mygardens');
                }, 2000);
            } else {
                // 400 status codes are not errors with fetch
                const error = new Error('Garden creation failed');
                error.error = data.error;
                throw error;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="CreateGarden">
            <main className="CreateGarden__body">
                <header className="CreateGarden__body__header">
                    <h1 className="CreateGarden__body__header__title">Create Your Garden</h1>
                </header>

                <section>
                    <form className="CreateGarden__body--form" onSubmit={handleSubmit}>
                        <label htmlFor="gardenName" className="CreateGarden__body--form__label">
                            <input
                                type="text"
                                id="gardenName"
                                name="gardenName"
                                placeholder="Garden Name"
                                autoFocus
                                required
                                value={gardenData.gardenName}
                                onChange={handleChange}
                                className="CreateGarden__body--form__input"
                            />
                        </label>

                        <label htmlFor="gardenType" className="CreateGarden__body--form__label">
                            <select
                                name="gardenType"
                                id="gardenType"
                                required
                                defaultValue=""
                                className="CreateGarden__body--form__input"
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Choose a Placement
                                </option>
                                <option value="outdoor">Outdoor</option>
                                <option value="indoor">Indoor</option>
                            </select>
                        </label>

                        <label htmlFor="width" className="CreateGarden__body--form__label">
                            <input
                                type="number"
                                id="width"
                                name="width"
                                min="1"
                                max="10"
                                placeholder="Width"
                                required
                                value={gardenData.width}
                                onChange={handleChange}
                                className="CreateGarden__body--form__input"
                            />
                        </label>
                        <label htmlFor="length" className="CreateGarden__body--form__label">
                            <input
                                type="number"
                                id="length"
                                name="length"
                                placeholder="Length"
                                min="1"
                                max="10"
                                required
                                value={gardenData.length}
                                onChange={handleChange}
                                className="CreateGarden__body--form__input"
                            />
                        </label>

                        <div className="CreateGarden__body--search__form__buttons">
                            <button
                                type="reset"
                                className="button button__secondary"
                                onClick={() => setGardenData(initialState)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="button button__primary">
                                Create
                            </button>
                        </div>
                    </form>
                    {isGardenCreated && <h3>{`${gardenToAdd.gardenName} was created!!`}</h3>}
                </section>
            </main>
        </div>
    );
};

export default CreateGarden;
