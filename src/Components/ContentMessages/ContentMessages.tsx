import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dialog } from './Dialog';

export const ContentMessages = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dialog} />
      <Route path="/dialog/:id" component={Dialog} />
    </Switch>
  );
};
