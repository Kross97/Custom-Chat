/* eslint-disable */
import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import audioStyle from '../../styles/ChatApp/FormAddNewAudio.css';
import * as actions from '../../actions';
import { ContextFormAddUser } from './ChatApplication';

const actionCreators = {
  addNewAudio : actions.addNewAudio,
}

export default () => {
  const [audioSrc, setAudioSrc] = useState<string>('');
  const [audioName, setAudioName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { showFormAddAudio } = useContext(ContextFormAddUser);

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
      setAudioName(file.name);
    }
  }

  const addAudio = () => {
    if(audioSrc === '') {
     setError('error');
      return;
    }
    const audio = {
      id: Number(_.uniqueId()),
      src: audioSrc,
    };
    setError('');
    addNewAudio(audio);
    showFormAddAudio();
  }
  return (
    <>
       <div onClick={showFormAddAudio} className={audioStyle.blockBackground} />
        <form onSubmit={addAudio} className={audioStyle.formAddAudio}>
         <label>
          <div className={audioStyle.imgAudio}/>
              <div className={audioStyle.customInput}>
              {audioName === '' ? 'Loading sound ' : audioName}
              <div className={audioStyle.customInputPlus} />
              </div>
              <input onChange={getAudioSrc} type="file" accept="audio/*" />
            </label>
            {error !== '' && <span>Fill in all form fields</span>}
            <div className={audioStyle.btnGroup}>
          <button type="submit">Save</button>
          <button onClick={showFormAddAudio} type="button">Cancel</button>
          </div>
        </form>
 </>
 );
}
