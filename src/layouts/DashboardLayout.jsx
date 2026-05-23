import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FiHome, FiSun, FiShield, FiCloudRain, FiShoppingBag, FiPlus, FiMenu, FiZap, FiCalendar } from 'react-icons/fi';
import Sidebar from '../components/common/Sidebar';
import MobileSidebar from '../components/common/MobileSidebar';
import Navbar from '../components/common/Navbar';

const farmerLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: <FiHome />, end: true },
  { to: '/dashboard/crops', label: 'Manage Crops', icon: <FiSun /> },
  { to: '/dashboard/crops/add', label: 'Add Crop', icon: <FiPlus /> },
  { to: '/dashboard/calendar', label: 'Farmer Calendar', icon: <FiCalendar /> },
  { to: '/dashboard/suggest', label: 'AI Suggestions', icon: <FiZap /> },
  { to: '/dashboard/disease', label: 'Disease Detection', icon: <FiShield /> },
  { to: '/dashboard/weather', label: 'Weather', icon: <FiCloudRain /> },
  { to: '/marketplace', label: 'Marketplace', icon: <FiShoppingBag /> },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-dark flex pe-4">
      <Sidebar links={farmerLinks} />
      <MobileSidebar
        links={farmerLinks}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <div className="flex items-center md:hidden px-6 pt-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white p-2 hover:bg-white/5 rounded-lg"
          >
            <FiMenu size={22} />
          </button>
        </div>
        <div className="hidden md:block px-8 md:px-10 lg:px-12">
          <Navbar />
        </div>
        <main className="flex-1 p-6 md:px-10 md:py-8 lg:px-12 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
