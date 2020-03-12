/* eslint-disable */
import React, { useState } from 'react';
import chatApp from '../../styles/ChatApp.css';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IFormAddNewUser } from './Interface_Chat';
import _ from 'lodash';
import * as actions from '../../actions';

const validInputsSymbol = new Set(['1','2','3','4','5','6','7','8','9','0','@','!','#','$','^','&','*','(',')','~','?',';','№','"','%']);

const actionCreators = {
  addNewUser: actions.addNewUser,
}

export const FormAddNewUser = (props: IFormAddNewUser) => {
  const [imgSrc, setImgSrc] = useState<string>('#');
  const [name, setName] = useState<string>('');
  const [surName, setSurName] = useState<string>('');

  const dispatch = useDispatch();
  const { addNewUser } = bindActionCreators(actionCreators, dispatch);

  const getImgSrc = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if(target.files === null) {
      return;
    }
    const file = target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgSrc(String(reader.result));
    }
  }

  const changeName = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
   if (!validInputsSymbol.has(target.value[target.value.length - 1])) {
     setName(target.value);
   }
  }

  const changeSurname = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
   if (!validInputsSymbol.has(target.value[target.value.length - 1])) {
     setSurName(target.value);
   }
  }

 const { showFormAddUser } = props;

  const addUser = (event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault();
   const user = {
     id: Number(_.uniqueId()),
     name,
     surName,
     imgSrc,
     allMessages: [],
   }
   addNewUser(user);
   setImgSrc('');
   setName('');
   setSurName('');
   showFormAddUser();
  }


  return (
  <>
    <div onClick={showFormAddUser} className={chatApp.blockBackground} />
      <form onSubmit={addUser} className={chatApp.formAddUser}>
      <div className={chatApp.dataImage}>
      <img src={imgSrc} alt="фотография собеседника" />
      <div className={chatApp.imageAdd}>
        <img src={imgSrc} alt="фото" />
          <label>
            <div className={chatApp.customInput}>
            Загрузите фото
            <div className={chatApp.customInputPlus} />
            </div>
            <input onChange={getImgSrc} type="file" accept="image/*" />
          </label>
        </div>
      </div>
      <div className={chatApp.dataForm}>
        <div className={chatApp.dataInputs}>
           <input onChange={changeName} type="text" max="11" placeholder="Введите имя" value={name} />
           <input onChange={changeSurname} type="text" placeholder="Введите фамилию" value={surName} />
         </div>
         <div className={chatApp.dataBtns}>
           <button type="submit">Сохранить</button>
           <button onClick={showFormAddUser} type="button">Отменить</button>
        </div>
      </div>
      </form>
  </>
  );
};
