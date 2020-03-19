import React from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Navigation } from './Navigation';
import { ListUsers } from './ListUsers';
import saidBarStyle from '../../styles/SaidBarUsers/SaidBarUsers.css';
import { IApplicationState } from '../../Global_Interface';

export const SaidBarUsers = () => {
  const currentUserId = useSelector(({ allUsers }: IApplicationState) => allUsers.currentUserId);

  const styleContainer = cn({
    [saidBarStyle.container]: true,
    [saidBarStyle.containerMobHidden]: currentUserId === 1,
  });

  return (
    <aside className={styleContainer}>
      <Navigation />
      <ListUsers />
    </aside>
  );
};
