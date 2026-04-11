import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import StatsCard from '../../components/dashboard/StatsCard';
import WeatherOverview from '../../components/dashboard/WeatherOverview';
import QuickActions from '../../components/dashboard/QuickActions';
import { DecorativeCircle, DecorativeDot } from '../../components/common/DecorativeElements';

export default function FarmerDashboard() {
  const { crops, products } = useApp();
  const { user } = useAuth();

  return (
    <div className="relative">
      <DecorativeCircle size="lg" className="-top-20 -left-20 opacity-20" />
      <DecorativeDot size={20} className="top-16 left-1/3 bg-accent/30" />
      <DecorativeDot size={12} className="top-32 right-1/4 bg-accent/20" />

      {/* Page header */}
      <div className="mb-8 relative z-10">
        <h1 className="text-3xl md:text-4xl font-light text-white">Farmer</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Left column */}
        <div className="lg:col-span-1 space-y-4">
          {/* Center image */}
          <div className="img-showcase h-64 lg:h-80 bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
            <span className="text-6xl">📊</span>
          </div>

          <StatsCard
            number="01"
            label={`Total Crops: ${crops.length} Active`}
          />

          <StatsCard
            number="02"
            label="Active Marketplace Listings"
            subtitle={`${products.length} products listed`}
          />
        </div>

        {/* Center: Dashboard image */}
        <div className="lg:col-span-1">
          <div className="img-showcase h-64 lg:h-full bg-gradient-to-b from-accent/5 to-primary/10 flex items-center justify-center">
            <div className="text-center p-6">
              <span className="text-7xl block mb-4">🌾</span>
              <p className="text-dark-muted text-sm">Smart Agriculture Dashboard</p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-1 space-y-4">
          <WeatherOverview />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
