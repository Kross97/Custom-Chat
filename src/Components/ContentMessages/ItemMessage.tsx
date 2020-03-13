import React from 'react';
import { IItemMessageProps } from './ContentMessage_Interface';
import dialog from '../../styles/ContentMessages.css';

export const ItemMessage = (props: IItemMessageProps) => {
  const { message } = props;
  const dateMes = new Date(message.date);
  const hourWriting: string = dateMes.getHours() <= 9 ? `0${dateMes.getHours()}` : `${dateMes.getHours()}`;
  const minuteWriting: string = dateMes.getMinutes() <= 9 ? `0${dateMes.getMinutes()}` : `${dateMes.getMinutes()}`;
  return (
    <article className={dialog.containerItemMessage}>
      <span>{message.value}</span>
      <span className={dialog.dateMessage}>{`${hourWriting}:${minuteWriting}`}</span>
    </article>
  );
};
