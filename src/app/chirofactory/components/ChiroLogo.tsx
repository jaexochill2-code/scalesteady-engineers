export default function ChiroLogo() {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative flex items-center justify-center w-8 h-8 rounded-full border-[1.5px] border-[#059669] text-[#059669] bg-white">
        <div className="absolute -inset-1 rounded-full border border-[#059669]/40" />
        <div className="absolute -inset-2 rounded-full border border-[#059669]/20" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M12 2v8"/>
          <path d="M12 14v8"/>
          <circle cx="12" cy="12" r="2"/>
          <path d="M9 5c-1 1-2 2-2 3"/>
          <path d="M15 5c1 1 2 2 2 3"/>
          <path d="M9 19c-1-1-2-2-2-3"/>
          <path d="M15 19c1-1 2-2 2-3"/>
        </svg>
      </div>
      <div className="flex flex-col -gap-2 uppercase leading-none">
        <span className="text-[10px] font-medium text-[#059669] tracking-[0.2em] mb-[2px]">Chiro</span>
        <span className="text-[19px] font-extrabold text-slate-900 tracking-tight lowercase">factory</span>
      </div>
    </div>
  )
}
