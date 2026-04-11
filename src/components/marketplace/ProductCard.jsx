import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="product-card overflow-hidden">
      {/* Image placeholder */}
      <div className="h-40 bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
        <span className="text-4xl">🥬</span>
      </div>

      <div className="p-5">
        <h3 className="text-white font-semibold text-base mb-1">{product.name}</h3>
        <p className="text-accent font-bold text-2xl mb-1">
          ${product.price.toFixed(2)}
          <span className="text-dark-muted text-sm font-normal">{product.unit}</span>
        </p>
        <hr className="border-dark-border my-3" />
        <p className="text-dark-muted text-sm mb-4 line-clamp-2">{product.description}</p>

        <ul className="space-y-2 text-sm mb-4">
          <li className="flex items-center gap-2 text-dark-text">
            <span className="w-2 h-2 rounded-full bg-dark-muted" />
            Freshness: {product.freshness}%
          </li>
          <li className="flex items-center gap-2 text-dark-text">
            <span className="w-2 h-2 rounded-full bg-dark-muted" />
            Location: {product.location}
          </li>
        </ul>

        <Link
          to={`/marketplace/${product.id}`}
          className="text-accent text-sm flex items-center gap-2 hover:underline no-underline"
        >
          <span className="w-2 h-2 rounded-full bg-dark-muted" />
          View Details
        </Link>
      </div>
    </div>
  );
}
