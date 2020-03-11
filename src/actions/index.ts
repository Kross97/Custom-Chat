import axios from 'axios';
import _ from 'lodash';
import { allUsers } from '../reducers';
import { StoreDispatch, AppThunk } from './Interfaces_actions';
import { IUser } from '../Global_Interface';

export const addNewUser = (user: IUser): AppThunk => async (dispatch: StoreDispatch) => {
  dispatch(allUsers.actions.addNewUserRequest());
  try {
    dispatch(allUsers.actions.addNewUSerSucces({ user }));
    _.omit(user, 'id');
    await axios.post('http://localhost:3000/users', user);
  } catch {
    dispatch(allUsers.actions.addNewUSerFailed());
  }
};

export const loadingAllUsers = (): AppThunk => async (dispatch: StoreDispatch) => {
  dispatch(allUsers.actions.loadingUsersFromServerRequest());
  try {
    const responceUsers = await axios.get('http://localhost:3000/users');
    dispatch(allUsers.actions.loadingUsersFromServerSucces({ users: responceUsers.data }));
  } catch {
    dispatch(allUsers.actions.loadingUsersFromServerFailed());
  }
};
