import React from 'react';
import { IUserItemProps } from './Interface_Saidbar';

export const UserItem = (props: IUserItemProps) => {
  const { user } = props;
  return (
    <div>
      <img src={user.imgSrc} alt="user" />
      <div>
        <p>{user.name}</p>
        <p>{user.surName}</p>
      </div>
    </div>
  );
};
