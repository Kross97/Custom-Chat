import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { HashRouter } from 'react-router-dom';
import { ChatApplication } from './Components/ChatApp/ChatApplication';
import { reducer } from './reducers';

export const store = configureStore({
  reducer,
});

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <ChatApplication />
    </Provider>
  </HashRouter>,
  document.querySelector('#content'),
);
