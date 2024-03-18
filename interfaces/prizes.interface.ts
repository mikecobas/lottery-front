
export interface PrizesResponse {
    status:  number;
    error:   boolean;
    msg:     string;
    payload: Payload[];
}

export interface Payload {
    _id?:            string;
    name?:           string;
    description?:    string;
    status?:         boolean;
    contestId?:      string;
    orderToLot?:     number;
    image?:          string;
    markAsDelivery?: boolean;
    createdAt?:      string;
    updatedAt?:      string;
    winner?:         string;
}
