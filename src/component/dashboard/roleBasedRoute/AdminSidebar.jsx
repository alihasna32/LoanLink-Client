import { Link } from "react-router";
import { Users, FileText, Layers } from "lucide-react";

const AdminSidebar = () => {
  return (
    <ul className="menu space-y-2 w-full">
      <li>
        <Link to="/dashboard/manage-users" className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors">
          <Users size={22} className="text-orange-600" />
          <span className="hidden md:inline font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400">Manage Users</span>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/all-loan" className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors">
          <Layers size={22} className="text-sky-600" />
          <span className="hidden md:inline font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400">All Loan</span>
        </Link>
      </li>

      <li>
        <Link to="/dashboard/loan-applications" className="flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors">
          <FileText size={22} className="text-red-500" />
          <span className="hidden md:inline font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400">Loan Applications</span>
        </Link>
      </li>
    </ul>
  );
};

export default AdminSidebar;
