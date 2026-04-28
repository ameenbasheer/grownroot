import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiArrowLeft, FiZap, FiDroplet, FiCalendar, FiInfo } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { DecorativeCircle } from '../../components/common/DecorativeElements';
import { Link } from 'react-router-dom';
import { analyzeCrop } from '../../services/aiService';

export default function AddCrop() {
  const [form, setForm] = useState({
    name: '',
    status: 'Active',
    plantedDate: '',
    harvestDate: '',
    field: '',
  });
  const [insights, setInsights] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const { addCrop } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAiAssist = async () => {
    if (!form.name.trim() || !form.plantedDate.trim()) {
      setAiError('Enter crop name and planted date first.');
      return;
    }
    setAiError('');
    setAiLoading(true);
    const result = await analyzeCrop({ name: form.name, plantedDate: form.plantedDate });
    setInsights(result);
    setForm((f) => ({ ...f, harvestDate: result.harvestDate }));
    setAiLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const planted = form.plantedDate ? new Date(form.plantedDate) : null;
    const plantedLabel = planted && !isNaN(planted.getTime())
      ? planted.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : form.plantedDate;
    addCrop({ ...form, plantedDate: plantedLabel, aiInsights: insights });
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
              type="date"
              name="plantedDate"
              value={form.plantedDate}
              onChange={handleChange}
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

        {/* AI assist */}
        <button
          type="button"
          onClick={handleAiAssist}
          disabled={aiLoading}
          className="pill-btn w-full flex items-center justify-center gap-2 !py-3 text-sm hover:!bg-accent/10 disabled:opacity-60"
        >
          <FiZap size={16} />
          {aiLoading ? 'AI analyzing…' : 'AI: estimate harvest, growth stages & watering'}
        </button>

        {aiError && <p className="text-red-400 text-xs text-center">{aiError}</p>}

        {insights && (
          <div className="glass-card p-4 border-accent/40 space-y-3">
            <div className="flex items-center gap-2">
              <FiZap className="text-accent" size={14} />
              <span className="text-white text-sm font-semibold">AI Insights</span>
              {!insights.matched && (
                <span className="text-dark-muted text-xs">(generic estimate)</span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-dark-text">
                <FiCalendar className="text-accent" size={12} />
                Harvest by {insights.harvestDate}
              </div>
              <div className="flex items-center gap-2 text-dark-text">
                <FiDroplet className="text-accent" size={12} />
                Water {insights.wateringPerWeek}× per week
              </div>
            </div>

            <div>
              <p className="text-dark-muted text-xs uppercase tracking-wider mb-2">Growth stages</p>
              <ol className="space-y-1">
                {insights.stages.map((stage, i) => (
                  <li key={i} className="flex items-center justify-between text-xs">
                    <span className="text-dark-text">
                      {i + 1}. {stage.name}
                    </span>
                    <span className="text-dark-muted">until {stage.endDate}</span>
                  </li>
                ))}
              </ol>
            </div>

            {insights.note && (
              <div className="flex items-start gap-2 text-dark-muted text-xs pt-1 border-t border-dark-border">
                <FiInfo size={12} className="mt-0.5 shrink-0 text-accent/70" />
                <span>{insights.note}</span>
              </div>
            )}
          </div>
        )}

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
