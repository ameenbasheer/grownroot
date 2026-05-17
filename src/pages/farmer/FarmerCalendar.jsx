import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiCalendar } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { DecorativeCircle } from '../../components/common/DecorativeElements';
import { PIE_PALETTE } from '../../components/common/PieChart3D';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function isoToLocalDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}

function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function FarmerCalendar() {
  const { crops } = useApp();
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState(today);

  const events = useMemo(() => {
    const list = [];
    crops.forEach((c, idx) => {
      const color = PIE_PALETTE[idx % PIE_PALETTE.length];
      const plant = isoToLocalDate(c.plantingDate);
      if (plant) list.push({ date: plant, type: 'Planting', crop: c, color });
      const harvest = isoToLocalDate(c.harvestingDate);
      if (harvest) list.push({ date: harvest, type: 'Harvesting', crop: c, color });
      (c.expenses || []).forEach((ex) => {
        const d = isoToLocalDate(ex.date);
        if (d) list.push({ date: d, type: 'Expense', crop: c, color, amount: ex.amount, label: ex.label });
      });
      (c.sales || []).forEach((s) => {
        const d = isoToLocalDate(s.date);
        if (d) list.push({ date: d, type: 'Sale', crop: c, color, amount: s.amount, label: s.label });
      });
    });
    return list;
  }, [crops]);

  const monthGrid = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstDay = new Date(year, month, 1);
    const lead = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < lead; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [cursor]);

  const eventsForDay = (day) => events.filter((e) => sameDay(e.date, day));
  const selectedEvents = selectedDay ? eventsForDay(selectedDay) : [];

  const upcoming = useMemo(() => {
    const now = new Date();
    return events
      .filter((e) => e.date >= now)
      .sort((a, b) => a.date - b.date)
      .slice(0, 6);
  }, [events]);

  const monthLabel = `${MONTHS[cursor.getMonth()]} ${cursor.getFullYear()}`;

  const stepMonth = (delta) => {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1));
  };

  return (
    <div className="relative">
      <DecorativeCircle size="lg" className="-top-32 -right-32 opacity-10" />

      <div className="mb-5 relative z-10 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl md:text-4xl font-light text-white">Farmer</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Calendar</h2>
        </div>
        <div className="flex items-center gap-2 glass-card px-3 py-2">
          <button
            type="button"
            onClick={() => stepMonth(-1)}
            className="text-dark-muted hover:text-accent p-1 transition"
            aria-label="Previous month"
          >
            <FiChevronLeft size={18} />
          </button>
          <span className="text-white text-sm font-semibold w-36 text-center">{monthLabel}</span>
          <button
            type="button"
            onClick={() => stepMonth(1)}
            className="text-dark-muted hover:text-accent p-1 transition"
            aria-label="Next month"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-10">
        {/* Calendar grid */}
        <div className="lg:col-span-2 glass-card p-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((d) => (
              <div key={d} className="text-center text-dark-muted text-[10px] uppercase tracking-wider py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {monthGrid.map((day, i) => {
              if (!day) return <div key={i} className="h-20 rounded-lg" />;
              const dayEvents = eventsForDay(day);
              const isToday = sameDay(day, today);
              const isSelected = selectedDay && sameDay(day, selectedDay);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`h-20 rounded-lg p-1.5 text-left border transition-all relative overflow-hidden ${
                    isSelected
                      ? 'bg-accent/15 border-accent shadow-[0_0_0_1px_rgba(45,212,191,0.4)]'
                      : isToday
                      ? 'bg-dark-card border-accent/40'
                      : dayEvents.length
                      ? 'bg-dark-card/70 border-dark-border hover:border-accent/40'
                      : 'bg-dark-card/30 border-dark-border/50 hover:border-accent/20'
                  }`}
                >
                  <span className={`text-xs font-semibold ${isToday ? 'text-accent' : 'text-white'}`}>
                    {day.getDate()}
                  </span>
                  <div className="mt-1 flex flex-wrap gap-0.5">
                    {dayEvents.slice(0, 3).map((e, idx) => (
                      <span
                        key={idx}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: e.color }}
                        title={`${e.crop.name} · ${e.type}`}
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-[9px] text-dark-muted">+{dayEvents.length - 3}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Side panels */}
        <div className="lg:col-span-1 space-y-5">
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <FiCalendar className="text-accent" size={16} />
              <p className="text-white text-sm font-semibold">
                {selectedDay
                  ? selectedDay.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
                  : 'Select a day'}
              </p>
            </div>
            {selectedEvents.length === 0 ? (
              <p className="text-dark-muted text-xs">Nothing scheduled.</p>
            ) : (
              <ul className="space-y-2">
                {selectedEvents.map((e, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: e.color }} />
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/dashboard/crops/${e.crop.id}`}
                        className="text-white text-xs font-medium hover:text-accent no-underline"
                      >
                        {e.crop.name}
                      </Link>
                      <p className="text-dark-muted text-[11px]">
                        {e.type}
                        {e.amount ? ` · ₹${e.amount}` : ''}
                        {e.label ? ` · ${e.label}` : ''}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="glass-card p-5">
            <p className="text-dark-muted text-xs uppercase tracking-wider mb-3">Upcoming</p>
            {upcoming.length === 0 ? (
              <p className="text-dark-muted text-xs">No upcoming events.</p>
            ) : (
              <ul className="space-y-2.5">
                {upcoming.map((e, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div
                      className="rounded-lg w-11 h-11 flex flex-col items-center justify-center text-[10px] text-dark-bg font-bold shrink-0"
                      style={{ background: e.color }}
                    >
                      <span>{e.date.toLocaleDateString('en-US', { month: 'short' })}</span>
                      <span className="text-base leading-none">{e.date.getDate()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/dashboard/crops/${e.crop.id}`}
                        className="text-white text-sm font-medium truncate block hover:text-accent no-underline"
                      >
                        {e.crop.name}
                      </Link>
                      <p className="text-dark-muted text-[11px]">{e.type}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
