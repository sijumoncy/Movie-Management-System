export interface IUser {
    name:string;
    email:string;
    isAdmin:boolean;
    id:string;
}

export interface IAuthObject {
    tokens : {
        access: {expires:string, token:string},
        refresh: {expires:string, token:string},
    }
    user : IUser
}

export interface AuthContextInterface {
    auth:IAuthObject,
    setAuth: React.Dispatch<React.SetStateAction<IAuthObject>>
}
  
export interface AuthProviderProps {
    children: React.ReactNode
}
    