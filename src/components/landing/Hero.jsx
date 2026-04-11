import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { DecorativeCircle, DecorativeDot } from '../common/DecorativeElements';
import farmIllustration from '../../assets/farm_illustration.jpg';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Decorative elements */}
      <DecorativeCircle size="xl" className="-top-32 -left-48" />
      <DecorativeCircle size="md" className="top-60 left-72 opacity-40" />
      <DecorativeCircle size="lg" className="-bottom-32 -right-32 opacity-30" />
      <DecorativeDot size={40} className="top-40 left-64 bg-accent/50" />
      <DecorativeDot size={24} className="top-72 right-1/4 bg-accent/20" />
      <DecorativeDot size={20} className="bottom-32 right-48 bg-dark-muted/30" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Text */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            From Root<br />
            <span className="text-accent">to Growth.</span>
          </h1>
          <p className="text-dark-muted text-lg md:text-xl mb-10 max-w-lg mx-auto lg:mx-0">
            Smart farming made simple — manage, grow, and sell.
          </p>
          <Link
            to="/register"
            className="pill-btn inline-flex items-center gap-4 text-lg !px-8 !py-4 no-underline"
          >
            Get Started
            <span className="w-10 h-10 rounded-full border border-accent/40 flex items-center justify-center">
              <FiArrowRight className="text-accent" />
            </span>
          </Link>
        </div>

        {/* Right: Farm illustration placeholder */}
        <div className="hidden lg:flex justify-center">
          <div className="w-full max-w-md aspect-square rounded-3xl border border-dark-border overflow-hidden">
            <img src={farmIllustration} alt="Farm illustration" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
