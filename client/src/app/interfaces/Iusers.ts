export interface Iusers {
    id:string;
    username: string;
    email: string;
    token: string;
    imageUrl?:string;
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
