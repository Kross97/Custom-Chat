import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IApplicationState } from '../../Global_Interface';
import { CheckUser } from './CheckUser';
import { MenuAdditional } from './MenuAdditional';
import navStyle from '../../styles/ContentMessages/NavigationMessages.css';

export const NavigationMessages = () => {
  const [isShowMenu, setIsShowMenu] = useState<string>('hidden');

  const { currentIdUser, user } = useSelector(
    ({ allUsers: { allDataUsers, currentUserId } }: IApplicationState) => (
      {
        currentIdUser: currentUserId,
        user: allDataUsers[currentUserId],
      }),
  );

  const showMenu = () => {
    const isShowMenuCurrent = isShowMenu === 'hidden' ? 'show' : 'hidden';
    setIsShowMenu(isShowMenuCurrent);
  };

  return (
    <nav className={navStyle.containerNav}>
      <Link to="/"><button className={navStyle.btnBack} aria-label="return" type="button" /></Link>
      <CheckUser currentIdUser={currentIdUser} user={user} />
      <MenuAdditional isShowMenu={isShowMenu} currentIdUser={currentIdUser} user={user} />
      <button onClick={showMenu} type="button" aria-label="menu" className={navStyle.btnMenu} />
    </nav>
  );
};
