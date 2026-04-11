import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiSave, FiArrowLeft, FiUploadCloud } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { DecorativeCircle } from '../../components/common/DecorativeElements';

export default function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    unit: '/kg',
    description: '',
    category: 'Vegetables',
    location: '',
    farmer: '',
    freshness: 95,
    organic: true,
  });
  const { addProduct } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ ...form, price: parseFloat(form.price), image: null });
    navigate('/marketplace');
  };

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      <DecorativeCircle size="xl" className="-top-40 -left-40 opacity-15" />
      <DecorativeCircle size="md" className="bottom-20 right-20 opacity-10" />

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-8 relative z-10">
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-dark-muted hover:text-accent text-sm mb-6 no-underline transition-colors"
        >
          <FiArrowLeft size={16} />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-light text-white">Add New</h1>
            <h2 className="text-4xl md:text-5xl font-bold text-accent mb-6">Product</h2>

            <div className="border-l-2 border-accent pl-4 mb-6">
              <p className="text-dark-text text-sm font-medium">
                List your farm products for direct sale to buyers.
              </p>
            </div>

            <p className="text-dark-muted text-sm leading-relaxed">
              Complete the form to add your product to the marketplace.
              Include clear photos and accurate details to attract more buyers.
            </p>

            {/* Image upload placeholder */}
            <div className="img-showcase mt-6 h-52 bg-gradient-to-br from-accent/5 to-primary/5 flex items-center justify-center cursor-pointer">
              <div className="text-center">
                <FiUploadCloud size={36} className="text-accent/40 mx-auto mb-2" />
                <p className="text-dark-muted text-xs">Upload product photos</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="glass-card p-4 sm:col-span-2">
                <label className="text-dark-muted text-xs block mb-2">Product Name & Description</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Fresh Tomatoes"
                  className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-dark-muted mb-3"
                  required
                />
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your product..."
                  rows={3}
                  className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-dark-muted resize-none"
                  required
                />
              </div>

              <div className="glass-card p-4">
                <label className="text-dark-muted text-xs block mb-2">Category selection</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-transparent border-none outline-none text-white text-sm"
                >
                  <option value="Vegetables" className="bg-dark-bg">Vegetables</option>
                  <option value="Fruits" className="bg-dark-bg">Fruits</option>
                  <option value="Grains" className="bg-dark-bg">Grains</option>
                  <option value="Dairy" className="bg-dark-bg">Dairy</option>
                  <option value="Other" className="bg-dark-bg">Other</option>
                </select>
              </div>

              <div className="glass-card p-4">
                <label className="text-dark-muted text-xs block mb-2">Set price</label>
                <div className="flex items-center gap-2">
                  <span className="text-accent">$</span>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-dark-muted"
                    required
                  />
                  <select
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                    className="bg-transparent border-none outline-none text-dark-muted text-sm"
                  >
                    <option value="/kg" className="bg-dark-bg">/kg</option>
                    <option value="/head" className="bg-dark-bg">/head</option>
                    <option value="/bunch" className="bg-dark-bg">/bunch</option>
                    <option value="/dozen" className="bg-dark-bg">/dozen</option>
                  </select>
                </div>
              </div>

              <div className="glass-card p-4">
                <label className="text-dark-muted text-xs block mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Green Valley"
                  className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-dark-muted"
                  required
                />
              </div>

              <div className="glass-card p-4">
                <label className="text-dark-muted text-xs block mb-2">Farmer Name</label>
                <input
                  type="text"
                  name="farmer"
                  value={form.farmer}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-dark-muted"
                  required
                />
              </div>
            </div>

            <div className="glass-card p-4 flex items-center gap-3">
              <input
                type="checkbox"
                name="organic"
                checked={form.organic}
                onChange={handleChange}
                className="accent-accent"
              />
              <label className="text-dark-text text-sm">This product is organically grown</label>
            </div>

            <button
              type="submit"
              className="pill-btn w-full flex items-center justify-center gap-2 !py-3 text-base hover:!bg-accent/10"
            >
              <FiSave size={18} />
              Upload product photos
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
