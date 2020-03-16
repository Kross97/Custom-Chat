import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import _ from 'lodash';
import faker from 'faker';
import { IApplicationState } from '../../Global_Interface';
import { IUserNotificationsProps } from './Interface_Saidbar';
import * as actions from '../../actions';

const actionCreators = {
  addNewMessage: actions.addNewMessage,
};

const randomTimeForCreateMessage = [
  500, 1000, 2500, 5000, 10000, 30000, 60000, 120000, 150000, 240000, 350000,
];

export const UsertItemNotifications = (props: IUserNotificationsProps) => {
  const { notifications, userId } = props;

  const dispatch = useDispatch();
  const { addNewMessage } = bindActionCreators(actionCreators, dispatch);

  const createNewMessage = () => {
    const message = {
      id: Date.parse(`${new Date()}`) + Number(_.uniqueId()),
      idUser: userId,
      idMainUser: 'none',
      type: 'text',
      date: Date.parse(`${new Date()}`),
      value: faker.lorem.lines(),
    };
    addNewMessage(message, userId);
  };

  const indexRandomTime = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
  const randomTime = randomTimeForCreateMessage[indexRandomTime];
  console.log('Для:', userId, 'Сообщение будет через: ', randomTime);
  useEffect(() => {
    const idInterval = setInterval(createNewMessage, randomTime);
    return () => {
      clearInterval(idInterval);
    };
  }, [randomTime]);


  const { srcSingleAlert, isPlayCurrentSound } = useSelector(
    ({ currentAudio: { currentAudio, isPlaySound } }: IApplicationState) => (
      ({
        srcSingleAlert: currentAudio.length !== 0 ? currentAudio[0].src : '#',
        isPlayCurrentSound: isPlaySound,
      })
    ), shallowEqual,
  );

  const { allUserMesagesLength, countNotReadMessages } = useSelector(
    ({ allUsers: { allDataUsers } }: IApplicationState) => ({
      allUserMesagesLength: allDataUsers[userId].allMessages.length,
      countNotReadMessages: allDataUsers[userId].notReadMessages,
    }), shallowEqual,
  );

  const single = () => {
    if (isPlayCurrentSound && notifications) {
      const singleAlert = new Audio();
      singleAlert.src = srcSingleAlert;
      singleAlert.play();
    }
  };

  useEffect(() => {
    single();
  }, [allUserMesagesLength]);

  return (
    <>
      {countNotReadMessages !== 0 && notifications && <span>{countNotReadMessages}</span>}
    </>
  );
};
