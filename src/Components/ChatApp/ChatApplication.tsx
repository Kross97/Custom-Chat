import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { SaidBarUsers } from '../SaidBarUsers/SaidBarUsers';
import chatApp from '../../styles/ChatApp/ChatApp.css';
import { ContentMessages } from '../ContentMessages/ContentMessages';
import { FooterInputMessage } from '../FooterInputMessage/FooterInputMessage';
import * as actions from '../../actions';

const ViewUser = React.lazy(() => import('./ViewUser'));
const FormAddNewUser = React.lazy(() => import('./FormAddNewUser'));
const FormAddNewAudio = React.lazy(() => import('./FormAddNewAudio'));

const actionCreators = {
  loadingAudioSingl: actions.loadingAudioSingl,
};

const ss = {
  showFormAddUser: () => {},
  showFormAddAudio: () => {},
  showUserView: () => {},
};
export const ContextFormAddUser = React.createContext(ss);

export const ChatApplication = () => {
  const [isShowFormAddUser, setIsShowFormAddUser] = useState<string>('hidden');
  const [isShowFormAddAudio, setIsShowFormAddAudio] = useState<string>('hidden');
  const [isViewUser, setIsViewUser] = useState<string>('hidden');

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

  const showUserView = () => {
    const newIsViewUser = isViewUser === 'hidden' ? 'show' : 'hidden';
    setIsViewUser(newIsViewUser);
  };

  return (
    <main className={chatApp.container}>
      <ContextFormAddUser.Provider value={{ showFormAddUser, showFormAddAudio, showUserView }}>
        <SaidBarUsers />
        <ContentMessages />
        <FooterInputMessage />
        <React.Suspense fallback={<div>Загрузка...</div>}>
          {isShowFormAddUser === 'show' && <FormAddNewUser />}
          {isShowFormAddAudio === 'show' && <FormAddNewAudio />}
          {isViewUser === 'show' && <ViewUser />}
        </React.Suspense>
      </ContextFormAddUser.Provider>
    </main>
  );
};
