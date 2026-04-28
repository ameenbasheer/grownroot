import { Link } from 'react-router-dom';
import { FiArrowRight, FiSun, FiDroplet, FiCloudRain } from 'react-icons/fi';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import ProductCard from '../components/marketplace/ProductCard';
import { useApp } from '../context/AppContext';
import { DecorativeCircle } from '../components/common/DecorativeElements';
import logo from '../assets/logo.png';

export default function LandingPage() {
  const { products, weather } = useApp();
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="relative">
      <Hero />

      {/* Featured Products — browse without login */}
      <section className="py-20 relative mt-5">
        <DecorativeCircle size="lg" className="-top-20 right-1/4 opacity-15" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 mt-5   ">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-white leading-tight ">Fresh from Local Farms</h2>
              <p className="text-dark-muted text-sm  mb-5">
                Browse fresh produce directly from farmers — no account needed.
              </p>
            </div>
            <Link
              to="/marketplace"
              className="pill-btn hidden md:inline-flex items-center gap-2 text-sm !py-2.5 shrink-0"
            >
              View All
              <FiArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/marketplace"
              className="pill-btn inline-flex items-center gap-2 text-sm !py-2.5 mb-5"
            >
              View All Products
              <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Weather at a glance — public */}
      <section className="py-20 relative">
        <DecorativeCircle size="md" className="-top-10 left-1/4 opacity-10" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 mt-5">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">Today's Weather</h2>
              <p className="text-dark-muted text-sm mb-5">
                Real-time conditions to help plan your day.
              </p>
            </div>
            <Link
              to="/weather"
              className="pill-btn hidden md:inline-flex items-center gap-2 text-sm !py-2.5 shrink-0 mb-5"
            >
              Full Forecast
              <FiArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card p-2 flex items-center gap-4 px-3 py-3">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                <FiSun size={26} />
              </div>
              <div className="   min-w-0">
                <p className="text-dark-muted text-xs uppercase tracking-wider">Temperature</p>
                <p className="text-white font-bold text-2xl leading-tight ">
                  {weather.temperature}°C
                </p>
                <p className="text-accent text-xs ">{weather.condition}</p>
              </div>
            </div>
            <div className="glass-card p-2 flex items-center gap-4 px-3 py-3">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                <FiDroplet size={26} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-dark-muted text-xs uppercase tracking-wider">Humidity</p>
                <p className="text-white font-bold text-2xl leading-tight ">
                  {weather.humidity}%
                </p>
                <p className="text-dark-muted text-xs ">Comfort level</p>
              </div>
            </div>
            <div className="glass-card p-2 flex items-center gap-4 px-3 py-3">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                <FiCloudRain size={26} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-dark-muted text-xs uppercase tracking-wider">Rainfall</p>
                <p className="text-white font-bold text-2xl leading-tight ">
                  {weather.rainfall}mm
                </p>
                <p className="text-dark-muted text-xs ">Last 24 hours</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link
              to="/weather"
              className="pill-btn inline-flex items-center gap-2 text-sm !py-2.5"
            >
              Full Forecast
              <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-dark-border my-20" />

      <Features />

      {/* Footer CTA */}
      <section className="py-20 relative overflow-hidden">
        <DecorativeCircle size="lg" className="-bottom-20 -left-20 opacity-20" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight  mt-5">
            Ready to grow smarter?
          </h2>
          <p className="text-dark-muted text-sm mb-5">
            Join thousands of farmers already using GrownRoot to manage their farms.
          </p>
          <Link to="/register" className="pill-btn inline-flex text-sm !px-6 !py-3 mb-5">
            Start Free Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-border py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="flex items-center">
            <img src={logo} alt="GrownRoot" className="h-8 w-auto object-contain" />
          </span>
          <p className="text-dark-muted text-sm">
            &copy; 2026 GrownRoot. Smart farming made simple.
          </p>
        </div>
      </footer>
    </div>
  );
}
