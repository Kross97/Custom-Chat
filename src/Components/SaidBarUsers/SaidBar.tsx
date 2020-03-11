import React from 'react';
import { Navigation } from './Navigation';
import { ListUsers } from './ListUsers';
import saidBar from '../../styles/SaidBar.css';
import { ISaidBarUsersProps } from './Interface_Saidbar';

export const SaidBarUsers = (props: ISaidBarUsersProps) => {
  const { showFormAddUser } = props;
  return (
    <aside className={saidBar.container}>
      <Navigation showFormAddUser={showFormAddUser} />
      <ListUsers />
    </aside>
  );
};
