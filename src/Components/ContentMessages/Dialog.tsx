/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import dialog from '../../styles/ContentMessages/Dialog.css';
import { IApplicationState } from '../../Global_Interface';
import { IdentifierLoading } from './IdentifierLoading';
import { ItemMessage } from './ItemMessage';
import { IDialog } from './ContentMessage_Interface';
import * as actions from '../../actions';

const actionCreators = {
  loadingAllUsers: actions.loadingAllUsers,
  increaseCountMessagesUser: actions.increaseCountMessagesUser,
  zeroingNewMessagesUser: actions.zeroingNewMessagesUser,
};

const discoverHeightMessageContainer = (count: number) => {
  let heightFooter = '';
  switch (count) {
    case 2:
      heightFooter = '91.5%';
      break;
    case 3:
      heightFooter = '90.5%';
      break;
    case 4:
      heightFooter = '88.5%';
      break;
    case 5:
      heightFooter = '85.5%';
      break;
    case 6:
      heightFooter = '82.5%';
      break;
    default:
      heightFooter = '92.5%';
  }
  return heightFooter;
};

export default React.memo((props: IDialog) => {
  const [factorIncreaseMessages, setFactorIncreaseMessages] = useState<number>(1);
  const [controlScroll, setControlScroll] = useState<string>('none');

  const { match: { params: { id } } } = props;

  const dispatch = useDispatch();
  const {
    loadingAllUsers,
    increaseCountMessagesUser,
    zeroingNewMessagesUser,
  } = bindActionCreators(actionCreators, dispatch);

  const allUsersList = useSelector(({ allUsers: { allUsersId } }: IApplicationState) => allUsersId);
  const stateLoadingFlowMessages = useSelector(
    ({ allUsers }: IApplicationState) => allUsers.loadingFlowMessageState,
  );

  useEffect(() => {
    loadingAllUsers();
  }, [allUsersList.length]);

  let currentIdUser = -1;
  if (id) {
    currentIdUser = Number(id.slice(1));
  }

  const messagesUser = useSelector(({ allUsers: { allDataUsers } }: IApplicationState) => (
    (currentIdUser !== -1 && allDataUsers[currentIdUser]
      ? allDataUsers[currentIdUser].allMessages : [])
  ));

  const notReadMessages = useSelector(({ allUsers: { allDataUsers } }: IApplicationState) => (
    currentIdUser !== -1 && allDataUsers[currentIdUser]
      ? allDataUsers[currentIdUser].notReadMessages : 1));

  useEffect(() => {
    setControlScroll('none');
  }, [notReadMessages]);

  const scrollDialog = ({ currentTarget }: React.UIEvent<HTMLUListElement>) => {
    if (currentTarget.scrollTop == 0 && stateLoadingFlowMessages !== 'all flow loaded') {
      currentTarget.scrollTop = 50;
      const newFactorIncreaseMessages = factorIncreaseMessages + 1;
      setFactorIncreaseMessages(newFactorIncreaseMessages);
      increaseCountMessagesUser(currentIdUser, factorIncreaseMessages);
    }
    if ((currentTarget.scrollHeight - currentTarget.scrollTop) === currentTarget.clientHeight) {
      zeroingNewMessagesUser(currentIdUser);
    }
    if (controlScroll === 'none') {
      const newScrollPosition = (
        currentTarget.scrollHeight / messagesUser.length) * notReadMessages;
      currentTarget.scrollTop = (currentTarget.scrollTop - newScrollPosition) < 0 ? 3 : currentTarget.scrollTop - newScrollPosition;
      setControlScroll('control');
    }
  };

  const countRow = useSelector(
    ({ actualUiApplication }: IApplicationState) => actualUiApplication.countRow,
  );
  const heightMessageContainer = discoverHeightMessageContainer(countRow);

  return (
    <main className={dialog.containerMessages} style={{ height: heightMessageContainer }}>
      <ul onScroll={scrollDialog}>
        { (stateLoadingFlowMessages === 'loading messages' || stateLoadingFlowMessages === 'loading error') && <IdentifierLoading stateLoading={stateLoadingFlowMessages} />}
        {messagesUser.length !== 0 && messagesUser.map((message) => (
          <ItemMessage
            key={message.id}
            message={message}
          />
        ))}
      </ul>
    </main>
  );
});
