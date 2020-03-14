import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import dialog from '../../styles/ContentMessages.css';
import { IApplicationState } from '../../Global_Interface';
import { ItemMessage } from './ItemMessage';
import { IDialog } from './ContentMessage_Interface';
import * as actions from '../../actions';

const actionCreators = {
  loadingAllUsers: actions.loadingAllUsers,
};

export default React.memo((props: IDialog) => {
  const { match: { params: { id } } } = props;

  const dispatch = useDispatch();
  const { loadingAllUsers } = bindActionCreators(actionCreators, dispatch);

  const allUsers = useSelector(({ allUsers: { allUsersId } }: IApplicationState) => allUsersId);

  useEffect(() => {
    loadingAllUsers();
  }, [allUsers.length]);

  let currentIdUser = 0;
  if (id) {
    currentIdUser = Number(id.slice(1));
  }

  const messagesUser = useSelector(({ allUsers: { allDataUsers } }: IApplicationState) => (
    (currentIdUser !== 0 && allDataUsers[currentIdUser]
      ? allDataUsers[currentIdUser].allMessages : [])));

  return (
    <div className={dialog.containerMessages}>
      <ul>
        {messagesUser.length !== 0 && messagesUser.map((message) => (
          <ItemMessage key={message.id} message={message} />
        ))}
      </ul>
    </div>
  );
});
