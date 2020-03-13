/* eslint-disable no-param-reassign */
import { createSlice, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
// import { IMessage } from '../../Global_Interface';
import * as Users from './AllUsers__Inteface';
import * as Audio from './CurrentAudio_interface';

const allUsersState: Users.IStateAllUsers = {
  allDataUsers: {},
  allUsersId: [],
  currentUserId: -1,
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
      state.allUsersId.push(user.id);
      state.allDataUsers[user.id] = user;
    },
    addNewUSerFailed: (state) => {
      state.loadingState = 'add user Failed';
    },
    loadingUsersFromServerRequest: (state) => {
      state.loadingState = 'loading users Request';
    },
    loadingUsersFromServerSucces: (state, action: PayloadAction<Users.ILoadingUsers>) => {
      const { users } = action.payload;
      const usersId = users.map((user) => user.id);
      state.allUsersId = usersId;
      users.forEach((user) => {
        user.allMessages.forEach((message) => ({ id: _.uniqueId(), ...message }));
        state.allDataUsers[user.id] = user;
      });
      state.loadingState = 'loading users Succes';
    },
    loadingUsersFromServerFailed: (state) => {
      state.loadingState = 'loading users Failed';
    },
    addNewMessageRequest: (state) => {
      state.loadingState = 'add message Request';
    },
    addNewMessageSucces: (state, action: PayloadAction<Users.IAddMessage>) => {
      const { message } = action.payload;
      state.allDataUsers[message.idUser].allMessages.push(message);
      state.loadingState = 'add message Succes';
    },
    addNewMessageFailed: (state) => {
      state.loadingState = 'add message Failed';
    },
    setNewCurrentUser: (state, action) => {
      const { id } = action.payload;
      if (state.currentUserId === id) {
        state.currentUserId = -1;
      } else {
        state.currentUserId = id;
      }
    },
    deleteCurrentUser: (state) => {
      const { allDataUsers, allUsersId, currentUserId } = state;
      if (currentUserId !== -1) {
        const newAllDataUsers = _.omit(allDataUsers, `${currentUserId}`);
        const newAllUsersId = allUsersId.filter((id) => id !== currentUserId);
        state.allDataUsers = newAllDataUsers;
        state.allUsersId = newAllUsersId;
      }
    },
    deleteCurrentUserAllMessages: (state) => {
      const { currentUserId } = state;
      if (currentUserId !== -1) {
        state.allDataUsers[currentUserId].allMessages = [];
      }
    },
  },
});

const currentAudioState: Audio.IStateCurrentAudio = {
  currentAudio: [],
  loadingState: '',
};

export const currentAudio = createSlice({
  name: 'currentAudio',
  initialState: currentAudioState,
  reducers: {
    addNewAudioRequest: (state) => {
      state.loadingState = 'add audio request';
    },
    addNewAudioSucces: (state, action: PayloadAction<Audio.IAddAudio>) => {
      const { audio } = action.payload;
      state.currentAudio = [audio];
    },
    addNewAudioFailed: (state) => {
      state.loadingState = 'add audio request';
    },
  },
});

export const reducer = combineReducers({
  allUsers: allUsers.reducer,
  currentAudio: currentAudio.reducer,
});
