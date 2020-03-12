import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import faker from 'faker';
import { Link } from 'react-router-dom';
import cn from 'classnames';
// import { allUsers } from '../../reducers';
import { IUserItemProps } from './Interface_Saidbar';
import { IApplicationState } from '../../Global_Interface';
import saidBar from '../../styles/SaidBar.css';
import * as actions from '../../actions';

const actionCreators = {
  addNewMessage: actions.addNewMessage,
};


export const UserItem = (props: IUserItemProps) => {
  const { user } = props;

  const dispatch = useDispatch();
  const { addNewMessage } = bindActionCreators(actionCreators, dispatch);

  const srcSingleAlert = useSelector(({ currentAudio: { currentAudio } }: IApplicationState) => {
    if (currentAudio.length !== 0) {
      return currentAudio[0].src;
    }
    return '#';
  });

  const singleAlert = new Audio();
  singleAlert.src = srcSingleAlert;
  singleAlert.play();


  const createNewMessage = () => {
    const message = {
      id: Number(_.uniqueId()),
      idUser: user.id,
      idMainUser: 'Boss',
      type: 'text',
      date: `${new Date()}`,
      value: faker.lorem.lines(),
    };
    addNewMessage(message);
  };

  useEffect(() => {
    const idInterval = setInterval(createNewMessage, 10000);
    return () => {
      clearInterval(idInterval);
    };
  }, []);

  const idCurrentUser = Number(localStorage.getItem('currentUser'));

  const styleUser = cn({
    [saidBar.UserContainer]: true,
    [saidBar.UserContainerActive]: idCurrentUser === user.id,
  });

  const setCurrentUser = () => {
    if (idCurrentUser === user.id) {
      localStorage.setItem('currentUser', '0');
    } else {
      localStorage.setItem('currentUser', `${user.id}`);
    }
  };

  const returnPath = idCurrentUser !== 0 ? '/' : `/dialog/:${user.id}`;

  let valueMessage = '';
  let dateLastMessage = '';
  if (user.allMessages.length !== 0) {
    const lastMessageUser = user.allMessages[user.allMessages.length - 1];
    const dateMessage = new Date(lastMessageUser.date);
    const hourLastMessage = dateMessage.getHours();
    const minuteLastMessage = dateMessage.getMinutes();
    valueMessage = lastMessageUser.value;
    dateLastMessage = `${hourLastMessage}:${minuteLastMessage}`;
  }

  return (
    <Link to={returnPath}>
      <div onClick={setCurrentUser} role="button" aria-hidden className={styleUser}>
        <img className={saidBar.imgUser} src={user.imgSrc} alt="user" />
        <div>
          <span>{user.name}</span>
          <span>{user.surName}</span>
          <span>{dateLastMessage}</span>
          <article>{valueMessage}</article>
        </div>
      </div>
    </Link>
  );
};
