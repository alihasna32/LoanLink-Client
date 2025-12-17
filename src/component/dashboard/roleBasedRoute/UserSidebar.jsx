import { Link } from "react-router";
import { Wallet, User2 } from "lucide-react";

const UserSidebar = () => {
  return (
    <ul className="menu space-y-2 w-full">
      <li className="group">
        <Link to="/dashboard/my-loans" className="flex items-center justify-center lg:justify-start gap-3 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors">
          <Wallet size={20} className="text-sky-600" />
          <span className="hidden lg:inline font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400">My Loans</span>
          <span className="lg:hidden absolute left-16 bg-gray-900 text-white rounded px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
            My Loans
          </span>
        </Link>
      </li>

      <li className="group">
        <Link to="/dashboard/borrower-profile" className="flex items-center justify-center lg:justify-start gap-3 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors">
          <User2 size={20} className="text-orange-600" />
          <span className="hidden lg:inline font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400">My Profile</span>
          <span className="lg:hidden absolute left-16 bg-gray-900 text-white rounded px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
            My Profile
          </span>
        </Link>
      </li>
    </ul>
  );
};

export default UserSidebar;
