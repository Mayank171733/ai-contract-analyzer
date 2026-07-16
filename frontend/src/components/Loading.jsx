const Loading = ({ label = 'Loading...' }) => (
  <div className="flex min-h-[240px] items-center justify-center">
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-100 border-t-brand-500" />
      <p className="text-sm font-medium text-slate-600">{label}</p>
    </div>
  </div>
)

export default Loading
