import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { HashRouter } from 'react-router-dom';
import { ChatApplication } from './Components/ChatApp/ChatApplication';
import { reducer } from './reducers';


const { location } = window;
const indexIdUser = location.hash.indexOf(':') + 1;
const idUserInURl = Number(location.hash.slice(indexIdUser));
const currentUserId = idUserInURl ? Number(location.hash.slice(indexIdUser)) : -1;


export const store = configureStore({
  reducer,
  preloadedState: {
    allUsers: {
      allDataUsers: {},
      allUsersId: [],
      allMessageForDelete: [],
      currentUserId,
    },
  },
});

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <ChatApplication />
    </Provider>
  </HashRouter>,
  document.querySelector('#content'),
);
