import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from '../shared/ScrollToTop';

const MainLayout = () => {

  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: true,
    });
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <ScrollToTop></ScrollToTop>
      <Navbar></Navbar>
      <div className='min-h-[calc(100vh-350px)]'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;