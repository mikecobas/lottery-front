export interface ContestResponse {
  status: number;
  error: boolean;
  msg: string;
  payload: Contest[] | Contest;
}

export interface Contest {
  _id?: string;
  name: string;
  status: boolean;
  rounds?: number;
  contestDate?: string;
  createdBy?: string;
  image?: string;
  createdAt?: string;
}
