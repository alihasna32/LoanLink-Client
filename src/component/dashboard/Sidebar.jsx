import React from "react";
import { Link, useNavigate } from "react-router";
import { FcHome } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../../shared/LoadingSpinner";
import UserSidebar from "./roleBasedRoute/UserSidebar";
import ManagerSidebar from "./roleBasedRoute/ManagerSidebar";
import AdminSidebar from "./roleBasedRoute/AdminSidebar";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const [role, isRoleLoading] = useRole();
  const { logOut } = useAuth();
  const navigate = useNavigate();

  if (isRoleLoading) return <LoadingSpinner />;


  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <aside
      className="
        bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-700 shadow-xl p-4 min-h-screen 
        w-16 md:w-20 lg:w-52 
        flex flex-col justify-between
        transition-all duration-300
        z-50
      "
    >

      <ul className="menu w-full space-y-2">

        {/* Homepage */}
        <li className="group">
          <Link to="/" className="flex items-center justify-center lg:justify-start gap-3 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors">
            <FcHome size={30} />
            <span className="hidden lg:inline-block font-medium text-gray-700 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-400">Homepage</span>

            <span className="lg:hidden absolute left-16 bg-gray-900 text-white rounded px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Homepage
            </span>
          </Link>
        </li>

        {/* Role Based Sidebar */}
        <div className="text-gray-600 dark:text-gray-300">
          {role === "borrower" && <UserSidebar />}
          {role === "manager" && <ManagerSidebar />}
          {role === "admin" && <AdminSidebar />}
        </div>
      </ul>


      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center lg:justify-start gap-3 w-full p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group"
        >
          <FiLogOut size={28} className="text-red-500" />

          <span className="hidden lg:inline-block text-red-600 font-medium">Logout</span>

          <span className="lg:hidden absolute left-16 bg-gray-900 text-white rounded px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity z-50">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
