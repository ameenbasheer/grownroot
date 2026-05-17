import { useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiMapPin,
  FiSearch,
  FiPlus,
  FiUpload,
  FiX,
  FiTrash2,
} from 'react-icons/fi';
import { GiPlantSeed } from 'react-icons/gi';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { CROP_STAGES } from '../../reducers/appReducer';
import PieChart3D, { PIE_PALETTE } from '../../components/common/PieChart3D';
import Images from '../../assets/images';
import logo from '../../assets/logo.png';

const SOIL_TYPES = [
  { id: 'loam', label: 'Loam', image: Images.soilLoam },
  { id: 'sandy-loam', label: 'Sandy Loam', image: Images.soilSandyLoam },
  { id: 'sandy', label: 'Sandy', image: Images.soilSandy },
  { id: 'clay', label: 'Clay', image: Images.soilClay },
  { id: 'silt', label: 'Silt', image: Images.soilSilt },
  { id: 'peat', label: 'Peat', image: Images.soilPeat },
  { id: 'red-soil', label: 'Red Soil', image: Images.soilRed },
];

const CROP_CATALOG = [
  { name: 'Tomatoes', image: Images.tomato },
  { name: 'Lettuce', image: Images.lettuse },
  { name: 'Carrot', image: Images.carrot },
  { name: 'Onion', image: Images.onion },
  { name: 'Potato', image: Images.potato },
  { name: 'Spinach', image: Images.spinach },
  { name: 'Brinjal', image: Images.brinjal },
  { name: 'Capsicum', image: Images.capsicum },
  { name: 'Cucumber', image: Images.cucumber },
  { name: 'Green Beans', image: Images.beans },
];

const MOCK_LOCATIONS = [
  'Wayanad, Kerala', 'Kochi, Kerala', 'Thrissur, Kerala', 'Kozhikode, Kerala',
  'Bangalore, Karnataka', 'Mysore, Karnataka', 'Coimbatore, Tamil Nadu',
  'Chennai, Tamil Nadu', 'Hyderabad, Telangana', 'Pune, Maharashtra',
  'Nagpur, Maharashtra', 'Ahmedabad, Gujarat', 'Jaipur, Rajasthan',
];

const STEPS = [
  { id: 1, label: 'Farm area', title: 'How big is your land?', blurb: "Tell us your total area — we'll plan crop allocations from this." },
  { id: 2, label: 'Location & soil', title: 'Where you grow.', blurb: 'Used for weather alerts and soil-aware crop suggestions.' },
  { id: 3, label: 'Add crops', title: 'What you grow.', blurb: 'Pick from popular crops or add your own. Allocate % per crop.' },
  { id: 4, label: 'Confirm', title: 'Almost there.', blurb: 'Review your setup. You can change anything later from the dashboard.' },
];

const PRIMARY_BTN =
  'inline-flex items-center py-2 justify-center gap-2 rounded-5 bg-accent text-dark-bg font-semibold text-sm tracking-wide hover:shadow-[0_10px_28px_rgba(45,212,191,0.45)] hover:-translate-y-0.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none';

const SECONDARY_BTN =
  'inline-flex items-center gap-2 text-dark-muted font-medium text-sm hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed';

// rounded pill input
const FIELD =
  'w-full bg-dark-card/40 border border-dark-border focus:border-accent rounded-full px-4 py-3 text-white text-base outline-none transition placeholder:text-dark-muted/60';

