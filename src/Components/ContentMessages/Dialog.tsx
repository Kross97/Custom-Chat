import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import dialog from '../../styles/ContentMessages.css';
import { NavigationMessages } from './NavigationMessages';
import { IApplicationState } from '../../Global_Interface';
import { ItemMessage } from './ItemMessage';
import { IDialog } from './ContentMessage_Interface';
import * as actions from '../../actions';

const actionCreators = {
  loadingAllUsers: actions.loadingAllUsers,
};

export const Dialog = React.memo((props: IDialog) => {
  const { match: { params: { id } } } = props;

  const dispatch = useDispatch();
  const { loadingAllUsers } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    loadingAllUsers();
  }, [id]);


  let currentIdUser = 0;
  if (id) {
    currentIdUser = Number(id.slice(1));
  }

  const messagesUser = useSelector(({ allUsers: { allDataUsers } }: IApplicationState) => (
    (currentIdUser !== 0 && allDataUsers[currentIdUser]
      ? allDataUsers[currentIdUser].allMessages : [])), shallowEqual);

  return (
    <div className={dialog.container}>
      <NavigationMessages />
      <div className={dialog.containerMessages}>
        {messagesUser.length !== 0 && messagesUser.map((message) => (
          <ItemMessage key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
});
