import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiArrowLeft } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { DecorativeCircle } from '../../components/common/DecorativeElements';
import { Link } from 'react-router-dom';

export default function AddCrop() {
  const [form, setForm] = useState({
    name: '',
    status: 'Active',
    plantedDate: '',
    harvestDate: '',
    field: '',
  });
  const { addCrop } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCrop(form);
    navigate('/dashboard/crops');
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <DecorativeCircle size="md" className="-top-20 -right-20 opacity-15" />

      <Link
        to="/dashboard/crops"
        className="inline-flex items-center gap-2 text-dark-muted hover:text-accent text-sm mb-6 no-underline transition-colors"
      >
        <FiArrowLeft size={16} />
        Back to Crops
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-light text-white">Add New</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-accent">Crop</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="glass-card p-4">
          <label className="text-dark-muted text-xs block mb-2">Crop Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Tomatoes"
            className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-dark-muted"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-card p-4">
            <label className="text-dark-muted text-xs block mb-2">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full bg-transparent border-none outline-none text-white text-sm"
            >
              <option value="Active" className="bg-dark-bg">Active</option>
              <option value="Growing" className="bg-dark-bg">Growing</option>
              <option value="Ready" className="bg-dark-bg">Ready</option>
              <option value="Harvested" className="bg-dark-bg">Harvested</option>
            </select>
          </div>

          <div className="glass-card p-4">
            <label className="text-dark-muted text-xs block mb-2">Field</label>
            <input
              type="text"
              name="field"
              value={form.field}
              onChange={handleChange}
              placeholder="e.g. Field A"
              className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-dark-muted"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-card p-4">
            <label className="text-dark-muted text-xs block mb-2">Planted Date</label>
            <input
              type="text"
              name="plantedDate"
              value={form.plantedDate}
              onChange={handleChange}
              placeholder="e.g. Mar 15"
              className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-dark-muted"
              required
            />
          </div>

          <div className="glass-card p-4">
            <label className="text-dark-muted text-xs block mb-2">Expected Harvest</label>
            <input
              type="text"
              name="harvestDate"
              value={form.harvestDate}
              onChange={handleChange}
              placeholder="e.g. June 20"
              className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-dark-muted"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="pill-btn w-full flex items-center justify-center gap-2 !py-3 text-base hover:!bg-accent/10"
        >
          <FiSave size={18} />
          Save Crop
        </button>
      </form>
    </div>
  );
}
