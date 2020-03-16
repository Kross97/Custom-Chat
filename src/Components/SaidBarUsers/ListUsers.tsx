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

  const dispatch = useDispatch();
  const { loadingAllUsers } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    loadingAllUsers();
  }, [allUsers.length]);

  const listNotSearch = (
    <ul className={listStyle.listUsers}>
      {allUsers.length !== 0 && allUsers.map((user) => (
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
      <ul className={listStyle.listUsers}>
        <span>{`Found :${1} users`}</span>
        {allUsers.length !== 0 && allUsers.map((user) => (
          (user.name.includes(searchValue) || user.surName.includes(searchValue)) && (
          <UserItem
            key={user.id}
            user={user}
            message={user.allMessages[user.allMessages.length - 1]}
            option="not create message"
          />
          )
        ))}
      </ul>
      <ul className={listStyle.listUsers}>
        <span>{`Found :${1} messages`}</span>
        {allUsers.length !== 0 && allUsers.map((user) => {
          const isHaveMessageValue = user.allMessages.find((mes) => mes.value.includes(searchValue));
          if (isHaveMessageValue != undefined) {
            return (
              <UserItem
                key={user.id}
                user={user}
                message={isHaveMessageValue}
                option="not create message"
              />
            );
          }
        })}
      </ul>
    </>
  );

  if (searchValue !== '') {
    return listAfterSearch;
  }
  return listNotSearch;
};
