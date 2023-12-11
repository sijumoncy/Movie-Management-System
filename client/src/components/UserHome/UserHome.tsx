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
    <div className="mt-10 mx-10 min-h-[80vh] outline">
        {loadCurrentComponent()}
    </div>
  )
}

export default UserHome