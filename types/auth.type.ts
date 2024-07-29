export default interface IAuth {
    id: string;
    name: string;
    email: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface ISignUp extends ILogin{
    name: string;
}   