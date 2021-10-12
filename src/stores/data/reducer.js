import { v4 as uuid } from 'uuid';
import { useEffect, useContext } from 'react';

// actions
import {
    ADD_FAVORITE,
    REMOVE_FAVORITE,
    ADD_PLANT,
    REMOVE_PLANT,
    ADD_GARDEN,
    EDIT_GARDEN,
    DELETE_GARDEN,
    RESTORE_STATE
} from './actions';

const dataReducer = (state, action) => {
    console.log('reducer do stuff');
    switch (action.type) {
        // logic for adding favorites to users
        case ADD_FAVORITE:
            console.log('reducer renders ADD_FAVORITE');
            console.log(state.myFavorites);
            const newState = { ...state, myFavorites: [...state.myFavorites, action.payload] };

            const toPut = {
                myFavorites: state.myFavorites
            };

            console.log(toPut);

            const putFavorites = async () => {
                try {
                    const res = await fetch('http://localhost:3000/users/616459826f27fd986abeaf1d', {
                        method: 'PUT',
                        body: JSON.stringify(toPut),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const data = await res.json();
                    console.log(res.ok);
                } catch (error) {
                    console.log(error);
                }
            };

            //putFavorites();

            return newState;

        // logic for removing favorites from users
        case REMOVE_FAVORITE:
            console.log('reducer renders REMOVE_FAVORITE');
            console.log(state.myFavorites);
            return {
                ...state,
                myFavorites: state.myFavorites.filter((fav) => {
                    console.log(fav);
                    return fav !== action.payload;
                })
            };

        // logic for adding plants to users
        case ADD_PLANT:
            console.log('reducer renders ADD_PLANT');
            return { ...state, myPlants: [...state.myPlants, action.payload] };

        // logic for removing plants from users
        case REMOVE_PLANT:
            console.log('reducer renders REMOVE_PLANT');
            return { ...state, myPlants: state.myPlants.filter((plant) => plant._id !== action.payload) };

        // logic for adding gardens to users
        case ADD_GARDEN:
            console.log('reducer renders ADD_GARDEN');
            return state;

        // logic for editing gardens to users !!EXTRA!!
        case EDIT_GARDEN:
            console.log('reducer renders EDIT_GARDEN');
            return state;

        // logic for deleting gardens from users
        case DELETE_GARDEN:
            console.log('reducer renders DELETE_GARDEN');
            return state;

        // logic to get tasks from local storage when mounting
        case RESTORE_STATE:
            console.log('reducer renders RESTORE_STATE');
            return action.payload;

        // default
        default:
            return state;
    }
};

export default dataReducer;
