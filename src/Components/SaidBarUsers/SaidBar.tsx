import React from 'react';
import { Navigation } from './Navigation';
import { ListUsers } from './ListUsers';
import saidBar from '../../styles/SaidBar.css';
import { ISaidBarUsersProps } from './Interface_Saidbar';

export const SaidBarUsers = (props: ISaidBarUsersProps) => {
  const { showFormAddUser, showFormAddAudio } = props;

  return (
    <aside className={saidBar.container}>
      <Navigation showFormAddAudio={showFormAddAudio} showFormAddUser={showFormAddUser} />
      <ListUsers />
    </aside>
  );
};