function StepArea({ data, setData }) {
  const total = Number(data.totalArea) || 0;

  return (
    <div className="space-y-10 mt-2 pt-5">
      {/* Unit toggle as text-link tabs */}
      <div className="flex items-center gap-6">
        {[
          { id: 'acre', label: 'Acres' },
          { id: 'cent', label: 'Cents' },
        ].map((u) => (
          <button
            key={u.id}
            type="button"
            onClick={() => setData({ ...data, areaUnit: u.id })}
            className={`text-sm font-semibold uppercase tracking-[0.18em] pb-1 border-b-2 transition ${data.areaUnit === u.id
              ? 'text-accent border-accent'
              : 'text-dark-muted border-transparent hover:text-white'
              }`}
          >
            {u.label}
          </button>
        ))}
      </div>

      {/* Big number input */}
      <div>
        <label className="text-dark-muted text-[11px] uppercase tracking-[0.22em] font-semibold block mt-3 mb-2">
          Total area
        </label>
        <div className="flex items-baseline gap-3 rounded-full border border-dark-border focus-within:border-accent bg-dark-card/40 px-4 py-3 transition">
          <input
            type="number"
            min="0"
            step="0.1"
            value={data.totalArea}
            onChange={(e) => setData({ ...data, totalArea: e.target.value })}
            placeholder="0"
            className="flex-1 bg-transparent border-none outline-none text-white text-2xl font-bold placeholder:text-dark-muted/25 leading-none tabular-nums min-w-0"
          />
          <span className="text-dark-muted text-[18px] font-medium lowercase">
            {data.areaUnit === 'acre' ? 'acres' : 'cents'}
          </span>
        </div>
        {data.areaUnit === 'cent' && total > 0 && (
          <p className="text-accent/70 text-xs mt-3">
            ≈ {(total / 100).toFixed(2)} acres
          </p>
        )}
      </div>
    </div>
  );
}

