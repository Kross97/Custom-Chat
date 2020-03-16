import React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';
// import { allUsers } from '../../reducers';
import { UsertItemNotifications } from './UsertItemNotifications';
import { IUserItemProps } from './Interface_Saidbar';
import { IApplicationState } from '../../Global_Interface';
import userStyle from '../../styles/SaidBarUsers/UserItem.css';
import * as actions from '../../actions';

const actionCreators = {
  setNewCurrentUser: actions.setNewCurrentUser,
};

export const UserItem = React.memo((props: IUserItemProps) => {
  const { user, message, option } = props;

  const idCurrentUser = useSelector((state: IApplicationState) => state.allUsers.currentUserId);

  const dispatch = useDispatch();
  const { setNewCurrentUser } = bindActionCreators(actionCreators, dispatch);

  const setCurrentUser = () => {
    setNewCurrentUser(user.id);
  };

  let valueMessage: JSX.Element = <></>;
  let dateLastMessage = '';
  if (user.allMessages.length !== 0) {
    let buidValueMessage: JSX.Element;
    const dateMessage = new Date(message.date);
    const hourLastMessage = dateMessage.getHours() <= 9 ? `0${dateMessage.getHours()}` : `${dateMessage.getHours()}`;
    const minuteLastMessage = dateMessage.getMinutes() <= 9 ? `0${dateMessage.getMinutes()}` : `${dateMessage.getMinutes()}`;
    if (message.value.length < 25) {
      buidValueMessage = <>lastMessageUser.value</>;
    } else {
      buidValueMessage = <>{`${message.value.substring(0, 24)}...`}</>;
    }
    valueMessage = message.idMainUser == 'Master' ? (
      <>
        <span>You: </span>
        buidValueMessage
      </>
    ) : buidValueMessage;

    dateLastMessage = `${hourLastMessage}:${minuteLastMessage}`;
  }

  const styleUser = cn({
    [userStyle.UserContainer]: true,
    [userStyle.UserContainerActive]: idCurrentUser === user.id,
  });

  const returnPath = idCurrentUser === user.id ? '/' : `/dialog/:${user.id}`;
  return (
    <Link to={returnPath} style={{ textDecoration: 'none' }}>
      <div onClick={setCurrentUser} className={styleUser} role="button" aria-hidden>
        <img className={userStyle.imgUser} src={user.imgSrc} alt="user" />
        <div>
          <span>{`${user.name}  ${user.surName}`}</span>
          <span>{dateLastMessage}</span>
          <article>{valueMessage}</article>
          { option === 'create message' && <UsertItemNotifications notifications={user.notifications} userId={user.id} />}
        </div>
      </div>
    </Link>
  );
});
