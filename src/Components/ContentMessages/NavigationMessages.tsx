import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { IApplicationState } from '../../Global_Interface';
import * as actions from '../../actions';
import dialog from '../../styles/ContentMessages.css';

const aactionCreators = {
  deleteCurrentUser: actions.deleteCurrentUser,
  deleteAllMessageUser: actions.deleteAllMessageUser,
};

export const NavigationMessages = () => {
  const [isShowMenu, setIsShowMenu] = useState<string>('hidden');

  const dispatch = useDispatch();
  const { deleteCurrentUser, deleteAllMessageUser } = bindActionCreators(aactionCreators, dispatch);

  const currentUserId = useSelector((state: IApplicationState) => state.allUsers.currentUserId);

  const showMenu = () => {
    const isShowMenuCurrent = isShowMenu === 'hidden' ? 'show' : 'hidden';
    setIsShowMenu(isShowMenuCurrent);
  };

  const styleMenu = cn({
    [dialog.menuAddition]: true,
    [dialog.menuAdditionActive]: isShowMenu === 'show',
  });

  const deleteUser = () => {
    deleteCurrentUser(currentUserId);
  };

  const deleteAllMessage = () => {
    deleteAllMessageUser(currentUserId);
  };

  return (
    <nav className={dialog.containerNav}>
      <div>zzz</div>
      <section className={styleMenu}>
        <button onClick={deleteAllMessage} disabled={currentUserId === -1} type="button">Удалить переписку</button>
        <button onClick={deleteUser} disabled={currentUserId === -1} type="button"><Link className={dialog.linkDeleteUser} to="/">Удалить собеседника</Link></button>
      </section>
      <button onClick={showMenu} type="button" aria-label="menu" className={dialog.btnMenu} />
    </nav>
  );
};
