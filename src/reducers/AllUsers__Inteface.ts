import { IUser } from '../Global_Interface';

export interface IStateAllUsers {
  users: IUser[],
  loadingState: string,
}


export interface ILoadingUsers {
  users: IUser[],
}

export interface IAddUsers {
  user: IUser,
}
