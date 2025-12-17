import { Link } from "react-router";
import { Users, FileText, Layers } from "lucide-react";

const AdminSidebar = () => {
  return (
    <ul className="menu space-y-2 w-full">
      <li className="group">
        <Link to="/dashboard/manage-users" className="flex items-center justify-center lg:justify-start gap-3 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors">
          <Users size={22} className="text-orange-600" />
          <span className="hidden lg:inline font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400">Manage Users</span>
          <span className="lg:hidden absolute left-16 bg-gray-900 text-white rounded px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
            Manage Users
          </span>
        </Link>
      </li>

      <li className="group">
        <Link to="/dashboard/all-loan" className="flex items-center justify-center lg:justify-start gap-3 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors">
          <Layers size={22} className="text-sky-600" />
          <span className="hidden lg:inline font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400">All Loan</span>
          <span className="lg:hidden absolute left-16 bg-gray-900 text-white rounded px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
            All Loan
          </span>
        </Link>
      </li>

      <li className="group">
        <Link to="/dashboard/loan-applications" className="flex items-center justify-center lg:justify-start gap-3 p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors">
          <FileText size={22} className="text-red-500" />
          <span className="hidden lg:inline font-medium group-hover:text-orange-600 dark:group-hover:text-orange-400">Loan Applications</span>
          <span className="lg:hidden absolute left-16 bg-gray-900 text-white rounded px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
            Loan Applications
          </span>
        </Link>
      </li>
    </ul>
  );
};

export default AdminSidebar;
