import { Link } from 'react-router-dom';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { DecorativeCircle } from '../../components/common/DecorativeElements';

export default function CropManagement() {
  const { crops, deleteCrop } = useApp();

  const statusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-400';
      case 'Growing': return 'bg-yellow-400';
      case 'Ready': return 'bg-accent';
      default: return 'bg-dark-muted';
    }
  };

  return (
    <div className="relative">
      <DecorativeCircle size="lg" className="-top-32 -right-32 opacity-15" />
      <DecorativeCircle size="md" className="top-1/2 -left-20 opacity-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Left: image */}
        <div className="img-showcase h-64 lg:h-full bg-gradient-to-br from-accent/8 to-primary/10 flex items-center justify-center min-h-[300px]">
          <span className="text-7xl">🌿</span>
        </div>

        {/* Right: content */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-light text-white">Crop</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Management</h2>
          </div>

          <div className="space-y-4">
            {crops.map((crop) => (
              <div
                key={crop.id}
                className="glass-card p-4 flex items-center gap-4 group"
              >
                <div className={`w-3 h-3 rounded-full ${statusColor(crop.status)} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">
                    {crop.name} – {crop.status}, planted {crop.plantedDate}
                  </p>
                  <p className="text-dark-muted text-xs">
                    harvest {crop.harvestDate}
                  </p>
                </div>
                <button
                  onClick={() => deleteCrop(crop.id)}
                  className="text-dark-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}

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
