import React from "react";
import { Outlet, Link } from "react-router";
import Sidebar from "../component/dashboard/Sidebar";
import Footer from "../component/footer/Footer";
import logoImg from "../assets/logo.jpeg";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors duration-300">

      <div className="flex flex-1">

        {/* Sidebar */}
        <div>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1">

          {/* Navbar */}
          <nav className="navbar bg-brand-main px-6 w-full shadow-md text-white">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoImg} alt="loanlink" className="w-12 h-12 rounded-full border-2 border-white/30" />
              <h1 className="text-3xl font-bold tracking-tight text-shadow-sm">LoanLink</h1>
            </Link>
          </nav>

          {/* Outlet content */}
          <div className="p-6">
            <Outlet />
          </div>
        </div>

      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;