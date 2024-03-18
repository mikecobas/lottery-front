export interface ContestData {
    status:  number;
    error:   boolean;
    msg:     string;
    payload: Payload[];
}

export interface Payload {
    contest:         Contest;
    prizes:          Prize[];
    registeredUsers: any[];
}

export interface Contest {
    contestStatus: string;
    _id:           string;
    name:          string;
    status:        boolean;
    rounds:        number;
    contestDate:   string;
    createdBy:     string;
    image:         string;
    createdAt:     string;
}

export interface Prize {
    _id:            string;
    name:           string;
    description:    string;
    status:         boolean;
    contestId:      string;
    orderToLot:     number;
    image:          string;
    markAsDelivery: boolean;
    createdAt:      string;
    updatedAt:      string;
    winner:         string;
}
