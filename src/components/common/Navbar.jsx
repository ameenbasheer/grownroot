import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

export default function Navbar({ placeholder = 'Search...' }) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="w-full flex items-center justify-between py-4 relative z-10">
      <Link to="/" className="flex items-center no-underline">
        <img src={logo} alt="GrownRoot" className="h-20 w-auto object-contain" />
      </Link>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center search-input px-4 py-2 w-64 lg:w-80">
          <input
            type="text"
            placeholder={placeholder}
            className="bg-transparent border-none outline-none text-dark-text text-sm flex-1 placeholder:text-dark-muted"
          />
          <FiSearch className="text-accent ml-2" />
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <span className="text-dark-text text-sm hidden lg:block">
              {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="pill-btn flex items-center gap-2 text-sm !py-2 !px-4"
            >
              <FiLogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="pill-btn text-sm no-underline !py-2 !px-4 flex items-center gap-1">
              <FiUser size={14} />
              Login
            </Link>
            <Link to="/register" className="pill-btn text-sm no-underline !py-2 !px-4 hidden sm:flex">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
