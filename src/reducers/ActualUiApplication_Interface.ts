export interface IUiApplicationState {
  countRow: number,
  dateLastMessageUsers: {
    [id: number]: string,
  },
  isSotringUsers: boolean,
  searchValue: string,
}

export interface IaddLastDateMessage {
  id: number,
  date: string,
}
