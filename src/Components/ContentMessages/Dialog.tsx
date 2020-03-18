/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router-dom';
import dialog from '../../styles/ContentMessages/Dialog.css';
import { IApplicationState } from '../../Global_Interface';
import { IdentifierLoading } from './IdentifierLoading';
import { ItemMessage } from './ItemMessage';
import * as actions from '../../actions';

const actionCreators = {
  loadingAllUsers: actions.loadingAllUsers,
  increaseCountMessagesUser: actions.increaseCountMessagesUser,
  zeroingNewMessagesUser: actions.zeroingNewMessagesUser,
};

const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

export default () => {
  const [factorIncreaseMessages, setFactorIncreaseMessages] = useState<number>(1);
  const [controlScroll, setControlScroll] = useState<string>('none');

  const { id } = useParams();

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

  const removeNewMessage = () => {
    zeroingNewMessagesUser(currentIdUser);
  };

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
      currentTarget.scrollTop = currentTarget.scrollHeight - newScrollPosition;
      setControlScroll('control');
    }
  };

  const countRow = useSelector(
    ({ actualUiApplication }: IApplicationState) => actualUiApplication.countRow,
  );
  const heightMessageContainer = discoverHeightMessageContainer(countRow);
  let dateControler = '';
  let newMessageControler = -1;
  return (
    <main className={dialog.containerMessages} style={{ height: heightMessageContainer }}>
      <ul onScroll={scrollDialog}>
        { (stateLoadingFlowMessages === 'loading messages' || stateLoadingFlowMessages === 'loading error') && <IdentifierLoading stateLoading={stateLoadingFlowMessages} />}
        {messagesUser.length !== 0 && messagesUser.map((message, i) => {
          const indexStartNewMessages = messagesUser.length - notReadMessages;
          const messageDate = new Date(message.date);
          const messGrouptDate = `${allMonths[messageDate.getMonth()]} ${messageDate.getDate()}`;
          let checkMessagesGroup: JSX.Element = <></>;
          if (i === indexStartNewMessages && i !== newMessageControler) {
            newMessageControler = 1;
            checkMessagesGroup = (
              <span
                onMouseEnter={removeNewMessage}
                className={dialog.checkMessages}
              >
                New messages
              </span>
            );
          } else if (messGrouptDate !== dateControler && newMessageControler === -1) {
            dateControler = messGrouptDate;
            checkMessagesGroup = (
              <span className={dialog.checkMessages}>
                {messGrouptDate}
              </span>
            );
          }
          return (
            <React.Fragment key={message.id}>
              {checkMessagesGroup}
              <ItemMessage
                message={message}
              />
            </React.Fragment>
          );
        })}
      </ul>
    </main>
  );
};
