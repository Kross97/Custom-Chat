import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from '../../Global_Interface';
import saidBar from '../../styles/SaidBar.css';
import { UserItem } from './UserItem';
import * as actions from '../../actions';

const actionCreators = {
  loadingAllUsers: actions.loadingAllUsers,
};

export const ListUsers = () => {
  const allUsers = useSelector((state: IApplicationState) => state.allUsers.users);
  const dispatch = useDispatch();
  const { loadingAllUsers } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    loadingAllUsers();
  }, []);

  return (
    <ul className={saidBar.listUsers}>
      {allUsers.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
};
