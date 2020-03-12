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

export const deleteCurrentUser = (id: number): AppThunk => async (dispatch: StoreDispatch) => {
  try {
    dispatch(allUsers.actions.deleteCurrentUser({ currentUserId: id }));
    await axios.delete(`http://localhost:3000/users/${id}`);
  } catch (e) {
    console.log(e);
  }
};

export const deleteAllMessageUser = (id: number): AppThunk => async (dispatch: StoreDispatch) => {
  try {
    dispatch(allUsers.actions.deleteCurrentUserAllMessages({ currentUserId: id }));
    const responceUser = await axios.get(`http://localhost:3000/users/?id=${id}`);
    const userUpdated = { ...responceUser.data[0] };
    userUpdated.allMessages = [];
    await axios.patch(`http://localhost:3000/users/${id}`, userUpdated);
  } catch (e) {
    console.log(e);
  }
};

export const loadingAllUsers = (): AppThunk => async (dispatch: StoreDispatch) => {
  dispatch(allUsers.actions.loadingUsersFromServerRequest());
  try {
    const responceUsers = await axios.get('http://localhost:3000/users');
    // сделать обработку на 10 сообщений
    dispatch(allUsers.actions.loadingUsersFromServerSucces({ users: responceUsers.data }));
  } catch {
    dispatch(allUsers.actions.loadingUsersFromServerFailed());
  }
};

export const addNewMessage = (message: IMessage): AppThunk => async (dispatch: StoreDispatch) => {
  dispatch(allUsers.actions.addNewMessageRequest());
  try {
    dispatch(allUsers.actions.addNewMessageSucces({ message }));
    const responceUser = await axios.get(`http://localhost:3000/users/?id=${message.idUser}`);
    const userUpdated = { ...responceUser.data[0] };
    const messageForServer = _.omit(message, 'id');
    userUpdated.allMessages.push(messageForServer);
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
      const idAudio = audioResponce.data[0].id;
      await axios.delete(`http://localhost:3000/audio/${idAudio}`);
      await axios.post('http://localhost:3000/audio', audioForServer);
    }
  } catch {
    dispatch(currentAudio.actions.addNewAudioFailed());
  }
};
