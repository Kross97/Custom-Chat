import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { SaidBarUsers } from '../SaidBarUsers/SaidBarUsers';
import chatApp from '../../styles/ChatApp/ChatApp.css';
import { ContentMessages } from '../ContentMessages/ContentMessages';
import { FooterInputMessage } from '../FooterInputMessage/FooterInputMessage';
import * as actions from '../../actions';

const FormAddNewUser = React.lazy(() => import('./FormAddNewUser'));
const FormAddNewAudio = React.lazy(() => import('./FormAddNewAudio'));

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
      <React.Suspense fallback={<div>Загрузка...</div>}>
        {isShowFormAddUser === 'show' && <FormAddNewUser showFormAddUser={showFormAddUser} />}
        {isShowFormAddAudio === 'show' && <FormAddNewAudio showFormAddAudio={showFormAddAudio} />}
      </React.Suspense>
    </main>
  );
};
