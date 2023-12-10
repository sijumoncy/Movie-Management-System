import { ReactNode, useEffect } from "react"
import useAppContext from "../../hooks/useAppContext"
import Movies from "./Movies"
import UserDashboard from "./UserDashboard"

const UserMenuAndComponents:{[key:string]:ReactNode} = {
    "movies" : <Movies/>,
    "dashboard" : <UserDashboard/>
}

function UserHome() {

    const {currentMenu} =  useAppContext()

    const loadCurrentComponent = () => {
        const component = UserMenuAndComponents[currentMenu]
        console.log({component});
        
        if(component){
            return component
        } else {
            return <Movies/>
        }
    }

    useEffect(() => {
        loadCurrentComponent()
    },[currentMenu])

  return (
    loadCurrentComponent()
  )
}

export default UserHome