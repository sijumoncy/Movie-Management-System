

export interface AppContextInterface {
    currentMenu:string,
    setCurrentMenu: React.Dispatch<React.SetStateAction<string>>
    
}
  
export interface AppProviderProps {
    children: React.ReactNode
}
    