import React, { useState, useContext } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { currentAudio, actualUiApplication } from '../../reducers';
import navStyle from '../../styles/SaidBarUsers/Navigation.css';
// import { INavigationProps } from './Interface_Saidbar';
import { IApplicationState } from '../../Global_Interface';
import { ContextFormAddUser } from '../ChatApp/ChatApplication';

const actionCreators = {
  disconnectCurrentSingle: currentAudio.actions.disconnectCurrentSingle,
  setSearchValue: actualUiApplication.actions.setSearchValue,
  sotringUsersByMessages: actualUiApplication.actions.sotringUsersByMessages,
};

export const Navigation = () => {
  const { showFormAddUser, showFormAddAudio } = useContext(ContextFormAddUser);
  const [isShowMenu, setShowMenu] = useState<string>('hidden');
  const [searchValue, setValueForSearch] = useState<string>('');

  const dispatch = useDispatch();
  const {
    disconnectCurrentSingle,
    setSearchValue,
    sotringUsersByMessages,
  } = bindActionCreators(actionCreators, dispatch);

  const isPlaySound = useSelector((state: IApplicationState) => state.currentAudio.isPlaySound);

  const showMenu = () => {
    const isShowMenuCurrent = isShowMenu === 'hidden' ? 'show' : 'hidden';
    setShowMenu(isShowMenuCurrent);
  };

  const changeSearchValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValueForSearch(target.value);
    setSearchValue({ search: target.value });
  };

  const disconnectSingle = () => {
    disconnectCurrentSingle();
  };

  const addSortingUsers = () => {
    sotringUsersByMessages();
  };

  const isSorting = useSelector(
    ({ actualUiApplication: { isSotringUsers } }: IApplicationState) => isSotringUsers,
  );

  const styleShowMenu = cn({
    [navStyle.menuAddition]: true,
    [navStyle.showMenu]: isShowMenu === 'show',
  });
  const textBtnSort = isSorting ? 'Disable Sorting' : 'Enable Sorting';
  const textBtnControlSingle = isPlaySound ? 'Disable notification sound' : 'Enable notification sound';
  return (
    <nav className={navStyle.navContainer}>
      <button onClick={showMenu} aria-label="showMenu" type="button" className={navStyle.btnMainMenu} />
      <div className={styleShowMenu}>
        <button onClick={showFormAddUser} className={navStyle.btnShowMenu} type="button">Add user</button>
        <button onClick={addSortingUsers} className={navStyle.btnShowMenu} type="button">{textBtnSort}</button>
        <button onClick={showFormAddAudio} className={navStyle.btnShowMenu} type="button">Add notification sound</button>
        <button onClick={disconnectSingle} className={navStyle.btnShowMenu} type="button">{textBtnControlSingle}</button>
      </div>
      <input onChange={changeSearchValue} className={navStyle.search} type="text" placeholder="Search" value={searchValue} />
    </nav>
  );
};
