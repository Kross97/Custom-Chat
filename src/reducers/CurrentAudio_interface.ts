import { IAudio } from '../Global_Interface';

export interface IStateCurrentAudio {
  currentAudio: IAudio[],
  loadingState: string,
}

export interface IAddAudio {
  audio: IAudio,
}
