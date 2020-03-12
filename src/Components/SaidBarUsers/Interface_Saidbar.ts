import { IUser } from '../../Global_Interface';

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
  singleAlert: HTMLAudioElement,
  match: {
    params: {
      id: string,
    }
  }
}
export interface IListUsersProps {
  singleAlert: HTMLAudioElement,
}
