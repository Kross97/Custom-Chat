import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import cn from 'classnames';
import { actualUiMessages } from '../../reducers';
import inputMes from '../../styles/FooterInputMessage.css';
import { IApplicationState } from '../../Global_Interface';

const countSymbolsInRow = 48;

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
  setUiCountRows: actualUiMessages.actions.setUiCountRows,
};

export const FooterInputMessage = () => {
  const [isShowMenuLoad, setIsShowMenuLoad] = useState<string>('hidden');
  const [valueMessage, setValueMessage] = useState<string>('');

  const dispatch = useDispatch();
  const { setUiCountRows } = bindActionCreators(actionCreators, dispatch);

  const showMenuLoadFiles = () => {
    const isShowMenuLoadCurrent = isShowMenuLoad === 'hidden' ? 'show' : 'hidden';
    setIsShowMenuLoad(isShowMenuLoadCurrent);
  };

  const inputMessage = ({ target } : React.ChangeEvent<HTMLTextAreaElement>) => {
    setValueMessage(target.value);
    if ((target.value.length % countSymbolsInRow) === 0) {
      const countRows = target.value.length / countSymbolsInRow;
      setUiCountRows({ count: countRows });
    }
  };

  const actualCountRow = useSelector((state: IApplicationState) => state.actualUiMessages.countRow);

  const valueHeight = discoverHeightFooter(actualCountRow);

  const styleBtnClip = cn({
    [inputMes.btnClip]: true,
    [inputMes.btnClipClick]: isShowMenuLoad === 'show',
  });

  return (
    <footer className={inputMes.container} style={{ height: valueHeight }}>
      <form className={inputMes.formAddMessage}>
        <div className={inputMes.menuLoadFiles} />
        <button onClick={showMenuLoadFiles} className={styleBtnClip} aria-label="showMenu" type="button" />
        <textarea onChange={inputMessage} spellCheck="false" placeholder=" Write a message..." value={valueMessage} />
        <button className={inputMes.btnAddNewMessage} />
      </form>
    </footer>
  );
};
