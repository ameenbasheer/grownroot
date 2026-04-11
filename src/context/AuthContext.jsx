import { createContext, useContext, useReducer } from 'react';
import { authReducer, initialAuthState, AUTH_ACTIONS } from '../reducers/authReducer';

const AuthContext = createContext(null);

// Demo users for static prototype
const DEMO_USERS = {
  farmer: { id: 1, name: 'Maria Santos', email: 'farmer@grownroot.com', role: 'farmer', avatar: null },
  admin: { id: 99, name: 'Admin User', email: 'admin@grownroot.com', role: 'admin', avatar: null },
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = (email, password) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    // Static login — will be replaced with API call
    if (email === 'admin@grownroot.com') {
      dispatch({ type: AUTH_ACTIONS.LOGIN, payload: DEMO_USERS.admin });
    } else {
      dispatch({ type: AUTH_ACTIONS.LOGIN, payload: DEMO_USERS.farmer });
    }
  };

  const register = (userData) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'farmer',
      avatar: null,
    };
    dispatch({ type: AUTH_ACTIONS.REGISTER, payload: newUser });
  };

  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
