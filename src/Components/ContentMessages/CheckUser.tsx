import React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { actualUiApplication } from '../../reducers';
import { IApplicationState } from '../../Global_Interface';
import { ICheckUserProps } from './ContentMessage_Interface';
import navStyle from '../../styles/ContentMessages/NavigationMessages.css';

const actionCreators = {
  addNewDataLastMessage: actualUiApplication.actions.addNewDataLastMessage,
};

export const CheckUser = (props: ICheckUserProps) => {
  const { currentIdUser, user } = props;
  const dispatch = useDispatch();
  const { addNewDataLastMessage } = bindActionCreators(actionCreators, dispatch);

  const dateLastMessageUser = useSelector(
    (state: IApplicationState) => state.actualUiApplication.dateLastMessageUsers[currentIdUser],
  );

  let nameAndSurname = '';
  if (user != undefined) {
    const messagesUser = user.allMessages.findIndex((mes) => mes.idMainUser === 'none');
    if ((dateLastMessageUser !== 'no posts with this user' && messagesUser === -1) || dateLastMessageUser == undefined) {
      addNewDataLastMessage({ id: currentIdUser, date: 'no posts with this user' });
    }
    nameAndSurname = `${user.name} ${user.surName}`;
  }

  if (user != undefined && user.allMessages.length !== 0) {
    const lastMessageUser = user.allMessages[user.allMessages.length - 1];
    if (lastMessageUser.idMainUser !== 'Master') {
      let time = '';
      const differenceMilSeconds = (Date.parse(`${new Date()}`) - lastMessageUser.date);
      const diffInMinutes = differenceMilSeconds / 60000;
      if (diffInMinutes > 60) {
        time = `${Math.floor(diffInMinutes / 60)} hours`;
      } else if (diffInMinutes > 1440) {
        time = `${Math.floor(diffInMinutes / 1440)} days`;
      } else {
        time = Math.ceil(diffInMinutes) === 0 ? 'just got out' : `${Math.ceil(diffInMinutes)} minutes`;
      }
      if (time !== dateLastMessageUser) {
        addNewDataLastMessage({ id: currentIdUser, date: time });
      }
    }
  }

  const textDateIdentifier = dateLastMessageUser === 'no posts with this user' ? 'no posts with this user' : `last seen ${dateLastMessageUser} ago`;

  return (
    <div className={navStyle.userContainer}>
      {user != undefined && <img src={user.imgSrc} alt="foto" />}
      {nameAndSurname !== '' && <span>{nameAndSurname}</span>}
      {nameAndSurname !== '' && <span>{textDateIdentifier}</span>}
    </div>
  );
};
