/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import chatApp from '../../styles/ChatApp.css';
import { IFormAddNewAudio } from './Interface_Chat';
import * as actions from '../../actions';


const actionCreators = {
  addNewAudio : actions.addNewAudio,
}

export const FormAddNewAudio = (props: IFormAddNewAudio) => {
  const [audioSrc, setAudioSrc] = useState<string>('');

  const { showFormAddAudio } = props;

  const dispatch = useDispatch();
  const { addNewAudio } = bindActionCreators(actionCreators, dispatch);

  const getAudioSrc = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if(target.files === null) {
      return;
    }
    const file = target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAudioSrc(String(reader.result));
    }
  }

  const addAudio = () => {
    const audio = {
      id: Number(_.uniqueId()),
      src: audioSrc,
    };
    addNewAudio(audio);
  }
  return (
    <>
       <div onClick={showFormAddAudio} className={chatApp.blockBackground} />
        <form onSubmit={addAudio} className={chatApp.formAddUser}>
            <label>
              <div className={chatApp.customInput}>
              Загрузите аудио
              <div className={chatApp.customInputPlus} />
              </div>
              <input onChange={getAudioSrc} type="file" accept="audio/*" />
            </label>
          <button type="submit">Сохранить</button>
          <button onClick={showFormAddAudio} type="button">Отменить</button>
        </form>
 </>
 );
}
