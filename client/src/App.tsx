import RequireAuth from "./components/RequireAuth/RequireAuth";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/Register";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* protected */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
