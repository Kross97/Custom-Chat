import { reducer } from './reducers';

export interface IUser {
  id: number,
  name: string,
  surName: string,
  imgSrc: string,
}

export type IApplicationState = ReturnType<typeof reducer>;
