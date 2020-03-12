import React, { useState } from 'react';
import { SaidBarUsers } from '../SaidBarUsers/SaidBar';
import chatApp from '../../styles/ChatApp.css';
import { FormAddNewUser } from './FormAddNewUser';
import { FormAddNewAudio } from './FormAddNewAudio';
import { ContentMessages } from '../ContentMessages/ContentMessages';

export const ChatApplication = () => {
  const [isShowFormAddUser, setIsShowFormAddUser] = useState<string>('hidden');
  const [isShowFormAddAudio, setIsShowFormAddAudio] = useState<string>('hidden');

  const showFormAddUser = () => {
    const isShowFormAddUserCurrent = isShowFormAddUser === 'hidden' ? 'show' : 'hidden';
    setIsShowFormAddUser(isShowFormAddUserCurrent);
  };

  const showFormAddAudio = () => {
    const isShowFormAddAudioCurrent = isShowFormAddAudio === 'hidden' ? 'show' : 'hidden';
    setIsShowFormAddAudio(isShowFormAddAudioCurrent);
  };

  return (
    <main className={chatApp.container}>
      <SaidBarUsers showFormAddAudio={showFormAddAudio} showFormAddUser={showFormAddUser} />
      <ContentMessages />
      {isShowFormAddUser === 'show' && <FormAddNewUser showFormAddUser={showFormAddUser} />}
      {isShowFormAddAudio === 'show' && <FormAddNewAudio showFormAddAudio={showFormAddAudio} />}
    </main>
  );
};
