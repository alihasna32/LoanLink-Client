import React from "react";
import { FaEnvelope, FaIdBadge, FaUser, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import useRole from "../../../hooks/useRole";

const BorrowerProfile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [role] = useRole();

  const handleLogout = () => {
    logOut();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const userName = user?.name || user?.displayName || "Unknown User";

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-slate-700">

      <div className="flex items-center gap-6 border-b dark:border-slate-700 pb-6">
        <div>
          <img
            src={user?.image || user?.photoURL || "https://via.placeholder.com/150"}
            alt="User"
            className="w-28 h-28 rounded-full object-cover border-4 border-orange-300 shadow-md"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{userName}</h2>
          <p className="text-sm mt-1 px-3 py-1 rounded-full inline-block bg-orange-100 text-orange-600 font-semibold uppercase tracking-wider">
            {role || ""}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-800 p-4 rounded-lg border border-gray-100 dark:border-slate-700">
          <FaUser className="text-orange-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">{userName}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-800 p-4 rounded-lg border border-gray-100 dark:border-slate-700">
          <FaEnvelope className="text-sky-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-800 p-4 rounded-lg border border-gray-100 dark:border-slate-700">
          <FaIdBadge className="text-red-500 text-xl" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Account Role</p>
            <p className="font-medium capitalize text-gray-800 dark:text-gray-200">{role}</p>
          </div>
        </div>

      </div>

      <div className="text-end mt-8">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition w-fit ml-auto"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

    </div>
  );
};

export default BorrowerProfile;
