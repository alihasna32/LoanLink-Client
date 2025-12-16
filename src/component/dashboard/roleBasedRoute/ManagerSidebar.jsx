import { Link } from "react-router";
import { PlusCircle, ClipboardList, ClipboardCheck, User2 } from "lucide-react";

const ManagerSidebar = () => {
  return (
    <ul className="menu space-y-2 w-full">
      <li>
        <Link to="/dashboard/add-loan" className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors">
          <PlusCircle size={20} className="text-sky-600" />
          <span className="hidden md:inline font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400">Add Loan</span>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/manage-loans" className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors">
          <ClipboardList size={20} className="text-orange-600" />
          <span className="hidden md:inline font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400">Manage Loans</span>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/pending-loans" className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors">
          <ClipboardList size={25} className="text-red-500" />
          <span className="hidden md:inline font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400">Pending Applications</span>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/approved-loans" className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors">
          <ClipboardCheck size={25} className="text-emerald-500" />
          <span className="hidden md:inline font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400">Approved Applications</span>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/manager-profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors">
          <User2 size={20} className="text-sky-600" />
          <span className="hidden md:inline font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400">My Profile</span>
        </Link>
      </li>
    </ul>
  );
};

export default ManagerSidebar;
