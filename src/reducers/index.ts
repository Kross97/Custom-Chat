/* eslint-disable no-param-reassign */
import { createSlice, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import * as Users from './AllUsers__Inteface';

const allUsersState: Users.IStateAllUsers = {
  users: [],
  loadingState: '',
};

export const allUsers = createSlice({
  name: 'allUsers',
  initialState: allUsersState,
  reducers: {
    addNewUserRequest: (state) => {
      state.loadingState = 'add user Request';
    },
    addNewUSerSucces: (state, action: PayloadAction<Users.IAddUsers>) => {
      const { user } = action.payload;
      state.loadingState = 'load user Succes';
      state.users.push(user);
    },
    addNewUSerFailed: (state) => {
      state.loadingState = 'add user Failed';
    },
    loadingUsersFromServerRequest: (state) => {
      state.loadingState = 'loading users Request';
    },
    loadingUsersFromServerSucces: (state, action: PayloadAction<Users.ILoadingUsers>) => {
      const { users } = action.payload;
      state.users = users;
      state.loadingState = 'loading users Succes';
    },
    loadingUsersFromServerFailed: (state) => {
      state.loadingState = 'loading users Failed';
    },
  },
});


export const reducer = combineReducers({
  allUsers: allUsers.reducer,
});
