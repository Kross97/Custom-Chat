import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import cn from 'classnames';
import { IApplicationState } from '../../Global_Interface';


import { NavigationMessages } from './NavigationMessages';
import messagesStyle from '../../styles/ContentMessages/ContentMessages.css';


const Dialog = React.lazy(() => import('./Dialog'));
const DefaultWindowDialog = React.lazy(() => import('./DefaultWindowDialog'));

export const ContentMessages = () => {
  const currentUserId = useSelector(({ allUsers }: IApplicationState) => allUsers.currentUserId);
  const styleContainer = cn({
    [messagesStyle.container]: true,
    [messagesStyle.containerMobActive]: currentUserId !== -1,
  });
  return (
    <div className={styleContainer}>
      <NavigationMessages />
      <Switch>
        <React.Suspense fallback={<div>Загрузка...</div>}>
          <Route exact path="/" component={DefaultWindowDialog} />
          <Route path="/dialog/:id" component={Dialog} />
        </React.Suspense>
      </Switch>
    </div>
  );
};
