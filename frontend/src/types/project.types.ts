export type Project = {
  name: string;
  description: string;
  dateStart: Date;
  dateDeliver: Date;
  priority: string;
  stateDto: StateDto;
  active: boolean;
  userRolProjectRequestList: UserRolProjectRequestList[];
};

export type StateDto = {
  name: string;
};

export type UserRolProjectRequestList = {
  id: number;
  email: string;
  rolProject: string;
};
