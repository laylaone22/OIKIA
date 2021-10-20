import { v4 as uuid } from 'uuid';

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
            return { ...state, myFavorites: [...state.myFavorites, action.payload] };

        // logic for removing favorites from users
        case REMOVE_FAVORITE:
            console.log('reducer renders REMOVE_FAVORITE');
            return { ...state, myFavorites: state.myFavorites.filter((fav) => fav._id !== action.payload) };

        // logic for adding plants to users
        case ADD_PLANT:
            console.log('reducer renders ADD_PLANT');
            console.log(action.payload);

            /**const myPlantDataToSave = {
                ...myPlantData,
                userID: userData._id,
                plantID: selectedFav._id,
                plant: selectedFav,
                gardenID: gardenID,
                position: id
            }; **/

            return {
                ...state,
                myGardens: state.myGardens.map((garden) => {
                    if (garden._id === action.payload.gardenID)
                        return { ...garden, myGardenPlants: [...garden.myGardenPlants, action.payload] };
                    else return garden;
                })
            };

        // logic for removing plants from users
        case REMOVE_PLANT:
            console.log('reducer renders REMOVE_PLANT');
            return { ...state, myPlants: state.myPlants.filter((plant) => plant._id !== action.payload) };

        // logic for adding gardens to users
        case ADD_GARDEN:
            console.log('reducer renders ADD_GARDEN');
            console.log(action.payload);
            return { ...state, myGardens: [...state.myGardens, action.payload] };

        // logic for editing gardens to users !!EXTRA!!
        case EDIT_GARDEN:
            console.log('reducer renders EDIT_GARDEN');
            console.log(action.payload);
            return state;

        // logic for deleting gardens from users
        case DELETE_GARDEN:
            console.log('reducer renders DELETE_GARDEN');
            console.log(action.payload);
            return { ...state, myGardens: state.myGardens.filter((garden) => garden._id !== action.payload) };

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
