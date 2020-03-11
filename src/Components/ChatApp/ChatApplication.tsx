import React, { useState } from 'react';
import { SaidBarUsers } from '../SaidBarUsers/SaidBar';
import chatApp from '../../styles/ChatApp.css';
import { FormAddNewUser } from './FormAddNewUser';

export const ChatApplication = () => {
  const [isShowFormAddUser, setIsShowFormAddUser] = useState<string>('hidden');

  const showFormAddUser = () => {
    const isShowFormAddUserCurrent = isShowFormAddUser === 'hidden' ? 'show' : 'hidden';
    setIsShowFormAddUser(isShowFormAddUserCurrent);
  };

  return (
    <main className={chatApp.container}>
      <SaidBarUsers showFormAddUser={showFormAddUser} />
      {isShowFormAddUser === 'show' && <FormAddNewUser showFormAddUser={showFormAddUser} />}
    </main>
  );
};
