import { ADD_USER_DATA, REMOVE_USER_DATA, EDIT_USER } from './action';

const initialState = {
    userData: [],
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_DATA:
            return {
                ...state,
                userData: [...state.userData, action.payload],
            };
        case EDIT_USER:
            const { Id, newData } = action.payload;
            const updateUser = state.userData.map((item,index) => {
                if (index === Id) {
                    return { ...item, ...newData };
                }
                return item;
            });
            return {
                ...state,
                userData: updateUser,
            };
        case REMOVE_USER_DATA:
            const updatedItems = state.userData.filter((item, index) => index !== action.payload);
            return {
              ...state,
              userData: updatedItems,
            };
        default:
            return state;
    }
};

export default UserReducer;