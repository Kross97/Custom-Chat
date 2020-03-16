import { IUser, IMessage } from '../../Global_Interface';

export interface ISaidBarUsersProps {
  showFormAddUser(): void;
  showFormAddAudio(): void;
}

export interface INavigationProps {
  showFormAddUser(): void;
  showFormAddAudio(): void;
}

export interface IUserItemProps {
  user: IUser;
  message: IMessage,
  option: string,
}

export interface IUserNotificationsProps {
  notifications: boolean,
  userId: number,
}
