import React from 'react';
import { useSelector } from 'react-redux';
import { Navigation } from './Navigation';
import { ListUsers } from './ListUsers';
import saidBar from '../../styles/SaidBar.css';
import { ISaidBarUsersProps } from './Interface_Saidbar';
import { IApplicationState } from '../../Global_Interface';

export const SaidBarUsers = (props: ISaidBarUsersProps) => {
  const { showFormAddUser, showFormAddAudio } = props;

  return (
    <aside className={saidBar.container}>
      <Navigation showFormAddAudio={showFormAddAudio} showFormAddUser={showFormAddUser} />
      <ListUsers />
    </aside>
  );
};
