import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import faker from 'faker';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { allUsers } from '../../reducers';
import { IUserItemProps } from './Interface_Saidbar';
import { IApplicationState } from '../../Global_Interface';
import saidBar from '../../styles/SaidBar.css';
import * as actions from '../../actions';

const actionCreators = {
  addNewMessage: actions.addNewMessage,
  setNewCurrentUser: allUsers.actions.setNewCurrentUser,
};


export const UserItem = (props: IUserItemProps) => {
  const { user } = props;

  const dispatch = useDispatch();
  const { addNewMessage, setNewCurrentUser } = bindActionCreators(actionCreators, dispatch);

  const srcSingleAlert = useSelector(({ currentAudio: { currentAudio } }: IApplicationState) => {
    if (currentAudio.length !== 0) {
      return currentAudio[0].src;
    }
    return '#';
  });

  if (srcSingleAlert !== '#') {
    const singleAlert = new Audio();
    singleAlert.src = srcSingleAlert;
    singleAlert.play();
  }


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

  const idCurrentUser = useSelector((state: IApplicationState) => state.allUsers.currentUserId);

  const setCurrentUser = () => {
    setNewCurrentUser({ id: user.id });
  };

  let valueMessage = '';
  let dateLastMessage = '';
  if (user.allMessages.length !== 0) {
    const lastMessageUser = user.allMessages[user.allMessages.length - 1];
    const dateMessage = new Date(lastMessageUser.date);
    const hourLastMessage: string = dateMessage.getHours() <= 9 ? `0${dateMessage.getHours()}` : `${dateMessage.getHours()}`;
    const minuteLastMessage: string = dateMessage.getMinutes() <= 9 ? `0${dateMessage.getMinutes()}` : `${dateMessage.getMinutes()}`;
    if (lastMessageUser.value.length < 27) {
      valueMessage = lastMessageUser.value;
    } else {
      valueMessage = `${lastMessageUser.value.substring(0, 26)}...`;
    }
    dateLastMessage = `${hourLastMessage}:${minuteLastMessage}`;
  }

  const styleUser = cn({
    [saidBar.UserContainer]: true,
    [saidBar.UserContainerActive]: idCurrentUser === user.id,
  });

  const returnPath = idCurrentUser === user.id ? '/' : `/dialog/:${user.id}`;
  return (
    <Link to={returnPath}>
      <div onClick={setCurrentUser} className={styleUser} role="button" aria-hidden>
        <img className={saidBar.imgUser} src={user.imgSrc} alt="user" />
        <div>
          <span>{`${user.name}  ${user.surName}`}</span>
          <span>{dateLastMessage}</span>
          <article>{valueMessage}</article>
        </div>
      </div>
    </Link>
  );
};
