import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiUserPlus } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { DecorativeCircle } from '../components/common/DecorativeElements';
import logo from '../assets/logo.png';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [formError, setFormError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    register({ name: formData.name, email: formData.email });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4 relative overflow-hidden">
      <DecorativeCircle size="xl" className="-top-40 -right-40 opacity-30" />
      <DecorativeCircle size="lg" className="-bottom-32 -left-32 opacity-20" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
        {/* Left content */}
        <div className="text-center lg:text-left">
          <Link to="/" className="flex items-center no-underline mb-8 lg:inline-flex justify-center lg:justify-start">
            <img src={logo} alt="GrownRoot" className="h-9 w-auto object-contain" />
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Join<br /><span className="text-accent">GrownRoot</span>
          </h1>

          <div className="border-l-2 border-accent pl-4 my-6">
            <p className="text-dark-text text-sm">
              Create your account and start farming smarter.
            </p>
          </div>

          <p className="text-dark-muted text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
            Get access to crop management, disease detection, weather forecasts,
            and a marketplace to sell your products directly to buyers.
          </p>
        </div>

        {/* Right: register form */}
        <div>
          <div className="img-showcase mb-8 h-48 bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
            <span className="text-5xl">🌾</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="glass-card p-4">
                <label className="text-dark-muted text-xs block mb-2">Full Name</label>
                <div className="flex items-center gap-2">
                  <FiUser className="text-accent" size={16} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Maria Santos"
                    className="bg-transparent border-none outline-none text-white text-sm flex-1 placeholder:text-dark-muted"
                    required
                  />
                </div>
              </div>

              <div className="glass-card p-4">
                <label className="text-dark-muted text-xs block mb-2">Email</label>
                <div className="flex items-center gap-2">
                  <FiMail className="text-accent" size={16} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="maria@farm.com"
                    className="bg-transparent border-none outline-none text-white text-sm flex-1 placeholder:text-dark-muted"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="glass-card p-4">
                <label className="text-dark-muted text-xs block mb-2">Password</label>
                <div className="flex items-center gap-2">
                  <FiLock className="text-accent" size={16} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-transparent border-none outline-none text-white text-sm flex-1 placeholder:text-dark-muted"
                    required
                  />
                </div>
              </div>

              <div className="glass-card p-4">
                <label className="text-dark-muted text-xs block mb-2">Confirm Password</label>
                <div className="flex items-center gap-2">
                  <FiLock className="text-accent" size={16} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-transparent border-none outline-none text-white text-sm flex-1 placeholder:text-dark-muted"
                    required
                  />
                </div>
              </div>
            </div>

            {formError && (
              <p className="text-red-400 text-sm text-center">{formError}</p>
            )}

            <button
              type="submit"
              className="pill-btn w-full flex items-center justify-center gap-2 !py-3 text-base hover:!bg-accent/10"
            >
              <FiUserPlus size={18} />
              Create Account
            </button>

            <p className="text-dark-muted text-sm text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-accent hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
