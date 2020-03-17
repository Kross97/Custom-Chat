import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NavigationMessages } from './NavigationMessages';
import messagesStyle from '../../styles/ContentMessages/ContentMessages.css';

const Dialog = React.lazy(() => import('./Dialog'));
const DefaultWindowDialog = React.lazy(() => import('./DefaultWindowDialog'));


export const ContentMessages = () => (
  <div className={messagesStyle.container}>
    <NavigationMessages />
    <Switch>
      <React.Suspense fallback={<div className={messagesStyle.containerMessages} />}>
        <Route exact path="/" component={DefaultWindowDialog} />
        <Route path="/dialog/:id" component={Dialog} />
      </React.Suspense>
    </Switch>
  </div>
);
