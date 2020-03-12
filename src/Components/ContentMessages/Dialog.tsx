import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import dialog from '../../styles/ContentMessages.css';
import { NavigationMessages } from './NavigationMessages';
import { IApplicationState } from '../../Global_Interface';
import { IDialog } from './ContentMessage_Interface';

export const Dialog = React.memo((props: IDialog) => {
  const { match: { params: { id } } } = props;
  // const [messagesUser, setMessagesUser] = useState<IMessage[]>([]);
  let mes;
  console.log(id);
  if (id) {
    // const idURl = id.slice(1);
    mes = useSelector(
      ({ allUsers: { allDataUsers } }: IApplicationState) => allDataUsers[1].allMessages,
    );
  }

  console.log(mes);
  return (
    <div className={dialog.container}>
      <NavigationMessages />
      <div className={dialog.containerMessages}>
        {mes != undefined && mes.map((message) => (
          <span key={message.id}>{message.value}</span>
        ))}
      </div>
    </div>
  );
});
