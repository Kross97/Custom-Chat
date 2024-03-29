/* eslint-disable no-param-reassign */
import axios from 'axios';
import _ from 'lodash';
import { allUsers, currentAudio } from '../reducers';
import { StoreDispatch, AppThunk } from './Interfaces_actions';
import { IUser, IMessage, IAudio } from '../Global_Interface';

export const addNewUser = (user: IUser): AppThunk => async (dispatch: StoreDispatch) => {
  dispatch(allUsers.actions.addNewUserRequest());
  try {
    dispatch(allUsers.actions.addNewUSerSucces({ user }));
    const userForServer = _.omit(user, 'id');
    await axios.post('http://localhost:3000/users', userForServer);
  } catch {
    dispatch(allUsers.actions.addNewUSerFailed());
  }
};

export const editCurrentUser = (user: IUser): AppThunk => async (dispatch: StoreDispatch) => {
  try {
    dispatch(allUsers.actions.editUserSucces({ user }));
    await axios.delete(`http://localhost:3000/users/${user.id}`);
    await axios.post('http://localhost:3000/users', user);
  } catch (e) {
    //  console.log(e);
  }
};

export const zeroingNewMessagesUser = (id: number): AppThunk => async (dispatch: StoreDispatch) => {
  try {
    dispatch(allUsers.actions.zeroingNewMessagesUser({ id }));
    const responceUser = await axios.get(`http://localhost:3000/users/?id=${id}`);
    const userUpdated: IUser = { ...responceUser.data[0] };
    userUpdated.notReadMessages = 0;
    await axios.patch(`http://localhost:3000/users/${id}`, userUpdated);
  } catch (e) {
  //  console.log(e);
  }
};

export const changeNotificationsUser = (
  id: number,
): AppThunk => async (dispatch: StoreDispatch) => {
  try {
    dispatch(allUsers.actions.changeNotificationsUser());
    const responceUser = await axios.get(`http://localhost:3000/users/?id=${id}`);
    const userUpdated: IUser = { ...responceUser.data[0] };
    const { notifications } = userUpdated;
    userUpdated.notifications = !notifications;
    await axios.patch(`http://localhost:3000/users/${id}`, userUpdated);
  } catch (e) {
    // console.log(e);
  }
};

export const deleteCurrentUser = (id: number): AppThunk => async (dispatch: StoreDispatch) => {
  try {
    dispatch(allUsers.actions.deleteCurrentUser());
    await axios.delete(`http://localhost:3000/users/${id}`);
  } catch (e) {
    // console.log(e);
  }
};

export const deleteAllMessageUser = (id: number): AppThunk => async (dispatch: StoreDispatch) => {
  try {
    dispatch(allUsers.actions.deleteCurrentUserAllMessages());
    const responceUser = await axios.get(`http://localhost:3000/users/?id=${id}`);
    const userUpdated: IUser = { ...responceUser.data[0] };
    userUpdated.allMessages = [];
    userUpdated.notReadMessages = 0;
    await axios.patch(`http://localhost:3000/users/${id}`, userUpdated);
  } catch (e) {
    // console.log(e);
  }
};

export const deleteAllSeletedMessage = (
  id: number, idMessages: Set<number>,
): AppThunk => async (dispatch: StoreDispatch) => {
  try {
    dispatch(allUsers.actions.deleteAllMessagesSelected({ idMessages }));
    const responceUser = await axios.get(`http://localhost:3000/users/?id=${id}`);
    const userUpdated: IUser = { ...responceUser.data[0] };
    userUpdated.allMessages = userUpdated.allMessages.filter(
      (message: IMessage) => !idMessages.has(message.id),
    );
    await axios.patch(`http://localhost:3000/users/${id}`, userUpdated);
  } catch (e) {
    // console.log(e);
  }
};

export const increaseCountMessagesUser = (
  id: number, factor: number,
): AppThunk => async (dispatch: StoreDispatch) => {
  dispatch(allUsers.actions.addNewFlowMessagesUserRequest());
  try {
    const countLoadingMessages = 7;
    let message = '';
    const responceUser = await axios.get(`http://localhost:3000/users/?id=${id}`);
    const user: IUser = { ...responceUser.data[0] };
    const allUserMessages = user.allMessages.length;
    const newRangeMessages = allUserMessages - (factor * countLoadingMessages)
     - user.notReadMessages;
    const startIndexMessages = newRangeMessages < 0 ? 0 : newRangeMessages;

    const newFlowMessages = user.allMessages.slice(startIndexMessages);
    if (newFlowMessages.length === allUserMessages) {
      message = 'all flow loaded';
    }
    dispatch(allUsers.actions.addNewFlowMessagesUserSucces({ newFlowMessages, message }));
  } catch (e) {
    dispatch(allUsers.actions.addNewFlowMessagesUserFailed());
  }
};

export const loadingAllUsers = (): AppThunk => async (dispatch: StoreDispatch) => {
  dispatch(allUsers.actions.loadingUsersFromServerRequest());
  try {
    const responceUsers = await axios.get('http://localhost:3000/users');
    responceUsers.data.forEach((user: IUser) => {
      const { allMessages } = user;
      const countMessageForChat: number = 10;
      const newRangeMessages = allMessages.length - countMessageForChat - user.notReadMessages;
      const startIndexMessages = newRangeMessages < 0 ? 0 : newRangeMessages;
      user.allMessages = allMessages.slice(startIndexMessages);
      return user;
    });
    dispatch(allUsers.actions.loadingUsersFromServerSucces({ users: responceUsers.data }));
  } catch (e) {
    dispatch(allUsers.actions.loadingUsersFromServerFailed());
  }
};

export const loadingAudioSingl = (): AppThunk => async (dispatch: StoreDispatch) => {
  dispatch(currentAudio.actions.addNewAudioRequest());
  try {
    const responceAudio = await axios.get('http://localhost:3000/audio');
    dispatch(currentAudio.actions.addNewAudioSucces({ audio: responceAudio.data[0] }));
  } catch {
    dispatch(currentAudio.actions.addNewAudioFailed());
  }
};

export const addNewMessage = (message: IMessage): AppThunk => async (dispatch: StoreDispatch) => {
  dispatch(allUsers.actions.addNewMessageRequest());
  try {
    dispatch(allUsers.actions.addNewMessageSucces({ message }));
    const responceUser = await axios.get(`http://localhost:3000/users/?id=${message.idUser}`);
    const userUpdated: IUser = { ...responceUser.data[0] };
    userUpdated.allMessages.push(message);
    const { notReadMessages } = userUpdated;
    userUpdated.notReadMessages = message.idMainUser === 'Master' ? 0 : notReadMessages + 1;
    await axios.patch(`http://localhost:3000/users/${message.idUser}`, userUpdated);
  } catch (e) {
    dispatch(allUsers.actions.addNewMessageFailed());
  }
};

export const addNewAudio = (audio: IAudio): AppThunk => async (dispatch: StoreDispatch) => {
  dispatch(currentAudio.actions.addNewAudioRequest());
  try {
    dispatch(currentAudio.actions.addNewAudioSucces({ audio }));
    const audioResponce = await axios.get('http://localhost:3000/audio');
    const audioForServer = _.omit(audio, 'id');
    if (audioResponce.data.length === 0) {
      await axios.post('http://localhost:3000/audio', audioForServer);
    } else {
      const idAudio: number = audioResponce.data[0].id;
      await axios.delete(`http://localhost:3000/audio/${idAudio}`);
      await axios.post('http://localhost:3000/audio', audioForServer);
    }
  } catch {
    dispatch(currentAudio.actions.addNewAudioFailed());
  }
};
