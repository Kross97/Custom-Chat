import { ThunkAction } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { store } from '../index';
import { reducer } from '../reducers';

type RootState = ReturnType<typeof reducer>;

export type StoreDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<null>>;
