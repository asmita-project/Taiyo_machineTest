export const ADD_USER_DATA = 'ADD_USER_DATA';
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA';
export const EDIT_USER = 'EDIT_USER';


export const addUser = (data) => ({
  type: ADD_USER_DATA,
  payload: data,
});

export const removeUser = (id) => ({
  type: REMOVE_USER_DATA,
  payload: id,
});

export const editItem = (Id, newData) => ({
    type: EDIT_USER,
    payload: { Id, newData }
  });