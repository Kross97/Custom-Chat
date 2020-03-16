import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import cn from 'classnames';
import _ from 'lodash';
import { MenuLoadFiles } from './MenuLoadFiles';
import { actualUiApplication } from '../../reducers';
import footerStyle from '../../styles/FooterInputMessage/FooterInputMessage.css';
import { IApplicationState } from '../../Global_Interface';
import * as actions from '../../actions';

const countSymbolsInRow = 47;

const discoverHeightFooter = (count: number) => {
  let heightFooter = '';
  switch (count) {
    case 1:
      heightFooter = '5%';
      break;
    case 2:
      heightFooter = '7%';
      break;
    case 3:
      heightFooter = '9%';
      break;
    case 4:
      heightFooter = '11%';
      break;
    case 5:
      heightFooter = '14%';
      break;
    default:
      heightFooter = '4%';
  }
  return heightFooter;
};

const actionCreators = {
  setUiCountRows: actualUiApplication.actions.setUiCountRows,
  addNewMessage: actions.addNewMessage,
};

export const FooterInputMessage = () => {
  const [isShowMenuLoad, setIsShowMenuLoad] = useState<string>('hidden');
  const [valueMessage, setValueMessage] = useState<string>('');

  const dispatch = useDispatch();
  const { setUiCountRows, addNewMessage } = bindActionCreators(actionCreators, dispatch);

  const showMenuLoadFiles = () => {
    const isShowMenuLoadCurrent = isShowMenuLoad === 'hidden' ? 'show' : 'hidden';
    setIsShowMenuLoad(isShowMenuLoadCurrent);
  };

  const idCurrentUser = useSelector(({ allUsers }: IApplicationState) => allUsers.currentUserId);

  const submitMessage = () => {
    const message = {
      id: Date.parse(`${new Date()}`) + Number(_.uniqueId()),
      idUser: idCurrentUser,
      idMainUser: 'Master',
      type: 'text',
      date: Date.parse(`${new Date()}`),
      value: valueMessage,
    };
    addNewMessage(message, idCurrentUser);
    setValueMessage('');
    setUiCountRows({ count: 0 });
  };

  const inputMessage = ({ target } : React.ChangeEvent<HTMLTextAreaElement>) => {
    setValueMessage(target.value);
    if ((target.value.length % countSymbolsInRow) === 0) {
      const countRows = target.value.length / countSymbolsInRow;
      setUiCountRows({ count: countRows });
    }
  };

  const actualCountRow = useSelector(
    (state: IApplicationState) => state.actualUiApplication.countRow,
  );

  const valueHeight = discoverHeightFooter(actualCountRow);

  const styleBtnClip = cn({
    [footerStyle.btnClip]: true,
    [footerStyle.btnClipClick]: isShowMenuLoad === 'show',
  });

  return (
    <footer className={footerStyle.container} style={{ height: valueHeight }}>
      <form onSubmit={submitMessage} className={footerStyle.formAddMessage}>
        <MenuLoadFiles isShowMenuLoad={isShowMenuLoad} />
        <button onClick={showMenuLoadFiles} className={styleBtnClip} disabled={idCurrentUser === -1} aria-label="showMenu" type="button" />
        <textarea onChange={inputMessage} spellCheck="false" disabled={idCurrentUser === -1} placeholder=" Write a message..." value={valueMessage} />
        <button className={footerStyle.btnAddNewMessage} disabled={idCurrentUser === -1} aria-label="showMenu" type="submit" />
      </form>
    </footer>
  );
};
