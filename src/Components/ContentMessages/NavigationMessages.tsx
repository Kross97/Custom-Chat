import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { IApplicationState } from '../../Global_Interface';
import * as actions from '../../actions';
import navStyle from '../../styles/ContentMessages/NavigationMessages.css';

const aactionCreators = {
  deleteCurrentUser: actions.deleteCurrentUser,
  deleteAllMessageUser: actions.deleteAllMessageUser,
  deleteAllSeletedMessage: actions.deleteAllSeletedMessage,
};

export const NavigationMessages = () => {
  const [isShowMenu, setIsShowMenu] = useState<string>('hidden');

  const dispatch = useDispatch();
  const {
    deleteCurrentUser,
    deleteAllMessageUser,
    deleteAllSeletedMessage,
  } = bindActionCreators(aactionCreators, dispatch);

  const currentUserId = useSelector((state: IApplicationState) => state.allUsers.currentUserId);
  const lengthMessagesDeleted = useSelector(
    (state: IApplicationState) => state.allUsers.allMessageForDelete.length,
  );

  const showMenu = () => {
    const isShowMenuCurrent = isShowMenu === 'hidden' ? 'show' : 'hidden';
    setIsShowMenu(isShowMenuCurrent);
  };

  const styleMenu = cn({
    [navStyle.menuAddition]: true,
    [navStyle.menuAdditionActive]: isShowMenu === 'show',
  });

  const deleteUser = () => {
    deleteCurrentUser(currentUserId);
  };

  const deleteAllMessage = () => {
    deleteAllMessageUser(currentUserId);
  };

  const allMesagesSelected = useSelector(
    ({ allUsers }: IApplicationState) => allUsers.allMessageForDelete,
  );

  const deleteSelectedMessage = () => {
    deleteAllSeletedMessage(currentUserId, new Set(allMesagesSelected));
  };

  const styleBtnMenu = cn({ [navStyle.btnDisabled]: currentUserId === -1 });
  const styleBtnDeleteSelectedMessage = cn({
    [navStyle.btnDisabled]: currentUserId === -1 || lengthMessagesDeleted === 0,
  });

  return (
    <nav className={navStyle.containerNav}>
      <div>zzz</div>
      <section className={styleMenu}>
        <button onClick={deleteAllMessage} className={styleBtnMenu} disabled={currentUserId === -1} type="button">Удалить переписку</button>
        <button onClick={deleteUser} className={styleBtnMenu} disabled={currentUserId === -1} type="button"><Link className={navStyle.linkDeleteUser} to="/">Удалить собеседника</Link></button>
        <button onClick={deleteSelectedMessage} className={styleBtnDeleteSelectedMessage} disabled={currentUserId === -1} type="button">Удалить выбранные сообщения</button>
      </section>
      <button onClick={showMenu} type="button" aria-label="menu" className={navStyle.btnMenu} />
    </nav>
  );
};
