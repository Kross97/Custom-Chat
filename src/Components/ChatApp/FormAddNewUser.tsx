/* eslint-disable */
import React, { useState } from 'react';
import addUserStyle from '../../styles/ChatApp/FormAddNewUser.css';
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
   if (!validInputsSymbol.has(target.value[target.value.length - 1]) && target.value.length <= 10) {
     setName(target.value);
   }
  }

  const changeSurname = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
   if (!validInputsSymbol.has(target.value[target.value.length - 1]) && target.value.length <= 10) {
     setSurName(target.value);
   }
  }

 const { showFormAddUser } = props;

  const addUser = (event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault();
   const user = {
     id: Number(_.uniqueId()),
     name: _.capitalize(name),
     surName: _.capitalize(surName),
     notifications: true,
     notReadMessages: 0,
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
    <div onClick={showFormAddUser} className={addUserStyle.blockBackground} />
      <form onSubmit={addUser} className={addUserStyle.formAddUser}>
      <div className={addUserStyle.dataImage}>
      <img src={imgSrc} alt="фотография собеседника" />
      <div className={addUserStyle.imageAdd}>
        <img src={imgSrc} alt="фото" />
          <label>
            <div className={addUserStyle.customInput}>
            Загрузите фото
            <div className={addUserStyle.customInputPlus} />
            </div>
            <input onChange={getImgSrc} type="file" accept="image/*" />
          </label>
        </div>
      </div>
      <div className={addUserStyle.dataForm}>
        <div className={addUserStyle.dataInputs}>
           <input onChange={changeName} autoFocus type="text" placeholder="Введите имя" value={name} />
           <input onChange={changeSurname} type="text" placeholder="Введите фамилию" value={surName} />
         </div>
         <div className={addUserStyle.dataBtns}>
           <button type="submit">Сохранить</button>
           <button onClick={showFormAddUser} type="button">Отменить</button>
        </div>
      </div>
      </form>
  </>
  );
};
