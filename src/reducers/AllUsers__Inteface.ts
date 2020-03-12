import { IUser } from '../Global_Interface';

export interface IStateAllUsers {
  allDataUsers: {
    [id: number]: IUser,
  },
  allUsersId: number[],
  loadingState: string,
}


export interface ILoadingUsers {
  users: IUser[],
}

export interface IAddUsers {
  user: IUser,
}
