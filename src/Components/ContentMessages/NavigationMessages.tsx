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
  changeNotificationsUser: actions.changeNotificationsUser,
};

export const NavigationMessages = () => {
  const [isShowMenu, setIsShowMenu] = useState<string>('hidden');
  const dispatch = useDispatch();
  const {
    deleteCurrentUser,
    deleteAllMessageUser,
    deleteAllSeletedMessage,
    changeNotificationsUser,
  } = bindActionCreators(aactionCreators, dispatch);

  const { currentIdUser, user } = useSelector(
    ({ allUsers: { allDataUsers, currentUserId } }: IApplicationState) => (
      {
        currentIdUser: currentUserId,
        user: allDataUsers[currentUserId],
      }),
  );

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
    deleteCurrentUser(currentIdUser);
  };

  const deleteAllMessage = () => {
    deleteAllMessageUser(currentIdUser);
  };

  const allMesagesSelected = useSelector(
    ({ allUsers }: IApplicationState) => allUsers.allMessageForDelete,
  );

  const deleteSelectedMessage = () => {
    deleteAllSeletedMessage(currentIdUser, new Set(allMesagesSelected));
  };

  const changeStateNotifications = () => {
    changeNotificationsUser(currentIdUser);
  };

  const styleBtnMenu = cn({ [navStyle.btnDisabled]: currentIdUser === -1 });
  const styleBtnDeleteSelectedMessage = cn({
    [navStyle.btnDisabled]: currentIdUser === -1 || lengthMessagesDeleted === 0,
  });

  const textBtnNotification = user == undefined || user.notifications ? 'Disable notifications' : 'Enable notifications';

  let time = 'didnt write anything';
  let nameAndSurname = '';
  if (user != undefined) {
    nameAndSurname = `${user.name} ${user.surName}`;
  }

  if (user != undefined && user.allMessages.length !== 0) {
    const differenceMilSeconds = (Date.parse(`${new Date()}`) - user.allMessages[user.allMessages.length - 1].date);
    const diffInMinutes = differenceMilSeconds / 60000;
    if (diffInMinutes > 60) {
      time = `${Math.floor(diffInMinutes / 60)} hours`;
    } else if (diffInMinutes > 1440) {
      time = `${Math.floor(diffInMinutes / 1440)} days`;
    } else {
      time = Math.ceil(diffInMinutes) === 0 ? 'just got out' : `${Math.ceil(diffInMinutes)} minutes`;
    }
  }

  return (
    <nav className={navStyle.containerNav}>
      <div className={navStyle.userContainer}>
        {user != undefined && <img src={user.imgSrc} alt="foto" />}
        {nameAndSurname !== '' && <span>{nameAndSurname}</span>}
        {nameAndSurname !== '' && <span>{`last seen ${time} ago`}</span>}
      </div>
      <section className={styleMenu}>
        <button onClick={deleteAllMessage} className={styleBtnMenu} disabled={currentIdUser === -1} type="button">Удалить переписку</button>
        <button onClick={deleteUser} className={styleBtnMenu} disabled={currentIdUser === -1} type="button"><Link className={navStyle.linkDeleteUser} to="/">Удалить собеседника</Link></button>
        <button onClick={deleteSelectedMessage} className={styleBtnDeleteSelectedMessage} disabled={currentIdUser === -1} type="button">Удалить выбранные сообщения</button>
        <button onClick={changeStateNotifications} className={styleBtnMenu} disabled={currentIdUser === -1} type="button">{textBtnNotification}</button>
      </section>
      <button onClick={showMenu} type="button" aria-label="menu" className={navStyle.btnMenu} />
    </nav>
  );
};
