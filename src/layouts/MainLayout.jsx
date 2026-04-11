import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden px-8 md:px-16 lg:px-24">
      <Navbar placeholder="Learn More" />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
