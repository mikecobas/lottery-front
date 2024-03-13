export interface ConstestResponse {
  status: number;
  error: boolean;
  msg: string;
  payload: Contest[];
}

export interface Contest {
  name: string;
  description: string;
  status: boolean;
  contestId: string;
  orderToLot: number;
  image: string;
  markAsDelivery: boolean;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
