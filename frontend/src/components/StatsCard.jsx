const StatsCard = ({ title, value, icon: Icon, tone }) => (
  <div className="animate-fade-in card-sheen rounded-[26px] border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      </div>
      <div className={`rounded-2xl p-3 ${tone}`}>
        <Icon size={20} />
      </div>
    </div>
  </div>
)

export default StatsCard
