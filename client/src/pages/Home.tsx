import Navbar from "../components/Nav/Navbar";
import UserHome from "../components/UserHome/UserHome";
import { AppContextProvider } from "../context/appContext";
import useAuth from "../hooks/useAuth";
import AdminHomePage from "./AdminHome";

function HomePage() {
  const { auth } = useAuth();

  return (
    <div className="">
      {auth.user?.isAdmin ? (
        <AdminHomePage />
      ) : (
        <>
          <AppContextProvider>
            <Navbar />
            <UserHome />
          </AppContextProvider>
        </>
      )}
    </div>
  );
}

export default HomePage;
