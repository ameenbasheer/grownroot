import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import ProductCard from '../components/marketplace/ProductCard';
import { useApp } from '../context/AppContext';
import { DecorativeCircle } from '../components/common/DecorativeElements';
import logo from '../assets/logo.png';

export default function LandingPage() {
  const { products } = useApp();
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="relative">
      <Hero />

      {/* Featured Products — browse without login */}
      <section className="py-20 relative">
        <DecorativeCircle size="lg" className="-top-20 right-1/4 opacity-15" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-white">Fresh from</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white">Local Farms</h3>
              <p className="text-dark-muted text-sm mt-2">
                Browse fresh produce directly from farmers — no account needed.
              </p>
            </div>
            <Link
              to="/marketplace"
              className="pill-btn hidden md:inline-flex items-center gap-2 text-sm !py-2.5 no-underline shrink-0"
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
              className="pill-btn inline-flex items-center gap-2 text-sm !py-2.5 no-underline"
            >
              View All Products
              <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Features />

      {/* Footer CTA */}
      <section className="py-20 relative overflow-hidden">
        <DecorativeCircle size="lg" className="-bottom-20 -left-20 opacity-20" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to grow smarter?
          </h2>
          <p className="text-dark-muted text-lg mb-8">
            Join thousands of farmers already using GrownRoot to manage their farms.
          </p>
          <a href="/register" className="pill-btn inline-flex text-lg !px-8 !py-4 no-underline">
            Start Free Today
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-border py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
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
