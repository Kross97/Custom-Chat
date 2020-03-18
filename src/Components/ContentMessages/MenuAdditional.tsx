import React, { useContext } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { allUsers } from '../../reducers';
import { IApplicationState } from '../../Global_Interface';
import * as actions from '../../actions';
import navStyle from '../../styles/ContentMessages/NavigationMessages.css';
import { IMenuAdditionProps } from './ContentMessage_Interface';
import { ContextFormAddUser } from '../ChatApp/ChatApplication';

const actionCreators = {
  deleteCurrentUser: actions.deleteCurrentUser,
  deleteAllMessageUser: actions.deleteAllMessageUser,
  deleteAllSeletedMessage: actions.deleteAllSeletedMessage,
  changeNotificationsUser: actions.changeNotificationsUser,
  editCurrentUser: allUsers.actions.editCurrentUser,
};

export const MenuAdditional = (props: IMenuAdditionProps) => {
  const { currentIdUser, user, isShowMenu } = props;
  const { showFormAddUser, showUserView } = useContext(ContextFormAddUser);
  const dispatch = useDispatch();
  const {
    deleteCurrentUser,
    deleteAllMessageUser,
    deleteAllSeletedMessage,
    changeNotificationsUser,
    editCurrentUser,
  } = bindActionCreators(actionCreators, dispatch);

  const lengthMessagesDeleted = useSelector(
    (state: IApplicationState) => state.allUsers.allMessageForDelete.length,
  );

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
    (state: IApplicationState) => state.allUsers.allMessageForDelete,
  );

  const deleteSelectedMessage = () => {
    deleteAllSeletedMessage(currentIdUser, new Set(allMesagesSelected));
  };

  const changeStateNotifications = () => {
    changeNotificationsUser(currentIdUser);
  };

  const editUser = () => {
    editCurrentUser();
    showFormAddUser();
  };

  const viewCurrentUser = () => {
    showUserView();
  };

  const styleBtnMenu = cn({ [navStyle.btnDisabled]: currentIdUser === -1 });
  const styleBtnDeleteSelectedMessage = cn({
    [navStyle.btnDisabled]: currentIdUser === -1 || lengthMessagesDeleted === 0,
  });

  const textBtnNotification = user == undefined || user.notifications ? 'Disable notifications' : 'Enable notifications';
  return (
    <section className={styleMenu}>
      <button onClick={deleteAllMessage} className={styleBtnMenu} disabled={currentIdUser === -1} type="button">Delete all messages</button>
      <button onClick={deleteUser} className={styleBtnMenu} disabled={currentIdUser === -1} type="button"><Link className={navStyle.linkDeleteUser} to="/">Delete contact</Link></button>
      <button onClick={deleteSelectedMessage} className={styleBtnDeleteSelectedMessage} disabled={currentIdUser === -1} type="button">Delete select messages</button>
      <button onClick={viewCurrentUser} className={styleBtnMenu} disabled={currentIdUser === -1} type="button">View profile</button>
      <button onClick={editUser} className={styleBtnMenu} disabled={currentIdUser === -1} type="button">Edit contact</button>
      <button onClick={changeStateNotifications} className={styleBtnMenu} disabled={currentIdUser === -1} type="button">{textBtnNotification}</button>
    </section>
  );
};
