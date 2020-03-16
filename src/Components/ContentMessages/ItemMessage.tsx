import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import cn from 'classnames';
import { IItemMessageProps } from './ContentMessage_Interface';
import itemMessage from '../../styles/ContentMessages/ItemMessage.css';
import { allUsers } from '../../reducers';
import { IApplicationState } from '../../Global_Interface';

type viewImage = (event: React.MouseEvent<HTMLImageElement>) => void;

const createValueMessage = (type: string, value: string, viewImage: viewImage) => {
  switch (type) {
    case 'text':
      return <span>{value}</span>;
    case 'image':
      return <img className={itemMessage.imgValue} onClick={viewImage} src={value} alt="фото" aria-hidden />;
    case 'audio':
      return <audio controls src={value} muted />;
    default:
      return <video className={itemMessage.videoValue} controls src={value} muted />;
  }
};

const actionCreators = {
  addMessageForDeleteList: allUsers.actions.addMessageForDeleteList,
  removeMessageOfDeleteList: allUsers.actions.removeMessageOfDeleteList,
};

export const ItemMessage = (props: IItemMessageProps) => {
  const [isShowImage, setIsShowImage] = useState<string>('hidden');

  const { message } = props;

  const dispatch = useDispatch();
  const {
    addMessageForDeleteList,
    removeMessageOfDeleteList,
  } = bindActionCreators(actionCreators, dispatch);

  const listMessageForDelete = useSelector(
    ({ allUsers: { allMessageForDelete } }: IApplicationState) => allMessageForDelete,
  );

  const listSetMessagesDelete = new Set(listMessageForDelete);

  const deleteItemMessage = (id: number) => () => {
    if (listSetMessagesDelete.has(id)) {
      removeMessageOfDeleteList({ id });
    } else {
      addMessageForDeleteList({ id });
    }
  };

  const viewImage = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    const isNewShowImage = isShowImage === 'hidden' ? 'show' : 'hidden';
    setIsShowImage(isNewShowImage);
  };

  const dateMes = new Date(message.date);
  const hourWriting: string = dateMes.getHours() <= 9 ? `0${dateMes.getHours()}` : `${dateMes.getHours()}`;
  const minuteWriting: string = dateMes.getMinutes() <= 9 ? `0${dateMes.getMinutes()}` : `${dateMes.getMinutes()}`;

  const styleArticle = cn({
    [itemMessage.containerItemMessage]: true,
    [itemMessage.messageUser]: message.idMainUser !== 'Master',
    [itemMessage.messageMaster]: message.idMainUser === 'Master',
    [itemMessage.messageForDeleteUser]: listSetMessagesDelete.has(message.id) && message.idMainUser !== 'Master',
    [itemMessage.messageForDeleteMaster]: listSetMessagesDelete.has(message.id) && message.idMainUser === 'Master',
  });

  const valueMessage = createValueMessage(message.type, message.value, viewImage);
  return (
    <>
      {isShowImage === 'show' && (<div onClick={viewImage} className={itemMessage.backgroundImg} aria-hidden />)}
      {isShowImage === 'show' && (<img onClick={viewImage} className={itemMessage.imgView} src={message.value} alt="foto" aria-hidden />)}
      <article
        onClick={deleteItemMessage(message.id)}
        className={styleArticle}
        aria-hidden
      >
        {valueMessage}
        <span className={itemMessage.dateMessage}>{`${hourWriting}:${minuteWriting}`}</span>
        <span />
      </article>
    </>
  );
};
