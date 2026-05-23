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

      <div className="w-full px-8 md:px-16 lg:px-24 py-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-light text-dark-text">Marketplace</h1>
            <h2 className="text-[11px] font-bold text-dark-text">Browse Products</h2>
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

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
  );
}
