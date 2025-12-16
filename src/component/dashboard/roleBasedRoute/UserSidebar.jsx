import { Link } from "react-router";
import { Wallet, User2 } from "lucide-react";

const UserSidebar = () => {
  return (
    <ul className="menu space-y-2 w-full">
      <li>
        <Link to="/dashboard/my-loans" className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors">
          <Wallet size={20} className="text-sky-600" />
          <span className="hidden md:inline font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400">My Loans</span>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/borrower-profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors">
          <User2 size={20} className="text-orange-600" />
          <span className="hidden md:inline font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400">My Profile</span>
        </Link>
      </li>
    </ul>
  );
};

export default UserSidebar;
