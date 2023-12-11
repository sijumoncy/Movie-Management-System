import useAuth from "../../hooks/useAuth";
import useAppContext from "../../hooks/useAppContext";

const navItems = [
  { id: 1, name: "movies", link: "#" },
  { id: 2, name: "dashboard", link: "#" },
];

function Navbar() {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  const {currentMenu, setCurrentMenu} = useAppContext()

  return (
    <div className="w-full max-w-4xl mx-auto h-16 flex items-center justify-between px-5 shadow-md  border-b border-b-primary">
      <div className="text-xl font-semibold cursor-pointer text-primary">
        Movie World
      </div>
      <div className="">
        <ul className="flex gap-5 text-secondary">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer hover:text-secondary/75 ${currentMenu === item.name && 'text-white'}`}
              onClick={() => setCurrentMenu(item.name)}
            >
              {item.name}
            </li>
          ))}
          <li key={"logout"} className="cursor-pointer" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
