import { IMessage } from '../../Global_Interface';

export interface IDialog {
  match: {
    params: {
      id: string,
    }
  }
}

export interface IItemMessageProps {
  message: IMessage,
}
