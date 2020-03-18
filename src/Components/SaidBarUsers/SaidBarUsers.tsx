import React from 'react';
import { Navigation } from './Navigation';
import { ListUsers } from './ListUsers';
import saidBarStyle from '../../styles/SaidBarUsers/SaidBarUsers.css';

export const SaidBarUsers = () => (
  <aside className={saidBarStyle.container}>
    <Navigation />
    <ListUsers />
  </aside>
);
