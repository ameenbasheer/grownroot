import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-dark relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 py-4 md:py-6">
        <Navbar />
        <main className="pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
