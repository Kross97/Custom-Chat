import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { allUsers } from '../../reducers';
import { UsertItemNotifications } from './UsertItemNotifications';
import { IUserItemProps } from './Interface_Saidbar';
import userStyle from '../../styles/SaidBarUsers/UserItem.css';
import { IApplicationState } from '../../Global_Interface';

const actionCreators = {
  setNewCurrentUser: allUsers.actions.setNewCurrentUser,
};

export const UserItem = React.memo((props: IUserItemProps) => {
  const { user, message, option } = props;

  const location = useLocation();
  const indexIdUser = location.pathname.indexOf(':') + 1;
  const idUserInURl = Number(location.pathname.slice(indexIdUser));
  const urlCurrentUserId = idUserInURl ? Number(location.pathname.slice(indexIdUser)) : -1;

  const dispatch = useDispatch();
  const { setNewCurrentUser } = bindActionCreators(actionCreators, dispatch);
  const storeCurrentUserId = useSelector(
    (state: IApplicationState) => state.allUsers.currentUserId,
  );

  const setCurrentUser = () => {
    if (storeCurrentUserId === urlCurrentUserId) {
      setNewCurrentUser({ id: -1 });
    } else {
      setNewCurrentUser({ id: user.id });
    }
  };

  useEffect(() => {
    if (urlCurrentUserId === user.id) {
      setNewCurrentUser({ id: urlCurrentUserId });
    } else if (urlCurrentUserId === -1) {
      setNewCurrentUser({ id: -1 });
    }
  }, [urlCurrentUserId]);

  let valueMessage: JSX.Element = <></>;
  let dateLastMessage = '';
  if (user.allMessages.length !== 0) {
    let buidValueMessage: JSX.Element;
    const dateMessage = new Date(message.date);
    const hourLastMessage = dateMessage.getHours() <= 9 ? `0${dateMessage.getHours()}` : `${dateMessage.getHours()}`;
    const minuteLastMessage = dateMessage.getMinutes() <= 9 ? `0${dateMessage.getMinutes()}` : `${dateMessage.getMinutes()}`;
    if (message.type !== 'text') {
      buidValueMessage = <>{message.type}</>;
    } else if (message.value.length < 25) {
      buidValueMessage = <>{message.value}</>;
    } else {
      buidValueMessage = <>{`${message.value.substring(0, 24)}...`}</>;
    }
    valueMessage = message.idMainUser == 'Master' ? (
      <>
        <span>You: </span>
        {buidValueMessage}
      </>
    ) : buidValueMessage;

    dateLastMessage = `${hourLastMessage}:${minuteLastMessage}`;
  }

  const styleUser = cn({
    [userStyle.UserContainer]: true,
    [userStyle.UserContainerActive]: urlCurrentUserId === user.id,
  });

  const returnPath = urlCurrentUserId === user.id ? '/' : `/dialog/:${user.id}`;
  return (
    <Link to={returnPath} style={{ textDecoration: 'none' }}>
      <div onClick={setCurrentUser} className={styleUser} role="button" aria-hidden>
        {message != undefined && message.idMainUser === 'Master' && <img src="./src/img/icon-sended.png" className={userStyle.imgResponce} alt="resp" />}
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
