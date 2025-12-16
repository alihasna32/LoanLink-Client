import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import logoImg from "../../assets/logo.jpeg";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Apply theme
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logout Successful");
    } catch (err) {
      toast.error("Logout Failed");
      console.log(err);
    }
  };

  const activeClass = "text-white border-b-2 border-white font-semibold";
  const normalClass =
    "hover:text-blue-200 dark:hover:text-blue-300 font-semibold";

  return (
    <nav className="fixed w-full bg-brand-main z-50 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 cursor-pointer">
            <img
              src={logoImg}
              alt="loanlink"
              className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover border-2 border-white/20"
            />
            <h1 className="text-xl md:text-3xl font-bold text-white tracking-tight text-shadow-sm">
              LoanLink
            </h1>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {["/", "/all-loans", "/about", "/contact"].map((path, idx) => {
              const labels = ["Home", "All Loans", "About Us", "Contact"];
              return (
                <NavLink
                  key={idx}
                  to={path}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  {labels[idx]}
                </NavLink>
              );
            })}

            {!user ? (
              <div className="flex items-center gap-4">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Register
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  Dashboard
                </NavLink>

                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white/50"
                    referrerPolicy="no-referrer"
                  />
                )}

                <button
                  onClick={handleLogout}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm"
                >
                  Logout
                </button>
              </div>
            )}

            <label className="flex items-center gap-2 cursor-pointer ml-2">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={(e) => handleTheme(e.target.checked)}
                className="toggle theme-controller border-white bg-white checked:bg-sky-300 hover:bg-sky-200"
              />
            </label>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden relative" ref={menuRef}>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 p-1.5 border border-white/30 bg-white/10 rounded-full cursor-pointer hover:bg-white/20 transition-all"
            >
              <AiOutlineMenu className="text-white" size={20} />
              {user && user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover border border-white/50"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            {/* Mobile Dropdown */}
            <div
              className={`absolute right-0 top-full mt-3 w-64 bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden transform transition-all duration-300 origin-top-right z-50 ${isOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
            >
              <div className="py-2">
                {["/", "/all-loans", "/about", "/contact"].map((path, idx) => {
                  const labels = ["Home", "All Loans", "About Us", "Contact"];
                  return (
                    <NavLink
                      key={idx}
                      to={path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        (isActive
                          ? "bg-orange-50 text-orange-600 font-semibold dark:bg-gray-700 dark:text-orange-400"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700") +
                        " block px-5 py-3 transition-colors"
                      }
                    >
                      {labels[idx]}
                    </NavLink>
                  );
                })}

                <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>

                {!user ? (
                  <>
                    <NavLink
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-5 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block px-5 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Register
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block px-5 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-5 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </>
                )}

                <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={theme === "dark"}
                      onChange={(e) => handleTheme(e.target.checked)}
                      className="toggle toggle-sm theme-controller text-orange-500"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
