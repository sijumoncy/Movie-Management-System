import { createContext, useEffect, useState } from "react";
import {
  AuthContextInterface,
  AuthProviderProps,
  IAuthObject,
} from "../Interface/authContext";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

const AuthInitialState = {
  tokens: {
    access: { expires: "", token: "" },
    refresh: { expires: "", token: "" },
  },
  user: {
    email: "",
    id: "",
    isAdmin: false,
    name: "",
  },
}

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<IAuthObject>(AuthInitialState);

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('auth')
    navigate('/login')
    setAuth(AuthInitialState)
  }

  useEffect(() => {
    console.log("in useffect ");
    
    const authState = localStorage.getItem('auth')
    if(authState){
      console.log({auth});
      setAuth(JSON.parse(authState))
    }
  },[])

  console.log("=============>", {auth});
  

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
