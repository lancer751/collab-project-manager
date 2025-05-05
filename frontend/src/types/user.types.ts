export interface User {
  id:          number;
  name:        string;
  lastname:    string;
  entryDate:   Date;
  email:       string;
  numberPhone: null;
  description: null;
  rolDtoList:  RolDtoList[];
  active:      boolean;
}

export interface RolDtoList {
  name: string;
}
