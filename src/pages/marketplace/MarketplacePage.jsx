import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../components/marketplace/ProductCard';
import SearchBar from '../../components/common/SearchBar';
import { DecorativeCircle } from '../../components/common/DecorativeElements';

export default function MarketplacePage() {
  const { products } = useApp();
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState('');

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      <DecorativeCircle size="xl" className="-bottom-40 -left-40 opacity-15" />

      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-light text-white">Marketplace</h1>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Browse Products</h2>
          </div>
          <div className="flex items-center gap-4">
            <SearchBar
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {isAuthenticated && (
              <Link
                to="/marketplace/add"
                className="pill-btn flex items-center gap-2 text-sm !py-2.5 no-underline shrink-0"
              >
                <FiPlus size={16} />
                Add Product
              </Link>
            )}
          </div>
        </div>

        {/* Intro section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          <div className="lg:col-span-1">
            <div className="text-center lg:text-left mb-6">
              <span className="text-6xl block mb-4">🧺</span>
            </div>
            <p className="text-dark-muted text-sm leading-relaxed">
              Browse fresh produce directly from local farmers.
              Quality guaranteed with farm-to-table freshness.
            </p>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-dark-muted text-lg">No products found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
