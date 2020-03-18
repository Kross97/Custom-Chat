import { IMessage, IUser } from '../../Global_Interface';

export interface IItemMessageProps {
  message: IMessage,
}

export interface ILoading {
  stateLoading: string,
}

export interface ICheckUserProps {
  currentIdUser: number,
  user: IUser,
}

export interface IMenuAdditionProps {
  currentIdUser: number,
  user: IUser,
  isShowMenu: string,
}
