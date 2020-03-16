import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import cn from 'classnames';
import _ from 'lodash';
import menuStyle from '../../styles/FooterInputMessage/MenuLoadFiles.css';
import { IMenuLoadFilesProps } from './Footer_Input_Interface';
import * as actions from '../../actions';
import { IApplicationState } from '../../Global_Interface';

const actionCreators = {
  addNewMessage: actions.addNewMessage,
};

export const MenuLoadFiles = (props: IMenuLoadFilesProps) => {
  const { isShowMenuLoad } = props;

  const dispatch = useDispatch();
  const { addNewMessage } = bindActionCreators(actionCreators, dispatch);

  const idCurrentUser = useSelector(({ allUsers }: IApplicationState) => allUsers.currentUserId);

  const addFileToMessage = (type: string) => ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files == undefined) {
      return;
    }
    const { files } = target;
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const message = {
          id: Date.parse(`${new Date()}`) + Number(_.uniqueId()),
          idUser: idCurrentUser,
          idMainUser: 'Master',
          type,
          date: Date.parse(`${new Date()}`),
          value: String(reader.result),
        };
        addNewMessage(message, idCurrentUser);
      };
    });
  };

  const styleMenuLoadFile = cn({
    [menuStyle.menuLoadFilesHide]: true,
    [menuStyle.menuLoadFilesShow]: isShowMenuLoad === 'show',
  });
  return (
    <div className={styleMenuLoadFile}>
      <label>
        <input onChange={addFileToMessage('image')} multiple type="file" accept="image/*" />
      </label>
      <label>
        <input onChange={addFileToMessage('audio')} type="file" accept="audio/*" />
      </label>
      <label>
        <input onChange={addFileToMessage('video')} type="file" accept="video/*" />
      </label>
    </div>
  );
};