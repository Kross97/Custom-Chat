import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import faker from 'faker';
import cn from 'classnames';
import { IUserItemProps } from './Interface_Saidbar';
import saidBar from '../../styles/SaidBar.css';
import * as actions from '../../actions';

const actionCreators = {
  addNewMessage: actions.addNewMessage,
};

export const UserItem = (props: IUserItemProps) => {
  const { user, singleAlert } = props;
  const { match: { params: { id } } = props; 
  const dispatch = useDispatch();
  const { addNewMessage } = bindActionCreators(actionCreators, dispatch);

  const createNewMessage = () => {
    const message = {
      id: Number(_.uniqueId()),
      idUser: user.id,
      idMainUser: 'Boss',
      type: 'text',
      value: faker.lorem.lines(),
    };
    addNewMessage(message);
    singleAlert.play();
  };

  useEffect(() => {
    setInterval(createNewMessage, 10000);
  }, []);

  const styleUser = cn({
    [saidBar.UserContainer]: true,
    [saidBar.UserContainerActive]: Number(id.slice(1)) === user.id,
  });

  return (
    <div className={styleUser}>
      <img className={saidBar.imgUser} src={user.imgSrc} alt="user" />
      <div>
        <span>{user.name}</span>
        <span>{user.surName}</span>
      </div>
    </div>
  );
};
