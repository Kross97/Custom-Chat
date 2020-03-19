/* eslint-disable no-param-reassign */
import { createSlice, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { IMessage } from '../Global_Interface';
import * as Users from './AllUsers__Inteface';
import * as Audio from './CurrentAudio_interface';
import * as UiApp from './ActualUiApplication_Interface';

const allUsersState: Users.IStateAllUsers = {
  allDataUsers: {},
  allUsersId: [],
  allMessageForDelete: [],
  isEditUser: false,
  currentUserId: -1,
  loadingState: '',
  loadingFlowMessageState: '',
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
        state.allDataUsers[user.id] = user;
      });
      state.loadingState = 'loading users Succes';
    },
    loadingUsersFromServerFailed: (state) => {
      state.loadingState = 'loading users Failed';
    },
    changeNotificationsUser: (state) => {
      const { currentUserId } = state;
      const { notifications } = state.allDataUsers[currentUserId];
      state.allDataUsers[currentUserId].notifications = !notifications;
    },
    editCurrentUser: (state) => {
      state.isEditUser = true;
    },
    editUserSucces: (state, action: PayloadAction<Users.IAddUsers>) => {
      const { user } = action.payload;
      state.isEditUser = false;
      state.allDataUsers[user.id] = user;
    },
    addNewMessageRequest: (state) => {
      state.loadingState = 'add message Request';
    },
    addNewMessageSucces: (state, action: PayloadAction<Users.IAddMessage>) => {
      const { message } = action.payload;
      state.allDataUsers[message.idUser].allMessages.push(message);
      const { notReadMessages } = state.allDataUsers[message.idUser];
      state.allDataUsers[message.idUser].notReadMessages = message.idMainUser === 'Master' ? 0 : notReadMessages + 1;
      state.loadingState = 'add message Succes';
    },
    addNewMessageFailed: (state) => {
      state.loadingState = 'add message Failed';
    },
    addNewFlowMessagesUserRequest: (state) => {
      state.loadingFlowMessageState = 'loading messages';
    },
    addNewFlowMessagesUserSucces: (state, action: PayloadAction<Users.IAddNewFlowMessages>) => {
      const { newFlowMessages, message } = action.payload;
      const { currentUserId } = state;
      state.allDataUsers[currentUserId].allMessages = newFlowMessages;
      state.loadingFlowMessageState = message;
    },
    addNewFlowMessagesUserFailed: (state) => {
      state.loadingFlowMessageState = 'loading error';
    },
    addMessageForDeleteList: (state, action: PayloadAction<Users.IActionActionFromID>) => {
      const { id } = action.payload;
      state.allMessageForDelete.push(id);
    },
    removeMessageOfDeleteList: (state, action: PayloadAction<Users.IActionActionFromID>) => {
      const { id } = action.payload;
      state.allMessageForDelete = state.allMessageForDelete.filter((dateMes) => dateMes !== id);
    },
    deleteAllMessagesSelected: (state, action: PayloadAction<Users.IDeleteMessagesSelected>) => {
      const { currentUserId } = state;
      const { idMessages } = action.payload;
      const { allMessages } = state.allDataUsers[currentUserId];
      state.allDataUsers[currentUserId].allMessages = allMessages.filter(
        (message: IMessage) => !idMessages.has(message.id),
      );
      state.allMessageForDelete = [];
    },
    zeroingNewMessagesUser: (state, action: PayloadAction<Users.IActionActionFromID>) => {
      const { id } = action.payload;
      state.allDataUsers[id].notReadMessages = 0;
    },
    setNewCurrentUser: (state, action: PayloadAction<Users.IActionActionFromID>) => {
      const { id } = action.payload;
      state.currentUserId = id;
      state.allMessageForDelete = [];
    },
    deleteCurrentUser: (state) => {
      const { allDataUsers, allUsersId, currentUserId } = state;
      if (currentUserId !== -1) {
        const newAllDataUsers = _.omit(allDataUsers, `${currentUserId}`);
        const newAllUsersId = allUsersId.filter((id) => id !== currentUserId);
        state.allDataUsers = newAllDataUsers;
        state.allUsersId = newAllUsersId;
        state.currentUserId = -1;
      }
    },
    deleteCurrentUserAllMessages: (state) => {
      const { currentUserId } = state;
      if (currentUserId !== -1) {
        state.allDataUsers[currentUserId].allMessages = [];
        state.allDataUsers[currentUserId].notReadMessages = 0;
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

const actualUiApplicationState: UiApp.IUiApplicationState = {
  countRow: 0,
  dateLastMessageUsers: {},
  isSotringUsers: false,
  searchValue: '',
};

export const actualUiApplication = createSlice({
  name: 'actualUiMessages',
  initialState: actualUiApplicationState,
  reducers: {
    setUiCountRows: (state, action: PayloadAction<UiApp.ISetCountRows>) => {
      const { count } = action.payload;
      if (count <= 5) {
        state.countRow = count;
      }
    },
    setSearchValue: (state, action: PayloadAction<UiApp.ISetSearchValue>) => {
      const { search } = action.payload;
      state.searchValue = search;
    },
    addNewDataLastMessage: (state, action: PayloadAction<UiApp.IaddLastDateMessage>) => {
      const { id, date } = action.payload;
      state.dateLastMessageUsers[id] = date;
    },
    sotringUsersByMessages: (state) => {
      const { isSotringUsers } = state;
      state.isSotringUsers = !isSotringUsers;
    },
  },
});

export const reducer = combineReducers({
  allUsers: allUsers.reducer,
  currentAudio: currentAudio.reducer,
  actualUiApplication: actualUiApplication.reducer,
});
