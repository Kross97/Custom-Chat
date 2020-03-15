import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allUsers } from '../../reducers';
import dialog from '../../styles/ContentMessages/Dialog.css';
import { IApplicationState } from '../../Global_Interface';
import { ItemMessage } from './ItemMessage';
import { IDialog } from './ContentMessage_Interface';
import * as actions from '../../actions';

const actionCreators = {
  loadingAllUsers: actions.loadingAllUsers,
  setNewCurrentUser: allUsers.actions.setNewCurrentUser,
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
  const { match: { params: { id } } } = props;

  const dispatch = useDispatch();
  const { loadingAllUsers } = bindActionCreators(actionCreators, dispatch);

  const allUsersList = useSelector(({ allUsers: { allUsersId } }: IApplicationState) => allUsersId);

  useEffect(() => {
    loadingAllUsers();
  }, [allUsersList.length]);

  let currentIdUser = -1;
  if (id) {
    currentIdUser = Number(id.slice(1));
  }

  const messagesUser = useSelector(({ allUsers: { allDataUsers } }: IApplicationState) => (
    (currentIdUser !== -1 && allDataUsers[currentIdUser]
      ? allDataUsers[currentIdUser].allMessages : [])));

  const countRow = useSelector(
    ({ actualUiMessages }: IApplicationState) => actualUiMessages.countRow,
  );
  const heightMessageContainer = discoverHeightMessageContainer(countRow);

  return (
    <main className={dialog.containerMessages} style={{ height: heightMessageContainer }}>
      <ul>
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
