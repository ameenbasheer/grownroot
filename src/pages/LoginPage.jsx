import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { DecorativeCircle, DecorativeDot } from '../components/common/DecorativeElements';
import logo from '../assets/logo.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    // If user was trying to buy a product, send them back there
    if (redirectTo) {
      navigate(redirectTo);
    } else if (email === 'admin@grownroot.com') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative */}
      <DecorativeCircle size="xl" className="-top-40 -left-40 opacity-30" />
      <DecorativeCircle size="lg" className="-bottom-32 -right-32 opacity-20" />
      <DecorativeDot size={30} className="top-32 right-1/4 bg-accent/30" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
        {/* Left content */}
        <div className="text-center lg:text-left">
          <Link to="/" className="flex items-center no-underline mb-8 lg:inline-flex justify-center lg:justify-start">
            <img src={logo} alt="GrownRoot" className="h-9 w-auto object-contain" />
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Welcome<br /><span className="text-accent">Back</span>
          </h1>

          <div className="border-l-2 border-accent pl-4 my-6">
            <p className="text-dark-text text-sm">
              Sign in to manage your farm smarter.
            </p>
          </div>

          <p className="text-dark-muted text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
            Access your dashboard, track crops, monitor weather, and connect with buyers.
            New to GrownRoot? Create an account to get started.
          </p>
        </div>

        {/* Right: login form area */}
        <div>
          {/* Image placeholder */}
          <div className="img-showcase mb-8 h-56 bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
            <span className="text-5xl">👨‍🌾</span>
          </div>

          {/* Action buttons */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="glass-card p-4">
                <label className="text-dark-muted text-xs block mb-2">Email</label>
                <div className="flex items-center gap-2">
                  <FiMail className="text-accent" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmer@grownroot.com"
                    className="bg-transparent border-none outline-none text-white text-sm flex-1 placeholder:text-dark-muted"
                    required
                  />
                </div>
              </div>

              <div className="glass-card p-4">
                <label className="text-dark-muted text-xs block mb-2">Password</label>
                <div className="flex items-center gap-2">
                  <FiLock className="text-accent" size={16} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-transparent border-none outline-none text-white text-sm flex-1 placeholder:text-dark-muted"
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="pill-btn w-full flex items-center justify-center gap-2 !py-3 text-base hover:!bg-accent/10"
            >
              <FiLogIn size={18} />
              Email & password login
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button type="button" className="pill-btn w-full !py-2.5 text-sm">
                Quick social sign-in
              </button>
              <Link to="/register" className="pill-btn w-full !py-2.5 text-sm text-center no-underline flex items-center justify-center">
                Easy registration
              </Link>
            </div>

            <button type="button" className="pill-btn w-full !py-2.5 text-sm">
              Password recovery
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
