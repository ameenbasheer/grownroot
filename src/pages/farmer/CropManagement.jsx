import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiTrash2, FiZap, FiDroplet, FiCalendar, FiChevronDown } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { DecorativeCircle } from '../../components/common/DecorativeElements';

export default function CropManagement() {
  const { crops, deleteCrop } = useApp();
  const [expanded, setExpanded] = useState(null);

  const statusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-400';
      case 'Growing': return 'bg-yellow-400';
      case 'Ready': return 'bg-accent';
      default: return 'bg-dark-muted';
    }
  };

  const toggle = (id) => setExpanded((cur) => (cur === id ? null : id));

  return (
    <div className="relative">
      <DecorativeCircle size="lg" className="-top-32 -right-32 opacity-15" />
      <DecorativeCircle size="md" className="top-1/2 -left-20 opacity-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        {/* Left: image */}
        <div className="img-showcase h-64 lg:h-full bg-gradient-to-br from-accent/8 to-primary/10 flex items-center justify-center min-h-[300px]">
          <span className="text-7xl">🌿</span>
        </div>

        {/* Right: content */}
        <div>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-light text-white">Crop</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Management</h2>
          </div>

          <div className="space-y-4">
            {crops.map((crop) => {
              const hasInsights = !!crop.aiInsights;
              const isOpen = expanded === crop.id;
              return (
                <div key={crop.id} className="glass-card overflow-hidden">
                  <div className="p-4 flex items-center gap-4 group">
                    <div className={`w-3 h-3 rounded-full ${statusColor(crop.status)} shrink-0`} />
                    <button
                      type="button"
                      onClick={() => hasInsights && toggle(crop.id)}
                      className={`flex-1 min-w-0 text-left bg-transparent border-none p-0 ${hasInsights ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <p className="text-white text-sm font-medium flex items-center gap-2">
                        <span className="truncate">
                          {crop.name} – {crop.status}, planted {crop.plantedDate}
                        </span>
                        {hasInsights && (
                          <span className="inline-flex items-center gap-1 text-accent text-xs shrink-0">
                            <FiZap size={11} /> AI
                          </span>
                        )}
                      </p>
                      <p className="text-dark-muted text-xs">
                        harvest {crop.harvestDate}
                      </p>
                    </button>
                    {hasInsights && (
                      <FiChevronDown
                        size={14}
                        className={`text-dark-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    )}
                    <button
                      onClick={() => deleteCrop(crop.id)}
                      className="text-dark-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      aria-label={`Delete ${crop.name}`}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>

                  {hasInsights && isOpen && (
                    <div className="px-4 pb-4 pt-1 border-t border-dark-border space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2 text-dark-text">
                          <FiCalendar className="text-accent" size={12} />
                          Harvest by {crop.aiInsights.harvestDate}
                        </div>
                        <div className="flex items-center gap-2 text-dark-text">
                          <FiDroplet className="text-accent" size={12} />
                          Water {crop.aiInsights.wateringPerWeek}× per week
                        </div>
                      </div>

                      <div>
                        <p className="text-dark-muted text-xs uppercase tracking-wider mb-2">Growth stages</p>
                        <ol className="space-y-1">
                          {crop.aiInsights.stages.map((stage, i) => (
                            <li key={i} className="flex items-center justify-between text-xs">
                              <span className="text-dark-text">{i + 1}. {stage.name}</span>
                              <span className="text-dark-muted">until {stage.endDate}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {crop.aiInsights.note && (
                        <p className="text-dark-muted text-xs italic">{crop.aiInsights.note}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              to="/dashboard/crops/add"
              className="glass-card p-4 flex items-center gap-3 text-accent text-sm hover:bg-accent/5 transition-colors no-underline"
            >
              <div className="w-3 h-3 rounded-full bg-accent/40" />
              <FiPlus size={14} />
              Add New Crop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
