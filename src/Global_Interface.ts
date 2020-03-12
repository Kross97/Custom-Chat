import { reducer } from './reducers';

export interface IAudio {
  id: number,
  src: string,
}

export interface IMessage {
  id: number,
  idUser: number,
  idMainUser: string,
  type: string,
  date: string,
  value: string,
}

export interface IUser {
  id: number,
  name: string,
  surName: string,
  imgSrc: string,
  allMessages: IMessage[],
}

export type IApplicationState = ReturnType<typeof reducer>;
