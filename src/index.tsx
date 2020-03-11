import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ChatApplication } from './Components/ChatApp/ChatApplication';
import { reducer } from './reducers';


export const store = configureStore({
  reducer,
});

ReactDOM.render(
  <Provider store={store}>
    <ChatApplication />
  </Provider>,
  document.querySelector('#content'),
);