function StepLocationSoil({ data, setData }) {
  const [query, setQuery] = useState(data.location || '');
  const [showSugg, setShowSugg] = useState(false);
  const [showSoilModal, setShowSoilModal] = useState(false);
  const [customSoil, setCustomSoil] = useState('');

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return MOCK_LOCATIONS.filter((l) => l.toLowerCase().includes(q)).slice(0, 5);
  }, [query]);

  const pickLocation = (l) => {
    setQuery(l);
    setData({ ...data, location: l });
    setShowSugg(false);
  };

  const pickSoil = (id) => setData({ ...data, soilType: id, customSoilLabel: '' });

  const isCustomSoil = data.soilType && !SOIL_TYPES.find((s) => s.id === data.soilType);

  const openSoilModal = () => {
    setCustomSoil(isCustomSoil ? (data.customSoilLabel || '') : '');
    setShowSoilModal(true);
  };

  const closeSoilModal = () => {
    setShowSoilModal(false);
    setCustomSoil('');
  };

  const addCustomSoil = () => {
    const trimmed = customSoil.trim();
    if (!trimmed) return;
    setData({ ...data, soilType: trimmed.toLowerCase().replace(/\s+/g, '-'), customSoilLabel: trimmed });
    closeSoilModal();
  };

  return (
    <div className="space-y-10">
      <div className="relative">
        <label className="text-dark-muted text-[11px] uppercase tracking-[0.22em] font-semibold block mt-5 mb-2">
          Where's your farm?
        </label>
        <div className="relative flex items-center rounded-full border border-dark-border focus-within:border-accent bg-dark-card/40 px-4 transition">
          <FiSearch className="text-dark-muted shrink-0 mr-3" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSugg(true);
              setData({ ...data, location: e.target.value });
            }}
            onFocus={() => setShowSugg(true)}
            placeholder="Search a city or village..."
            className="flex-1 bg-transparent border-none outline-none text-white text-base py-3 px-3 placeholder:text-dark-muted/60"
          />
        </div>
        {showSugg && matches.length > 0 && (
          <div className="absolute z-20 mt-2 w-full bg-dark-card border border-dark-border rounded-xl shadow-2xl overflow-hidden py-1">
            {matches.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => pickLocation(m)}
                className="w-full text-left px-4 py-2.5 text-sm text-dark-text hover:bg-accent/10 hover:text-white transition flex items-center gap-2.5"
              >
                <FiMapPin size={14} className="text-accent" />
                {m}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className='mb-5'>
        <label className="text-dark-muted text-[11px] uppercase tracking-[0.22em] font-semibold block mt-5 pt-3">
          Soil type
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {SOIL_TYPES.map((s) => {
            const selected = data.soilType === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => pickSoil(s.id)}
                className={`group relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-200 ${selected
                  ? 'border-accent shadow-[0_10px_28px_rgba(45,212,191,0.4)] scale-[1.04]'
                  : 'border-transparent hover:border-accent/40 hover:-translate-y-0.5'
                  }`}
              >
                <img src={s.image} alt={s.label} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                  <p className="text-white text-xs font-semibold text-left">{s.label}</p>
                </div>
                {selected && (
                  <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent text-dark-bg flex items-center justify-center shadow-md">
                    <FiCheck size={14} />
                  </span>
                )}
              </button>
            );
          })}
          <button
            type="button"
            onClick={openSoilModal}
            className={`relative aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 transition-all duration-200 ${isCustomSoil
              ? 'border-accent text-accent bg-accent/10 scale-[1.04] shadow-[0_10px_28px_rgba(45,212,191,0.4)]'
              : 'border-dark-border text-dark-muted hover:border-accent/50 hover:text-accent hover:-translate-y-0.5'
              }`}
          >
            <FiPlus size={24} />
            <span className="text-xs font-semibold">Other</span>
            {isCustomSoil && data.customSoilLabel && (
              <span className="text-[15px] text-white font-medium px-2 text-center truncate max-w-full">
                {data.customSoilLabel}
              </span>
            )}
            {isCustomSoil && (
              <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent text-dark-bg flex items-center justify-center shadow-md">
                <FiCheck size={14} />
              </span>
            )}
          </button>
        </div>
      </div>

      {showSoilModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4 bg-black/70 backdrop-blur-sm"
          onClick={closeSoilModal}
        >
          <div
            className="w-full max-w-md bg-dark-card border border-dark-border px-4 py-4 rounded-2xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 mb-5">
              <div>
                <p className="text-accent text-[11px] uppercase tracking-[0.22em] font-semibold mb-1">
                  Custom soil
                </p>
                <h3 className="text-white text-lg font-bold">Add your soil type</h3>
              </div>
              <button
                type="button"
                onClick={closeSoilModal}
                className="text-dark-muted hover:text-white p-1 transition"
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
            </div>
            <p className="text-dark-muted text-sm mb-4">
              Don't see your soil type? Enter it here and we'll use it for your farm.
            </p>
            <input
              type="text"
              value={customSoil}
              onChange={(e) => setCustomSoil(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customSoil.trim()) addCustomSoil();
              }}
              placeholder="e.g. Black cotton soil"
              autoFocus
              className={FIELD}
            />
            <div className="flex items-center justify-end gap-2 mt-5">
              <button
                type="button"
                onClick={closeSoilModal}
                className="px-4 py-2.5 rounded-full text-dark-muted hover:text-white text-sm font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addCustomSoil}
                disabled={!customSoil.trim()}
                className={`${PRIMARY_BTN} px-5 py-2.5`}
              >
                <FiCheck size={14} /> Use this soil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepCrops({ data, setData }) {
  const fileRef = useRef(null);
  const [draft, setDraft] = useState({
    name: '',
    image: null,
    imagePreview: null,
    currentStage: CROP_STAGES[0],
    areaPercent: '',
    isCustom: false,
  });
  const [error, setError] = useState('');

  const usedPercent = data.crops.reduce((sum, c) => sum + (Number(c.areaPercent) || 0), 0);
  const remaining = Math.max(0, 100 - usedPercent);

  const pickCatalogCrop = (crop) => {
    setDraft({
      name: crop.name,
      image: crop.image,
      imagePreview: crop.image,
      currentStage: CROP_STAGES[0],
      areaPercent: '',
      isCustom: false,
    });
    setError('');
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setDraft((d) => ({ ...d, image: reader.result, imagePreview: reader.result, isCustom: true }));
    };
    reader.readAsDataURL(file);
  };

  const startCustom = () => {
    setDraft({
      name: '',
      image: null,
      imagePreview: null,
      currentStage: CROP_STAGES[0],
      areaPercent: '',
      isCustom: true,
    });
    setError('');
  };

  const cancelDraft = () => {
    setDraft({ name: '', image: null, imagePreview: null, currentStage: CROP_STAGES[0], areaPercent: '', isCustom: false });
    setError('');
  };

  const addToList = () => {
    const pct = Number(draft.areaPercent);
    if (!draft.name.trim()) return setError('Crop name is required.');
    if (!pct || pct <= 0) return setError('Enter the area percentage.');
    if (pct > remaining) return setError(`Only ${remaining}% remaining.`);
    setData({
      ...data,
      crops: [
        ...data.crops,
        {
          tempId: Date.now(),
          name: draft.name.trim(),
          image: draft.image,
          currentStage: draft.currentStage,
          areaPercent: pct,
        },
      ],
    });
    cancelDraft();
  };

  const removeCrop = (tempId) => {
    setData({ ...data, crops: data.crops.filter((c) => c.tempId !== tempId) });
  };

  return (
    <div className="space-y-8">
      {/* Existing crops as chip list */}
      {data.crops.length > 0 && (
        <div className='mb-5'>
          <div className="flex items-center justify-between mb-3">
            <p className="text-dark-muted text-[11px] uppercase tracking-[0.22em] font-semibold">
              Your crops
            </p>
            <p className="text-xs text-dark-muted">
              <span className="text-accent font-semibold">{usedPercent}%</span> allocated · {remaining}% left
            </p>
          </div>
          {/* progress bar */}
          <div className="h-1 bg-dark-border rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-accent transition-all"
              style={{ width: `${Math.min(100, usedPercent)}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {data.crops.map((c) => (
              <div
                key={c.tempId}
                className="inline-flex items-center gap-2 pl-1.5 pr-2 py-1.5 rounded-full border border-dark-border bg-dark-card/40"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden bg-accent/10 flex items-center justify-center shrink-0">
                  {c.image ? (
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                  ) : (
                    <GiPlantSeed className="text-accent" size={14} />
                  )}
                </div>
                <span className="text-white text-xs font-medium">{c.name}</span>
                <span className="text-dark-muted text-xs">{c.areaPercent}%</span>
                <button
                  type="button"
                  onClick={() => removeCrop(c.tempId)}
                  className="ml-1 text-dark-muted hover:text-red-400 transition me-1"
                  aria-label={`Remove ${c.name}`}
                >
                  <FiX size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Catalog */}
      <div>
        <p className="text-dark-muted text-[11px] uppercase tracking-[0.22em] font-semibold mb-4">
          Pick a crop
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-5">
          {CROP_CATALOG.map((c) => {
            const selected = draft.name === c.name && !draft.isCustom;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => pickCatalogCrop(c)}
                className={`group relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-200 ${selected
                  ? 'border-accent shadow-[0_10px_28px_rgba(45,212,191,0.4)] scale-[1.04]'
                  : 'border-transparent hover:border-accent/40 hover:-translate-y-0.5'
                  }`}
              >
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                  <p className="text-white text-xs font-semibold text-left">{c.name}</p>
                </div>
                {selected && (
                  <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent text-dark-bg flex items-center justify-center shadow-md">
                    <FiCheck size={14} />
                  </span>
                )}
              </button>
            );
          })}
          <button
            type="button"
            onClick={startCustom}
            className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-all duration-200 ${draft.isCustom
              ? 'border-accent text-accent bg-accent/10 scale-[1.04]'
              : 'border-dark-border text-dark-muted hover:border-accent/50 hover:text-accent hover:-translate-y-0.5'
              }`}
          >
            <FiPlus size={24} />
            <span className="text-xs font-medium">Custom</span>
          </button>
        </div>
      </div>

      {/* Draft form */}
      {(draft.name || draft.isCustom) && (
        <div className="border-t border-dark-border pt-3 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <p className="text-white text-sm font-semibold">
              {draft.isCustom ? 'Add custom crop' : `Configure ${draft.name}`}
            </p>
            <button
              type="button"
              onClick={cancelDraft}
              className="text-dark-muted hover:text-white p-1 transition"
              aria-label="Clear"
            >
              <FiX size={16} />
            </button>
          </div>

          {draft.isCustom && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-16 h-16 rounded-xl border-2 border-dashed border-dark-border hover:border-accent/60 flex flex-col items-center justify-center gap-0.5 text-dark-muted hover:text-accent transition shrink-0 overflow-hidden"
              >
                {draft.imagePreview ? (
                  <img src={draft.imagePreview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <FiUpload size={16} />
                    <span className="text-[9px]">Upload</span>
                  </>
                )}
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
              <input
                type="text"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                placeholder="Crop name"
                className={FIELD}
              />
            </div>
          )}

          <div>
            <label className="text-dark-muted text-[11px] uppercase tracking-[0.22em] font-semibold block mb-2 mt-4">
              Current stage
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CROP_STAGES.map((stage) => {
                const sel = draft.currentStage === stage;
                return (
                  <button
                    key={stage}
                    type="button"
                    onClick={() => setDraft({ ...draft, currentStage: stage })}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${sel
                      ? 'bg-accent text-dark-bg border-accent'
                      : 'bg-transparent text-dark-text border-dark-border hover:border-accent/60'
                      }`}
                  >
                    {stage}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-dark-muted text-[11px] uppercase tracking-[0.22em] font-semibold block mt-4 mb-2">
              Area % of farm
            </label>
            <div className="flex items-baseline gap-3 rounded-full border border-dark-border focus-within:border-accent bg-dark-card/40 px-6 py-3 transition">
              <input
                type="number"
                min="0"
                max={remaining}
                step="1"
                value={draft.areaPercent}
                onChange={(e) => setDraft({ ...draft, areaPercent: e.target.value })}
                placeholder="0"
                className="flex-1 px-4 bg-transparent border-none outline-none text-white text-3xl font-bold placeholder:text-dark-muted/30 tabular-nums min-w-0"
              />
              <span className="text-dark-muted text-base pe-4">%</span>
            </div>
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <div className="flex justify-end mt-4 mb-5">
            <button
              type="button"
              onClick={addToList}
              className={`${PRIMARY_BTN} px-5 py-2`}
            >
              <FiPlus size={14} /> Add to list
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepConfirm({ data }) {
  const allocated = data.crops.reduce((sum, c) => sum + (Number(c.areaPercent) || 0), 0);
  const pieData = data.crops.map((c, i) => ({
    id: c.tempId,
    label: c.name,
    value: c.areaPercent,
    color: PIE_PALETTE[i % PIE_PALETTE.length],
  }));
  if (allocated < 100) {
    pieData.push({ id: 'unused', label: 'Unused', value: 100 - allocated, color: '#475569' });
  }

  const stats = [
    { label: 'Area', value: `${data.totalArea} ${data.areaUnit}` },
    { label: 'Location', value: data.location || '—' },
    { label: 'Soil', value: (data.customSoilLabel || data.soilType?.replace('-', ' ')) || '—' },
    { label: 'Crops', value: `${data.crops.length} · ${allocated}%` },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <PieChart3D data={pieData} size={260} depth={26} />
      </div>

      <dl className="divide-y divide-dark-border border-y border-dark-border">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center justify-between py-3">
            <dt className="text-dark-muted text-xs uppercase tracking-[0.18em] font-semibold">{s.label}</dt>
            <dd className="text-white text-sm font-semibold capitalize text-right max-w-[60%] truncate">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function FarmerOnboarding() {
  const navigate = useNavigate();
  const { setFarmerProfile, setCrops } = useApp();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    totalArea: '',
    areaUnit: 'acre',
    location: '',
    soilType: '',
    customSoilLabel: '',
    crops: [],
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center text-dark-text p-6 text-center">
        <div>
          <p className="mb-4">You need to register first.</p>
          <Link to="/register" className="text-accent">Go to register</Link>
        </div>
      </div>
    );
  }

  const finish = () => {
    setFarmerProfile({
      totalArea: Number(data.totalArea),
      areaUnit: data.areaUnit,
      location: data.location,
      soilType: data.soilType,
      customSoilLabel: data.customSoilLabel || null,
    });
    const today = new Date();
    const newCrops = data.crops.map((c, i) => ({
      id: Date.now() + i,
      name: c.name,
      image: c.image,
      currentStage: c.currentStage,
      status: c.currentStage === 'Harvested' ? 'Harvested' : 'Active',
      areaPercent: Number(c.areaPercent),
      plantingDate: today.toISOString().slice(0, 10),
      harvestingDate: '',
      plantedDate: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      harvestDate: '',
      field: '',
      expenses: [],
      sales: [],
      notes: '',
      aiSuggestion: '',
    }));
    setCrops(newCrops);
    navigate('/dashboard');
  };

  const current = STEPS.find((s) => s.id === step);

  const canContinue = (() => {
    if (step === 1) return Number(data.totalArea) > 0;
    if (step === 2) return data.location && data.soilType;
    if (step === 3) return data.crops.length > 0;
    return true;
  })();

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else finish();
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col">
      {/* Top header */}
      <header className="px-6 md:px-10 py-6 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center no-underline">
          <img src={logo} alt="GrownRoot" className="h-9 w-auto object-contain" />
        </Link>
        {/* Step dots */}
        <div className="flex items-center gap-2">
          {STEPS.map((s) => {
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div
                key={s.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${active ? 'w-8 bg-accent' : done ? 'w-4 bg-accent/60' : 'w-4 bg-dark-border'
                  }`}
              />
            );
          })}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-6 md:px-10 pb-5 flex flex-col">
        <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col">
          {/* Editorial step header */}
          <div className="pt-8 md:pt-16 pb-10">
            <div className="flex items-baseline gap-5 mb-5">
              <span className="text-accent/30 text-7xl md:text-8xl font-bold leading-none tabular-nums select-none">
                {String(step).padStart(2, '0')}
              </span>
              <div className="pb-2">
                <p className="text-accent text-[11px] uppercase tracking-[0.22em] font-semibold">
                  {current.label}
                </p>
                <p className="text-dark-muted text-xs mt-1">
                  Step {step} of {STEPS.length}
                </p>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3 leading-tight">
              {current.title}
            </h1>
            <p className="text-dark-muted text-sm md:text-base leading-relaxed max-w-xl">
              {current.blurb}
            </p>
          </div>

          {/* Step content */}
          <div className="flex-1">
            {step === 1 && <StepArea data={data} setData={setData} />}
            {step === 2 && <StepLocationSoil data={data} setData={setData} />}
            {step === 3 && <StepCrops data={data} setData={setData} />}
            {step === 4 && <StepConfirm data={data} />}
          </div>

          {/* Bottom actions */}
          <div className="pt-10 mt-10 ">
            <div className="flex items-stretch gap-3">
              <button
                type="button"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className=" h-[52px] px-5 inline-flex items-center justify-center gap-2 rounded-5 bg-dark-card border border-dark-border text-dark-text font-semibold text-sm hover:border-accent/50 hover:text-white hover:bg-dark-card/70 transition-all group disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <FiArrowLeft size={15} className="group-hover:-translate-x-0.5 transition" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!canContinue}
                className="flex-1 h-[52px] inline-flex items-center justify-center gap-2 rounded-5 bg-accent text-dark-bg font-semibold text-sm tracking-wide hover:bg-accent/90 hover:shadow-[0_12px_32px_rgba(45,212,191,0.45)] hover:-translate-y-0.5 transition-all group disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-accent"
              >
                {step === 4 ? 'Finish setup' : 'Continue'}
                {step === 4 ? (
                  <FiCheck size={17} />
                ) : (
                  <FiArrowRight size={17} className="group-hover:translate-x-0.5 transition" />
                )}
              </button>
            </div>
            <p className="text-dark-muted/70 text-[11px] text-center mt-4">
              {canContinue
                ? 'Press Enter or click Continue to proceed'
                : step === 1
                  ? 'Enter your total farming area to continue'
                  : step === 2
                    ? 'Select a location and soil type to continue'
                    : step === 3
                      ? 'Add at least one crop to continue'
                      : ''}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
