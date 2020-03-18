import React, { useContext } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import view from '../../styles/ChatApp/ViewUser.css';
import { ContextFormAddUser } from './ChatApplication';
import { IApplicationState } from '../../Global_Interface';

export default () => {
  const { showUserView } = useContext(ContextFormAddUser);
  const { user } = useSelector(
    ({ allUsers: { allDataUsers, currentUserId } }: IApplicationState) => ({
      user: allDataUsers[currentUserId],
    }), shallowEqual,
  );

  return (
    <>
      <div onClick={showUserView} className={view.blockBackground} aria-hidden />
      <div onClick={showUserView} className={view.container} aria-hidden>
        <img src={user.imgSrc} alt="foto" />
        <span>{user.name}</span>
        <span>{user.surName}</span>
      </div>
    </>
  );
};
