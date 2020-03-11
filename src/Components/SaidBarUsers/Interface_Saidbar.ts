import { IUser } from '../../Global_Interface';

export interface ISaidBarUsersProps {
  showFormAddUser(): void;
}

export interface INavigationProps {
  showFormAddUser(): void;
}

export interface IUserItemProps {
  user: IUser;
}
