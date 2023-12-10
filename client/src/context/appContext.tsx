import { createContext, useState } from "react";
import {
  AppContextInterface,
  AppProviderProps
} from "../Interface/appContext";

const AppContext = createContext<AppContextInterface>(
  {} as AppContextInterface
);

const AppContextProvider = ({ children }: AppProviderProps) => {
  const [currentMenu, setCurrentMenu] = useState('movies');
  
  return (
    <AppContext.Provider value={{ currentMenu, setCurrentMenu }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
