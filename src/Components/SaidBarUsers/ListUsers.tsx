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
  const allUsers = useSelector(({ allUsers: { allDataUsers, allUsersId } }: IApplicationState) => (
    allUsersId.map((id) => allDataUsers[id])));

  const dispatch = useDispatch();
  const { loadingAllUsers } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    loadingAllUsers();
  }, [allUsers.length]);

  return (
    <ul className={saidBar.listUsers}>
      {allUsers.length !== 0 && allUsers.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
};
