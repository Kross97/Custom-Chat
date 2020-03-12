import React from 'react';
import { useSelector } from 'react-redux';
import { Navigation } from './Navigation';
import { ListUsers } from './ListUsers';
import saidBar from '../../styles/SaidBar.css';
import { ISaidBarUsersProps } from './Interface_Saidbar';
import { IApplicationState } from '../../Global_Interface';

export const SaidBarUsers = (props: ISaidBarUsersProps) => {
  const { showFormAddUser, showFormAddAudio } = props;

  const singleAlert = new Audio();
  const srcSingleAlert = useSelector(({ currentAudio: { currentAudio } }: IApplicationState) => {
    if (currentAudio.length !== 0) {
      return currentAudio[0].src;
    }
  });
  if (srcSingleAlert != undefined) {
    singleAlert.src = srcSingleAlert;
  } else {
    singleAlert.src = '#';
  }

  return (
    <aside className={saidBar.container}>
      <Navigation showFormAddAudio={showFormAddAudio} showFormAddUser={showFormAddUser} />
      <ListUsers singleAlert={singleAlert} />
    </aside>
  );
};
