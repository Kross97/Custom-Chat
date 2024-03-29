import { IUser, IMessage } from '../Global_Interface';

export interface IStateAllUsers {
  allDataUsers: {
    [id: number]: IUser,
  },
  allUsersId: number[],
  currentUserId: number,
  allMessageForDelete: number[],
  isEditUser: boolean,
  loadingState: string,
  loadingFlowMessageState: string,
}

export interface ILoadingUsers {
  users: IUser[],
}

export interface IAddUsers {
  user: IUser,
}

export interface ISetUserId {
  id: number,
}

export interface IAddMessage {
  message: IMessage,
}

export interface IAddNewFlowMessages {
  newFlowMessages: IMessage[],
  message: string,
}

export interface IActionActionFromID {
  id: number,
}

export interface IDeleteMessagesSelected {
  idMessages: Set<number>,
}
