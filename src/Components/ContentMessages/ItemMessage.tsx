import React from 'react';
import { IItemMessageProps } from './ContentMessage_Interface';
import dialog from '../../styles/ContentMessages.css';

export const ItemMessage = (props: IItemMessageProps) => {
  const { message } = props;
  const dateMes = new Date(message.date);
  const hourWriting = dateMes.getHours();
  const minuteWriting = dateMes.getMinutes();
  return (
    <article className={dialog.containerItemMessage}>
      <span>{message.value}</span>
      <span className={dialog.dateMessage}>{`${hourWriting}:${minuteWriting}`}</span>
    </article>
  );
};
