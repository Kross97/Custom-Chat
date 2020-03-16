import React from 'react';
import cn from 'classnames';
import { ILoading } from './ContentMessage_Interface';
import identifierStyle from '../../styles/ContentMessages/IdentifierLoading.css';

export const IdentifierLoading = (props: ILoading) => {
  const { stateLoading } = props;
  const styleContainer = cn({
    [identifierStyle.container]: true,
    [identifierStyle.containerLoading]: stateLoading === 'loading messages',
    [identifierStyle.containerFailed]: stateLoading === 'loading error',
  });
  return (
    <div className={styleContainer}>
      <div id={identifierStyle.fountainG}>
        <div id={identifierStyle.fountainG_1} className={identifierStyle.fountainG} />
        <div id={identifierStyle.fountainG_2} className={identifierStyle.fountainG} />
        <div id={identifierStyle.fountainG_3} className={identifierStyle.fountainG} />
        <div id={identifierStyle.fountainG_4} className={identifierStyle.fountainG} />
      </div>
      <span>{stateLoading}</span>
    </div>
  );
};
