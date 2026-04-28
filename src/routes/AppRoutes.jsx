import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public pages
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

// Farmer pages
import FarmerDashboard from '../pages/farmer/FarmerDashboard';
import CropManagement from '../pages/farmer/CropManagement';
import AddCrop from '../pages/farmer/AddCrop';
import CropSuggestions from '../pages/farmer/CropSuggestions';
import DiseaseDetection from '../pages/farmer/DiseaseDetection';
import WeatherPage from '../pages/farmer/WeatherPage';

// Marketplace pages
import MarketplacePage from '../pages/marketplace/MarketplacePage';
import ProductDetail from '../pages/marketplace/ProductDetail';
import AddProduct from '../pages/marketplace/AddProduct';

// Admin pages
import AdminDashboard from '../pages/admin/AdminDashboard';

// Route protection
import { ProtectedRoute, AdminRoute, FarmerRoute } from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Marketplace & Weather (public — browse without login) */}
      <Route element={<MainLayout />}>
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/marketplace/:id" element={<ProductDetail />} />
        <Route path="/weather" element={<WeatherPage />} />
      </Route>
      <Route path="/marketplace/add" element={
        <ProtectedRoute>
          <AddProduct />
        </ProtectedRoute>
      } />

      {/* Farmer dashboard (farmer-only) */}
      <Route path="/dashboard" element={
        <FarmerRoute>
          <DashboardLayout />
        </FarmerRoute>
      }>
        <Route index element={<FarmerDashboard />} />
        <Route path="crops" element={<CropManagement />} />
        <Route path="crops/add" element={<AddCrop />} />
        <Route path="suggest" element={<CropSuggestions />} />
        <Route path="disease" element={<DiseaseDetection />} />
        <Route path="weather" element={<WeatherPage />} />
      </Route>

      {/* Admin dashboard (admin only) */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}
