import React from 'react';
import { Navigation } from './Navigation';
import { ListUsers } from './ListUsers';
import saidBarStyle from '../../styles/SaidBarUsers/SaidBarUsers.css';
import { ISaidBarUsersProps } from './Interface_Saidbar';

export const SaidBarUsers = (props: ISaidBarUsersProps) => {
  const { showFormAddUser, showFormAddAudio } = props;

  return (
    <aside className={saidBarStyle.container}>
      <Navigation showFormAddAudio={showFormAddAudio} showFormAddUser={showFormAddUser} />
      <ListUsers />
    </aside>
  );
};
