import { Link } from 'react-router-dom';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';

export default function ProductCard({ product }) {
  console.log('product', product);

  return (
    <div className="product-card overflow-hidden flex flex-col">
      <div className="h-56 bg-gradient-to-br from-accent/15 to-primary/15 flex items-center justify-center relative">

        <img src={product.image} alt="product image" className="w-full h-full object-cover" />
        <span className="absolute top-3 right-3 text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-dark-bg/60 border border-accent/30 text-accent">
          Fresh {product.freshness}%
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-semibold text-base mb-1">{product.name}</h3>
        <p className="text-accent font-bold text-2xl mb-1">
          ${product.price.toFixed(2)}
          <span className="text-dark-muted text-sm font-normal">{product.unit}</span>
        </p>
        <hr className="border-dark-border my-3" />
        <p className="text-dark-muted text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2 text-dark-text text-sm mb-4">
          <FiMapPin size={14} className="text-accent" />
          <span>{product.location}</span>
        </div>

        <Link
          to={`/marketplace/${product.id}`}
          className="mt-auto inline-flex items-center justify-between gap-2 text-accent text-sm font-medium py-2 px-4 rounded-full border border-accent/30 hover:bg-accent/10 transition-colors"
        >
          View Details
          <FiArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
