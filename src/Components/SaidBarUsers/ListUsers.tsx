import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from '../../Global_Interface';
import saidBar from '../../styles/SaidBar.css';
import { UserItem } from './UserItem';
import * as actions from '../../actions';
import { IListUsersProps } from './Interface_Saidbar';

const actionCreators = {
  loadingAllUsers: actions.loadingAllUsers,
};

export const ListUsers = (props: IListUsersProps) => {
  const { singleAlert } = props;

  const allUsers = useSelector(({ allUsers: { allDataUsers, allUsersId } }: IApplicationState) => (
    allUsersId.map((id) => allDataUsers[id])));

  const dispatch = useDispatch();
  const { loadingAllUsers } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    loadingAllUsers();
  }, []);

  return (
    <ul className={saidBar.listUsers}>
      {allUsers.map((user) => (
        <Link to={`/dialog/:${user.id}`}><UserItem singleAlert={singleAlert} key={user.id} user={user} /></Link>
      ))}
    </ul>
  );
};
