import Navbar from "./components/Nav/Navbar"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"

function App() {

  return (
    <>
      <div className="max-w-[1400px] mx-auto">
        <Navbar/>
        {/* <RegisterPage/> */}
        <LoginPage/>
      </div>
    </>
  )
}

export default App
