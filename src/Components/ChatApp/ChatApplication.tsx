import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { SaidBarUsers } from '../SaidBarUsers/SaidBar';
import chatApp from '../../styles/ChatApp.css';
import { FormAddNewUser } from './FormAddNewUser';
import { FormAddNewAudio } from './FormAddNewAudio';
import { ContentMessages } from '../ContentMessages/ContentMessages';
import { FooterInputMessage } from '../FooterInputMessage/FooterInputMessage';

import * as actions from '../../actions';

const actionCreators = {
  loadingAudioSingl: actions.loadingAudioSingl,
};

export const ChatApplication = () => {
  const [isShowFormAddUser, setIsShowFormAddUser] = useState<string>('hidden');
  const [isShowFormAddAudio, setIsShowFormAddAudio] = useState<string>('hidden');

  const dispatch = useDispatch();
  const { loadingAudioSingl } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    loadingAudioSingl();
  }, []);

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
      <FooterInputMessage />
      {isShowFormAddUser === 'show' && <FormAddNewUser showFormAddUser={showFormAddUser} />}
      {isShowFormAddAudio === 'show' && <FormAddNewAudio showFormAddAudio={showFormAddAudio} />}
    </main>
  );
};
