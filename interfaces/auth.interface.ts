export interface AuthResponse {
    status:  number;
    error:   boolean;
    msg:     string;
    payload: Payload;
}

export interface Payload {
    user:  User;
    token: string;
}

export interface User {
    name:      string;
    email:     string;
    role:      string;
    status:    boolean;
    createdAt: string;
    uid:       string;
}
