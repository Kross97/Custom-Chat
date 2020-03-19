/* eslint-disable */
import React, { useState, useContext, useEffect } from 'react';
import addUserStyle from '../../styles/ChatApp/FormAddNewUser.css';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as actions from '../../actions';
import { ContextFormAddUser } from './ChatApplication';
import { IApplicationState } from '../../Global_Interface';

const validInputsSymbol = new Set(['1','2','3','4','5','6','7','8','9','0','@','!','#','$','^','&','*','(',')','~','?',';','№','"','%']);

const actionCreators = {
  addNewUser: actions.addNewUser,
  editCurrentUser: actions.editCurrentUser,
}

export default () => {
  const [imgSrc, setImgSrc] = useState<string>('#');
  const [isErrorForm, setErrorForm] = useState<string>('');
  const [imgName, setImgName] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surName, setSurName] = useState<string>('');

  const dispatch = useDispatch();
  const { addNewUser, editCurrentUser } = bindActionCreators(actionCreators, dispatch);

  const { user, isEdit } = useSelector(({ allUsers }:IApplicationState ) => {
    return {
      user: allUsers.allDataUsers[allUsers.currentUserId],
      isEdit: allUsers.isEditUser,
    };
  },shallowEqual);

  useEffect(() => {
    if(isEdit) {
    setName(user.name);
    setSurName(user.surName);
    setImgSrc(user.imgSrc);
    }
  }, []);

  const getImgSrc = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if(target.files === null) {
      return;
    }
    const file = target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgSrc(String(reader.result));
      setImgName(file.name);
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

 const { showFormAddUser } = useContext(ContextFormAddUser);

  const addUser = (event: React.FormEvent<HTMLFormElement>) => {
    if ((name === '' && surName === '') || imgSrc === '#') {
      setErrorForm('error');
      return;
    }
   event.preventDefault();
   if (isEdit) {
    const userEdit = {
      ...user,
      name: _.capitalize(name),
      surName: _.capitalize(surName),
      imgSrc,
    };
     editCurrentUser(userEdit);
   } else {
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
   }
   setImgSrc('');
   setName('');
   setSurName('');
   setErrorForm('');
   showFormAddUser();
  }


  return (
  <>
    <div onClick={showFormAddUser} className={addUserStyle.blockBackground} />
      <form onSubmit={addUser} className={addUserStyle.formAddUser}>
      <div className={addUserStyle.dataImage}>
      <img src={imgSrc} alt="foto user" />
      <div className={addUserStyle.imageAdd}>
        <img src={imgSrc} alt="img" />
          <label>
            <div className={addUserStyle.customInput}>
            {imgName === '' ? 'Upload photo' : imgName}
            <div className={addUserStyle.customInputPlus} />
            </div>
            <input onChange={getImgSrc} type="file" accept="image/*" />
          </label>
        </div>
        {isErrorForm === 'error' && <span>Fill in all form fields</span>}
      </div>
      <div className={addUserStyle.dataForm}>
        <div className={addUserStyle.dataInputs}>
           <input onChange={changeName} autoFocus type="text" placeholder="Enter your name" value={name} />
           <input onChange={changeSurname} type="text" placeholder="Enter last name" value={surName} />
         </div>
         <div className={addUserStyle.dataBtns}>
           <button type="submit">Save</button>
           <button onClick={showFormAddUser} type="button">Cancel</button>
        </div>
      </div>
      </form>
  </>
  );
};
