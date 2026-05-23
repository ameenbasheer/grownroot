import { Link } from 'react-router-dom';
import {
  FiMapPin,
  FiArrowRight,
  FiCalendar,
  FiSun,
  FiDroplet,
  FiCloudRain,
  FiTrendingUp,
  FiPlus,
  FiZap,
  FiCamera,
  FiShoppingBag,
  FiAlertTriangle,
} from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { DecorativeCircle, DecorativeDot } from '../../components/common/DecorativeElements';
import PieChart3D, { PIE_PALETTE } from '../../components/common/PieChart3D';

const STAGE_COLORS = {
  'Seed prep': 'bg-slate-500/15 text-slate-300 border-slate-400/30',
  Sowing: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  Germination: 'bg-lime-500/15 text-lime-300 border-lime-400/30',
  Vegetative: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
  Flowering: 'bg-pink-500/15 text-pink-300 border-pink-400/30',
  Fruiting: 'bg-orange-500/15 text-orange-300 border-orange-400/30',
  Maturity: 'bg-teal-500/15 text-teal-300 border-teal-400/30',
  Harvested: 'bg-zinc-500/15 text-zinc-300 border-zinc-400/30',
};

function daysBetween(a, b) {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function CropTile({ crop }) {
  const now = new Date();
  const planted = crop.plantingDate ? new Date(crop.plantingDate) : null;
  const harvest = crop.harvestingDate ? new Date(crop.harvestingDate) : null;

  let progress = 0;
  let daysLeft = null;
  if (planted && harvest && !isNaN(planted) && !isNaN(harvest)) {
    const total = daysBetween(planted, harvest);
    const elapsed = daysBetween(planted, now);
    progress = total > 0 ? Math.max(0, Math.min(100, Math.round((elapsed / total) * 100))) : 0;
    daysLeft = daysBetween(now, harvest);
  }

  const stageClass = STAGE_COLORS[crop.currentStage] || STAGE_COLORS['Vegetative'];

  return (
    <Link
      to={`/dashboard/crops/${crop.id}`}
      className="group relative overflow-hidden rounded-2xl border border-dark-border bg-dark-card/60 hover:border-accent/60 transition-all no-underline block"
    >
      <div className="flex gap-4 p-4">
        <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-dark-border">
          {crop.image ? (
            <img src={crop.image} alt={crop.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-accent/10" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="text-white font-semibold text-base truncate">{crop.name}</h4>
              <p className="text-dark-muted text-xs truncate">{crop.field || '—'}</p>
            </div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border whitespace-nowrap ${stageClass}`}>
              {crop.currentStage}
            </span>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] text-dark-muted mb-1">
              <span>Growth</span>
              <span className="text-white">{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent/70 to-accent rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {daysLeft !== null && (
            <p className="text-[11px] mt-2 text-dark-muted">
              {daysLeft <= 0 ? (
                <span className="text-emerald-300 font-medium">Ready to harvest</span>
              ) : (
                <>
                  <span className="text-accent font-medium">{daysLeft}d</span> until harvest
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

function KpiBubble({ icon, label, value, accent }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.04] border border-dark-border backdrop-blur-sm flex-1 min-w-[140px]">
      <div className={`w-9 h-9 rounded-xl grid place-items-center ${accent ? 'bg-accent/20 text-accent' : 'bg-white/5 text-white'}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-dark-muted text-[11px] uppercase tracking-wider">{label}</p>
        <p className="text-white font-semibold text-lg leading-tight truncate">{value}</p>
      </div>
    </div>
  );
}

const quickActions = [
  { icon: <FiPlus />, label: 'Add Crop', to: '/dashboard/crops/add' },
  { icon: <FiCalendar />, label: 'Calendar', to: '/dashboard/calendar' },
  { icon: <FiZap />, label: 'AI Suggest', to: '/dashboard/suggest' },
  { icon: <FiCamera />, label: 'Scan Plant', to: '/dashboard/disease' },
  { icon: <FiCloudRain />, label: 'Weather', to: '/dashboard/weather' },
  { icon: <FiShoppingBag />, label: 'Marketplace', to: '/marketplace' },
];

export default function FarmerDashboard() {
  const { crops, products, farmerProfile, weather } = useApp();
  const { user } = useAuth();

  const allocated = crops.reduce((sum, c) => sum + (Number(c.areaPercent) || 0), 0);
  const pieData = crops.map((c, i) => ({
    id: c.id,
    label: c.name,
    value: Number(c.areaPercent) || 0,
    color: PIE_PALETTE[i % PIE_PALETTE.length],
  }));
  if (allocated < 100) {
    pieData.push({ id: 'unused', label: 'Unused', value: 100 - allocated, color: '#475569' });
  }

  const upcomingHarvests = crops
    .filter((c) => c.harvestingDate)
    .map((c) => ({ ...c, _d: new Date(c.harvestingDate) }))
    .filter((c) => !isNaN(c._d.getTime()) && c._d >= new Date())
    .sort((a, b) => a._d - b._d)
    .slice(0, 4);

  const readyToHarvest = crops.filter(
    (c) => c.harvestingDate && new Date(c.harvestingDate) <= new Date(Date.now() + 7 * 86400000)
  ).length;

  return (
    <div className="relative ">
      <DecorativeCircle size="lg" className="-top-20 -left-20 opacity-15" />
      <DecorativeCircle size="md" className="top-1/2 -right-10 opacity-10" />
      <DecorativeDot size={14} className="top-24 right-1/3 bg-accent/30" />

      {/* Hero strip */}
      <div className="relative z-10 mb-5 rounded-3xl overflow-hidden border border-dark-border bg-gradient-to-br from-accent/15 via-dark-card/60 to-dark-card/30 p-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="text-accent text-xs font-medium tracking-widest uppercase mb-2">
              Farmer workspace
            </p>
            <h1 className="text-3xl md:text-4xl font-light text-white leading-tight">
              Welcome back{user?.name ? `, ` : ''}
              {user?.name && (
                <span className="font-bold">{user.name.split(' ')[0]}</span>
              )}
            </h1>
            {farmerProfile?.location && (
              <p className="text-dark-muted text-sm mt-2 inline-flex items-center gap-1.5">
                <FiMapPin size={13} className="text-accent" />
                {farmerProfile.location} · {farmerProfile.totalArea} {farmerProfile.areaUnit}
                {Number(farmerProfile.totalArea) === 1 ? '' : 's'}
              </p>
            )}
          </div>

          <Link
            to="/dashboard/crops/add"
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent text-dark-bg font-semibold text-sm hover:bg-accent/90 transition no-underline"
          >
            <FiPlus size={16} /> Add new crop
          </Link>
        </div>

        {/* KPI strip */}
        <div className="mt-5 flex flex-wrap gap-3">
          <KpiBubble
            icon={<FiSun size={18} />}
            label="Active crops"
            value={crops.length}
            accent
          />
          <KpiBubble
            icon={<FiShoppingBag size={18} />}
            label="Listings"
            value={products.length}
          />
          <KpiBubble
            icon={<FiTrendingUp size={18} />}
            label="Land used"
            value={`${allocated}%`}
          />
          <KpiBubble
            icon={<FiCalendar size={18} />}
            label="Harvest in 7d"
            value={readyToHarvest}
            accent
          />
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-10">
        {/* Crops list — wide */}
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-bold text-lg">Your crops</h3>
              <p className="text-dark-muted text-xs mt-0.5">Live stages and growth progress</p>
            </div>
            <Link
              to="/dashboard/crops"
              className="text-accent text-xs inline-flex items-center gap-1 hover:underline no-underline"
            >
              Manage all <FiArrowRight size={11} />
            </Link>
          </div>

          {crops.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-dark-muted text-sm mb-3">No crops yet.</p>
              <Link
                to="/dashboard/crops/add"
                className="inline-flex items-center gap-2 text-accent text-sm pill-btn !py-2 !px-4 no-underline"
              >
                <FiPlus size={14} /> Add your first crop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {crops.map((c) => (
                <CropTile key={c.id} crop={c} />
              ))}
            </div>
          )}
        </div>

        {/* Weather — narrow */}
        <div className="glass-card p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold text-lg">Today</h3>
            <span className="text-accent text-xs font-medium">{weather.condition}</span>
          </div>

          <div className="flex items-end gap-3 mb-5">
            <span className="text-white text-5xl font-light leading-none">
              {weather.temperature}°
            </span>
            <span className="text-dark-muted text-xs pb-1.5">feels good for the field</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="px-3 py-2.5 rounded-xl bg-white/[0.04] border border-dark-border">
              <div className="flex items-center gap-1.5 text-dark-muted text-[11px] mb-0.5">
                <FiDroplet size={11} /> Humidity
              </div>
              <p className="text-white font-semibold text-sm">{weather.humidity}%</p>
            </div>
            <div className="px-3 py-2.5 rounded-xl bg-white/[0.04] border border-dark-border">
              <div className="flex items-center gap-1.5 text-dark-muted text-[11px] mb-0.5">
                <FiCloudRain size={11} /> Rainfall
              </div>
              <p className="text-white font-semibold text-sm">{weather.rainfall}mm</p>
            </div>
          </div>

          <Link
            to="/dashboard/disease"
            className="mt-auto flex items-center justify-center gap-2 text-accent text-sm pill-btn !py-2 !px-4 w-full no-underline"
          >
            <FiAlertTriangle size={14} />
            Check disease status
          </Link>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5 pb-5 relative z-10">
        {/* Land allocation */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-white font-bold text-base">Land allocation</h3>
              <p className="text-dark-muted text-xs mt-0.5">{allocated}% of {farmerProfile?.totalArea} {farmerProfile?.areaUnit}s used</p>
            </div>
            <Link
              to="/dashboard/crops"
              className="text-accent text-xs inline-flex items-center gap-1 hover:underline no-underline"
            >
              Details <FiArrowRight size={11} />
            </Link>
          </div>
          <div className="flex justify-center">
            <PieChart3D data={pieData} size={220} depth={20} />
          </div>
        </div>

        {/* Upcoming harvests */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-bold text-base">Upcoming harvests</h3>
              <p className="text-dark-muted text-xs mt-0.5">Next 4 scheduled</p>
            </div>
            <FiCalendar className="text-accent" size={16} />
          </div>

          {upcomingHarvests.length === 0 ? (
            <p className="text-dark-muted text-sm py-5 text-center">No harvests scheduled.</p>
          ) : (
            <ul className="space-y-2">
              {upcomingHarvests.map((c) => {
                const daysLeft = daysBetween(new Date(), c._d);
                return (
                  <li
                    key={c.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-dark-border hover:border-accent/40 transition"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-dark-border">
                      {c.image ? (
                        <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-accent/10" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{c.name}</p>
                      <p className="text-dark-muted text-[11px]">
                        {c._d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <span className="text-accent text-xs font-semibold whitespace-nowrap">
                      {daysLeft}d
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Quick actions */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-bold text-base">Quick actions</h3>
              <p className="text-dark-muted text-xs mt-0.5">Jump to anywhere</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {quickActions.map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className="flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl bg-white/[0.04] border border-dark-border text-dark-text hover:bg-accent/10 hover:border-accent/50 hover:text-accent transition-all no-underline"
              >
                <span className="text-accent text-lg">{action.icon}</span>
                <span className="text-[11px] font-medium text-center leading-tight">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
