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

export interface ISetCountRows {
  count: number,
}

export interface ISetSearchValue {
  search: string,
}
