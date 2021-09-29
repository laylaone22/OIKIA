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

const dataReducer = (dataState, action) => {
    console.log('reducer do stuff' + dataState);
    switch (action.type) {
        // logic for adding favorites to users
        case ADD_FAVORITE:
            console.log('reducer renders ADD_FAVORITE');
            return dataState;

        // logic for removing favorites from users
        case REMOVE_FAVORITE:
            console.log('reducer renders REMOVE_FAVORITE');
            return dataState;

        // logic for adding plants to users
        case ADD_PLANT:
            console.log('reducer renders ADD_PLANT');
            return dataState;

        // logic for removing plants from users
        case REMOVE_PLANT:
            console.log('reducer renders REMOVE_PLANT');
            return dataState;

        // logic for adding gardens to users
        case ADD_GARDEN:
            console.log('reducer renders ADD_GARDEN');
            return dataState;

        // logic for editing gardens to users !!EXTRA!!
        case EDIT_GARDEN:
            console.log('reducer renders EDIT_GARDEN');
            return dataState;

        // logic for deleting gardens from users
        case DELETE_GARDEN:
            console.log('reducer renders DELETE_GARDEN');
            return dataState;

        // logic to get tasks from local storage when mounting
        case RESTORE_STATE:
            console.log('reducer renders RESTORE_STATE');
            return action.payload;

        // default
        default:
            return dataState;
    }
};

export default dataReducer;
