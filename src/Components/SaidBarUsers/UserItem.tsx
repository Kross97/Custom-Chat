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
  setNewCurrentUser: actions.setNewCurrentUser,
};

const randomTimeForCreateMessage = [
  500, 1000, 2500, 5000, 10000, 30000, 60000, 120000, 150000, 240000, 350000,
];

export const UserItem = React.memo((props: IUserItemProps) => {
  const { user } = props;

  const dispatch = useDispatch();
  const { addNewMessage, setNewCurrentUser } = bindActionCreators(actionCreators, dispatch);

  const idCurrentUser = useSelector((state: IApplicationState) => state.allUsers.currentUserId);

  const createNewMessage = () => {
    const message = {
      id: Number(_.uniqueId()),
      idUser: user.id,
      idMainUser: 'Boss',
      type: 'text',
      date: `${new Date()}`,
      value: faker.lorem.lines(),
    };
    addNewMessage(message, idCurrentUser);
  };

  const indexRandomTime = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
  const randomTime = randomTimeForCreateMessage[indexRandomTime];
  console.log('Сообщение будет через: ', randomTime);
  useEffect(() => {
    const idInterval = setInterval(createNewMessage, randomTime);
    return () => {
      clearInterval(idInterval);
    };
  }, [randomTime]);

  const setCurrentUser = () => {
    setNewCurrentUser(user.id);
  };

  let valueMessage = '';
  let dateLastMessage = '';
  if (user.allMessages.length !== 0) {
    const lastMessageUser = user.allMessages[user.allMessages.length - 1];
    const dateMessage = new Date(lastMessageUser.date);
    const hourLastMessage = dateMessage.getHours() <= 9 ? `0${dateMessage.getHours()}` : `${dateMessage.getHours()}`;
    const minuteLastMessage = dateMessage.getMinutes() <= 9 ? `0${dateMessage.getMinutes()}` : `${dateMessage.getMinutes()}`;
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
  const countNotReadMessages = useSelector(
    ({ allUsers: { allDataUsers } }: IApplicationState) => allDataUsers[user.id].notReadMessages,
  );

  const returnPath = idCurrentUser === user.id ? '/' : `/dialog/:${user.id}`;
  return (
    <Link to={returnPath} style={{ textDecoration: 'none' }}>
      <div onClick={setCurrentUser} className={styleUser} role="button" aria-hidden>
        <img className={saidBar.imgUser} src={user.imgSrc} alt="user" />
        <div>
          <span>{`${user.name}  ${user.surName}`}</span>
          <span>{dateLastMessage}</span>
          <article>{valueMessage}</article>
          {countNotReadMessages !== 0 && <span>{countNotReadMessages}</span>}
        </div>
      </div>
    </Link>
  );
});
