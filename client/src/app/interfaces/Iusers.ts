export interface Iusers {
    id:string;
    username: string;
    email: string;
    token: string;
    photoUrl?:string;
}

export interface Ilogin {
    email: string;
    password: string;
}

export interface Iregister {
    username: string;
    email: string;
    password: string;
}
