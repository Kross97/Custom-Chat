import React, { useEffect, useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { NavigationMessages } from './NavigationMessages';
import dialog from '../../styles/ContentMessages.css';
import { IApplicationState } from '../../Global_Interface';

const Dialog = React.lazy(() => import('./Dialog'));
const DefaultWindowDialog = React.lazy(() => import('./DefaultWindowDialog'));


export const ContentMessages = () => {
  const { srcSingleAlert, isPlayCurrentSound } = useSelector(
    ({ currentAudio: { currentAudio, isPlaySound } }: IApplicationState) => (
      ({
        srcSingleAlert: currentAudio.length !== 0 ? currentAudio[0].src : '#',
        isPlayCurrentSound: isPlaySound,
      })
    ), shallowEqual,
  );

  const allMesagesLength = useSelector(
    ({ allUsers: { allDataUsers, allUsersId } }: IApplicationState) => {
      const memoizedLength = useMemo(() => allUsersId.reduce(
        (acc: number, id: number) => acc + allDataUsers[id].allMessages.length, 0,
      ), [allDataUsers, allUsersId]);
      return memoizedLength;
    },
  );

  const single = () => {
    if (isPlayCurrentSound) {
      const singleAlert = new Audio();
      singleAlert.src = srcSingleAlert;
      singleAlert.play();
    }
  };
  useEffect(() => {
    single();
  }, [allMesagesLength]);

  return (
    <div className={dialog.container}>
      <NavigationMessages />
      <Switch>
        <React.Suspense fallback={<div className={dialog.containerMessages} />}>
          <Route exact path="/" component={DefaultWindowDialog} />
          <Route path="/dialog/:id" component={Dialog} />
        </React.Suspense>
      </Switch>
    </div>
  );
};
