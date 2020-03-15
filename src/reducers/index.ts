/* eslint-disable no-param-reassign */
import { createSlice, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { IMessage } from '../Global_Interface';
import * as Users from './AllUsers__Inteface';
import * as Audio from './CurrentAudio_interface';

const allUsersState: Users.IStateAllUsers = {
  allDataUsers: {},
  allUsersId: [],
  allMessageForDelete: [],
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
        if (state.currentUserId === user.id) {
          user.notReadMessages = 0;
        }
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
      if (message.idUser !== state.currentUserId) {
        const { notReadMessages } = state.allDataUsers[message.idUser];
        state.allDataUsers[message.idUser].notReadMessages = notReadMessages + 1;
      } else {
        state.allDataUsers[message.idUser].notReadMessages = 0;
      }
      state.loadingState = 'add message Succes';
    },
    addNewMessageFailed: (state) => {
      state.loadingState = 'add message Failed';
    },
    addMessageForDeleteList: (state, action) => {
      const { id } = action.payload;
      state.allMessageForDelete.push(id);
    },
    removeMessageOfDeleteList: (state, action) => {
      const { id } = action.payload;
      state.allMessageForDelete = state.allMessageForDelete.filter((dateMes) => dateMes !== id);
    },
    deleteAllMessagesSelected: (state, action) => {
      const { currentUserId } = state;
      const { idMessages } = action.payload;
      const { allMessages } = state.allDataUsers[currentUserId];
      state.allDataUsers[currentUserId].allMessages = allMessages.filter(
        (message: IMessage) => !idMessages.has(message.id),
      );
      state.allMessageForDelete = [];
    },
    setNewCurrentUser: (state, action) => {
      const { id } = action.payload;
      if (state.currentUserId === id) {
        state.currentUserId = -1;
      } else {
        state.currentUserId = id;
      }
      state.allDataUsers[id].notReadMessages = 0;
      state.allMessageForDelete = [];
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
  isPlaySound: false,
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
      state.isPlaySound = true;
      state.loadingState = 'add audio succes';
    },
    addNewAudioFailed: (state) => {
      state.loadingState = 'add audio request';
    },
    disconnectCurrentSingle: (state) => {
      const { isPlaySound } = state;
      if (state.currentAudio.length === 0) {
        state.isPlaySound = false;
      } else {
        state.isPlaySound = !isPlaySound;
      }
    },
  },
});

const actualUiMessagesState = {
  countRow: 0,
};

export const actualUiMessages = createSlice({
  name: 'actualUiMessages',
  initialState: actualUiMessagesState,
  reducers: {
    setUiCountRows: (state, action) => {
      const { count } = action.payload;
      if (count <= 5) {
        state.countRow = count;
      }
    },
  },
});

export const reducer = combineReducers({
  allUsers: allUsers.reducer,
  currentAudio: currentAudio.reducer,
  actualUiMessages: actualUiMessages.reducer,
});
