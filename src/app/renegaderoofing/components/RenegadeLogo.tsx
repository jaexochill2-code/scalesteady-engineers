export default function RenegadeLogo() {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Icon: Shield + Roof Outline in Emerald Green to match original color palette */}
      <div className="relative flex items-center justify-center w-8 h-8 rounded-full border-[1.5px] border-[#059669] text-[#059669] bg-white">
        <div className="absolute -inset-1 rounded-full border border-[#059669]/40" />
        <div className="absolute -inset-2 rounded-full border border-[#059669]/20" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <path d="M9 22V12h6v10"/>
        </svg>
      </div>
      
      {/* Typography: Small uppercase emerald RENEGADE, large lowercase slate roofing */}
      <div className="flex flex-col -gap-2 uppercase leading-none">
        <span className="text-[10px] font-medium text-[#059669] tracking-[0.2em] mb-[2px]">
          RENEGADE
        </span>
        <span className="text-[19px] font-extrabold text-slate-900 tracking-tight lowercase">
          roofing
        </span>
      </div>
    </div>
  )
}
