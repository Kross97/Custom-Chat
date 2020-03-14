import { IAudio } from '../Global_Interface';

export interface IStateCurrentAudio {
  currentAudio: IAudio[],
  isPlaySound: boolean,
  loadingState: string,
}

export interface IAddAudio {
  audio: IAudio,
}
