import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiShoppingCart, FiZap } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { DecorativeCircle } from '../../components/common/DecorativeElements';

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useApp();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const product = products.find(p => p.id === Number(id));

  const requireAuth = (action) => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/marketplace/${id}`);
      return;
    }
    // User is logged in — show success feedback
    setShowSuccess(action);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Product not found</p>
          <Link to="/marketplace" className="text-accent hover:underline">
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      <DecorativeCircle size="lg" className="-top-32 right-1/3 opacity-15" />

      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-8 relative z-10">
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-dark-muted hover:text-accent text-sm mb-8 no-underline transition-colors"
        >
          <FiArrowLeft size={16} />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Farmer quote card */}
          <div className="glass-card p-6 text-center">
            <span className="text-accent text-4xl font-serif block mb-4">&ldquo;&rdquo;</span>
            <h3 className="text-white font-bold text-lg">{product.name}</h3>
            <p className="text-accent font-semibold mb-4">
              ${product.price.toFixed(2)}{product.unit}
            </p>
            <p className="text-dark-muted text-sm leading-relaxed italic mb-4">
              &ldquo;Fresh from my family farm to your table. We use only organic methods
              and harvest at peak ripeness for the best flavor.&rdquo;
            </p>
            <p className="text-dark-text text-sm">
              — {product.farmer}, Local Farmer
            </p>
          </div>

          {/* Center: Product image */}
          <div className="img-showcase h-72 lg:h-auto bg-gradient-to-br from-accent/8 to-primary/10 flex items-center justify-center">
            <span className="text-7xl">🍅</span>
          </div>

          {/* Right: Product details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-light text-white">Product</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Details</h2>

            <p className="text-dark-muted text-sm leading-relaxed mb-6">
              {product.description} Available in 1kg and 5kg packages.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-dark-text text-sm">
                <span className="w-2 h-2 rounded-full bg-accent/40" />
                Freshness: {product.freshness}%
              </div>
              <div className="flex items-center gap-3 text-dark-text text-sm">
                <span className="w-2 h-2 rounded-full bg-accent/40" />
                Location: {product.location}
              </div>
              <div className="flex items-center gap-3 text-dark-text text-sm">
                <span className="w-2 h-2 rounded-full bg-accent/40" />
                Category: {product.category}
              </div>
            </div>
          </div>
        </div>

        {/* Success toast */}
        {showSuccess && (
          <div className="fixed top-6 right-6 z-50 glass-card border border-accent/40 px-6 py-3 flex items-center gap-3 animate-pulse">
            <FiCheckCircle className="text-accent" size={18} />
            <span className="text-white text-sm">
              {showSuccess === 'buy' ? 'Order placed successfully!' : 'Added to cart!'}
            </span>
          </div>
        )}

        {/* Buy actions + badges */}
        <div className="mt-8 glass-card p-5">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <button
              onClick={() => requireAuth('buy')}
              className="pill-btn flex items-center gap-2 text-sm !py-3 !px-6 !bg-accent/20 hover:!bg-accent/30"
            >
              <FiZap size={16} />
              Buy Now
            </button>
            <button
              onClick={() => requireAuth('cart')}
              className="pill-btn flex items-center gap-2 text-sm !py-3 !px-6"
            >
              <FiShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent/30" />
              <span className="text-dark-muted text-sm">100% Organic</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent/40" />
              <span className="text-dark-muted text-sm">Same-day harvest</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent/50" />
              <span className="text-dark-muted text-sm">Farm-to-table fresh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
