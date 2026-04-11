import { FiSun, FiDroplet, FiCloudRain, FiWind } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { DecorativeCircle } from '../../components/common/DecorativeElements';

const forecastDays = [
  { day: 'Mon', temp: 28, icon: <FiSun />, condition: 'Sunny' },
  { day: 'Tue', temp: 26, icon: <FiCloudRain />, condition: 'Rain' },
  { day: 'Wed', temp: 24, icon: <FiCloudRain />, condition: 'Showers' },
  { day: 'Thu', temp: 27, icon: <FiSun />, condition: 'Sunny' },
  { day: 'Fri', temp: 29, icon: <FiSun />, condition: 'Clear' },
];

export default function WeatherPage() {
  const { weather } = useApp();

  return (
    <div className="relative">
      <DecorativeCircle size="lg" className="-top-32 -left-32 opacity-15" />

      {/* Top: Two image cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
        <div className="img-showcase h-64 bg-gradient-to-br from-accent/8 to-primary/10 flex items-center justify-center">
          <div className="text-center">
            <span className="text-5xl block mb-3">📱</span>
            <p className="text-dark-muted text-xs">Mobile Weather App</p>
          </div>
        </div>
        <div className="img-showcase h-64 bg-gradient-to-br from-accent/5 to-primary/10 flex items-center justify-center">
          <div className="text-center">
            <span className="text-5xl block mb-3">🖥️</span>
            <p className="text-dark-muted text-xs">Weather Dashboard</p>
          </div>
        </div>
      </div>

      {/* Bottom: Info row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Title */}
        <div>
          <h1 className="text-4xl md:text-5xl font-light text-white">Weather</h1>
          <h2 className="text-4xl md:text-5xl font-bold text-accent">Forecast</h2>
        </div>

        {/* Description */}
        <div className="flex items-center">
          <p className="text-dark-muted text-sm leading-relaxed">
            Stay informed with real-time weather updates for your farm. Monitor temperature,
            rainfall predictions, and humidity levels to plan your agricultural activities effectively.
          </p>
        </div>

        {/* Current stats */}
        <div className="border-l-2 border-accent pl-5">
          <div className="space-y-2">
            <p className="text-accent font-bold text-lg flex items-center gap-2">
              <FiSun /> {weather.temperature}°C {weather.condition}
            </p>
            <p className="text-accent font-bold text-lg flex items-center gap-2">
              <FiDroplet /> {weather.humidity}% Humidity
            </p>
            <p className="text-accent font-bold text-lg flex items-center gap-2">
              <FiCloudRain /> {weather.rainfall}mm Rain Expected
            </p>
          </div>
        </div>
      </div>

      {/* 5-day forecast */}
      <div className="mt-10 relative z-10">
        <h3 className="text-white font-semibold text-lg mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {forecastDays.map((day) => (
            <div key={day.day} className="glass-card p-4 text-center stat-card">
              <p className="text-dark-muted text-xs mb-2">{day.day}</p>
              <div className="text-accent text-2xl mb-2 flex justify-center">{day.icon}</div>
              <p className="text-white font-bold text-lg">{day.temp}°C</p>
              <p className="text-dark-muted text-xs">{day.condition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional weather details */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
        <div className="glass-card p-5 flex items-center gap-4">
          <FiWind className="text-accent" size={24} />
          <div>
            <p className="text-dark-muted text-xs">Wind Speed</p>
            <p className="text-white font-bold">12 km/h</p>
          </div>
        </div>
        <div className="glass-card p-5 flex items-center gap-4">
          <FiSun className="text-accent" size={24} />
          <div>
            <p className="text-dark-muted text-xs">UV Index</p>
            <p className="text-white font-bold">6 (High)</p>
          </div>
        </div>
        <div className="glass-card p-5 flex items-center gap-4">
          <FiDroplet className="text-accent" size={24} />
          <div>
            <p className="text-dark-muted text-xs">Soil Moisture</p>
            <p className="text-white font-bold">42%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
