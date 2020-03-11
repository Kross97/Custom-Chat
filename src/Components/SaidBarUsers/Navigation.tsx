import React, { useState } from 'react';
import cn from 'classnames';
import saidBar from '../../styles/SaidBar.css';
import { INavigationProps } from './Interface_Saidbar';

export const Navigation = (props: INavigationProps) => {
  const [isShowMenu, setShowMenu] = useState<string>('hidden');

  const showMenu = () => {
    const isShowMenuCurrent = isShowMenu === 'hidden' ? 'show' : 'hidden';
    setShowMenu(isShowMenuCurrent);
  };

  const styleShowMenu = cn({
    [saidBar.menuAddition]: true,
    [saidBar.showMenu]: isShowMenu === 'show',
  });
  const { showFormAddUser } = props;
  return (
    <nav className={saidBar.navContainer}>
      <button onClick={showMenu} aria-label="showMenu" type="button" className={saidBar.btnMainMenu} />
      <div className={styleShowMenu}>
        <button onClick={showFormAddUser} className={saidBar.btnShowMenu} type="button">Добавить собеседника</button>
        <button className={saidBar.btnShowMenu} type="button">Настроить профиль</button>
      </div>
      <input className={saidBar.search} type="text" placeholder="Search" />
    </nav>
  );
};
