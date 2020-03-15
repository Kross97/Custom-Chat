import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { currentAudio } from '../../reducers';
import navStyle from '../../styles/SaidBarUsers/Navigation.css';
import { INavigationProps } from './Interface_Saidbar';
import { IApplicationState } from '../../Global_Interface';

const actionCreators = {
  disconnectCurrentSingle: currentAudio.actions.disconnectCurrentSingle,
};

export const Navigation = (props: INavigationProps) => {
  const [isShowMenu, setShowMenu] = useState<string>('hidden');

  const dispatch = useDispatch();
  const { disconnectCurrentSingle } = bindActionCreators(actionCreators, dispatch);

  const isPlaySound = useSelector((state: IApplicationState) => state.currentAudio.isPlaySound);

  const showMenu = () => {
    const isShowMenuCurrent = isShowMenu === 'hidden' ? 'show' : 'hidden';
    setShowMenu(isShowMenuCurrent);
  };

  const disconnectSingle = () => {
    disconnectCurrentSingle();
  };

  const styleShowMenu = cn({
    [navStyle.menuAddition]: true,
    [navStyle.showMenu]: isShowMenu === 'show',
  });
  const { showFormAddUser, showFormAddAudio } = props;
  const textBtnControlSingle = isPlaySound ? 'Отключить звук уведомлений' : 'Включить звук уведомлений';
  return (
    <nav className={navStyle.navContainer}>
      <button onClick={showMenu} aria-label="showMenu" type="button" className={navStyle.btnMainMenu} />
      <div className={styleShowMenu}>
        <button onClick={showFormAddUser} className={navStyle.btnShowMenu} type="button">Добавить собеседника</button>
        <button className={navStyle.btnShowMenu} type="button">Настроить профиль</button>
        <button onClick={showFormAddAudio} className={navStyle.btnShowMenu} type="button">Добавить звук уведомлений</button>
        <button onClick={disconnectSingle} className={navStyle.btnShowMenu} type="button">{textBtnControlSingle}</button>
      </div>
      <input className={navStyle.search} type="text" placeholder="Search" />
    </nav>
  );
};
