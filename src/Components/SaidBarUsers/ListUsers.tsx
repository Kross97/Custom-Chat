import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { IApplicationState } from '../../Global_Interface';
import listStyle from '../../styles/SaidBarUsers/ListUsers.css';
import { UserItem } from './UserItem';
import * as actions from '../../actions';

const actionCreators = {
  loadingAllUsers: actions.loadingAllUsers,
};

export const ListUsers = () => {
  const allUsers = useSelector(({ allUsers: { allDataUsers, allUsersId } }: IApplicationState) => (
    allUsersId.map((id) => allDataUsers[id])));

  const searchValue = useSelector(
    ({ actualUiApplication }: IApplicationState) => actualUiApplication.searchValue,
  );

  const isSorting = useSelector(
    ({ actualUiApplication: { isSotringUsers } }: IApplicationState) => isSotringUsers,
  );

  const allUsersAfterSorting = allUsers;
  if (isSorting && allUsersAfterSorting.length > 1) {
    allUsersAfterSorting.sort((user1, user2) => {
      const lastMessageUser1 = user1.allMessages[user1.allMessages.length - 1];
      const lastMessageUser2 = user2.allMessages[user2.allMessages.length - 1];
      const sortPosition1 = lastMessageUser1 != undefined ? lastMessageUser1.date : NaN;
      const sortPosition2 = lastMessageUser2 != undefined ? lastMessageUser2.date : NaN;
      return sortPosition2 - sortPosition1;
    });
  }
  const dispatch = useDispatch();
  const { loadingAllUsers } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    loadingAllUsers();
  }, [allUsers.length]);

  const allUsersAfterSearch = allUsers.length !== 0 && allUsers.map((user) => (
    (user.name.includes(searchValue) || user.surName.includes(searchValue)) && (
    <UserItem
      key={user.id}
      user={user}
      message={user.allMessages[user.allMessages.length - 1]}
      option="type user not create message"
    />
    )
  ));

  const countUsersAfterSearch = allUsersAfterSearch != false
    ? allUsersAfterSearch.filter((user) => user).length : 0;

  const allMessagesAfterSearch = allUsers.length !== 0 && allUsers.map((user) => {
    const isHaveMessageValue = user.allMessages.find((mes) => mes.value.includes(searchValue));
    if (isHaveMessageValue != undefined) {
      return (
        <UserItem
          key={user.id}
          user={user}
          message={isHaveMessageValue}
          option="type message not create message"
        />
      );
    }
    return false;
  });

  const countMesAfterSearch = allMessagesAfterSearch != false
    ? allMessagesAfterSearch.filter((mes) => mes).length : 0;

  const listNotSearch = (
    <ul className={listStyle.listUsers}>
      {allUsersAfterSorting.length !== 0 && allUsersAfterSorting.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          message={user.allMessages[user.allMessages.length - 1]}
          option="create message"
        />
      ))}
    </ul>
  );

  const listAfterSearch = (
    <>
      <span className={listStyle.countAfterSearch}>{`Found :${countUsersAfterSearch} users`}</span>
      <ul className={`${listStyle.listUsers} ${listStyle.afterSearch}`}>
        {allUsersAfterSearch}
      </ul>
      <span className={listStyle.countAfterSearch}>{`Found :${countMesAfterSearch} messages`}</span>
      <ul className={`${listStyle.listUsers} ${listStyle.afterSearch}`}>
        {allMessagesAfterSearch}
      </ul>
    </>
  );

  if (searchValue !== '') {
    return listAfterSearch;
  }
  return listNotSearch;
};
