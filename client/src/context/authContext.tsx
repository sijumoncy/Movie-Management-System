import { createContext, useState } from "react";
import {
  AuthContextInterface,
  AuthProviderProps,
  IAuthObject,
} from "../Interface/authContext";

const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<IAuthObject>({
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
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
