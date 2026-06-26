"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Building2, Home, Scale, ExternalLink, Database } from "lucide-react"

const campaigns = [
  {
    id: 'property_managers',
    name: 'Commercial Property Managers',
    count: '600+',
    vertical: 'PM Referral',
    description: 'Broward County commercial property managers, facility directors, and HOAs. High-intent outreach targeted at commercial property portfolios.',
    accent: 'text-emerald-600 group-hover:text-emerald-700',
    border: 'border-emerald-500/10 hover:border-emerald-500/30',
    iconColor: 'text-emerald-600',
    bgGlow: 'rgba(16,185,129,0.03)',
    gradient: 'from-emerald-500 via-teal-500 to-emerald-600',
    icon: Building2,
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1aGMj77WmO-xSi6PIDFjhP2lS0_UYiYYJQarH51h_e5A/edit#gid=1093747230',
  },
  {
    id: 'realtors',
    name: 'Real Estate Agents',
    count: '11,000+',
    vertical: 'Escrow Saver',
    description: 'Broward & Palm Beach Counties residential and commercial real estate agents. Leverages the 24h Escrow-Saver drone pre-inspection hook.',
    accent: 'text-violet-600 group-hover:text-violet-700',
    border: 'border-violet-500/10 hover:border-violet-500/30',
    iconColor: 'text-violet-600',
    bgGlow: 'rgba(139,92,246,0.03)',
    gradient: 'from-violet-500 via-fuchsia-500 to-purple-600',
    icon: Home,
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1aGMj77WmO-xSi6PIDFjhP2lS0_UYiYYJQarH51h_e5A/edit#gid=1847023262',
  },
  {
    id: 'adjusters',
    name: 'Insurance Adjusters',
    count: '600+',
    vertical: 'Adjuster Referral',
    description: 'Florida licensed public adjusters, storm damage assessors, and estimators. Focuses on Xactimate-precise estimates and LOP acceptance.',
    accent: 'text-cyan-600 group-hover:text-cyan-700',
    border: 'border-cyan-500/10 hover:border-cyan-500/30',
    iconColor: 'text-cyan-600',
    bgGlow: 'rgba(6,182,212,0.03)',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    icon: Scale,
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1aGMj77WmO-xSi6PIDFjhP2lS0_UYiYYJQarH51h_e5A/edit#gid=805476317',
  },
]

export default function LeadsPage() {
  return (
    <div className="min-h-screen w-full px-4 md:px-8 pt-8 pb-20 relative overflow-hidden bg-slate-50/30">
      {/* Soft Pastel Mesh Blurs for Warm Light Mode */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-violet-500/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-16 max-w-[1200px] mx-auto relative z-10">
        <div className="flex items-center gap-4">
          <Link href="/renegaderoofing" className="w-12 h-12 rounded-2xl bg-white/80 border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white transition-all shadow-sm backdrop-blur-xl">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Database className="w-4 h-4 text-emerald-600" />
              <span className="text-[9px] font-black uppercase tracking-[0.35em] text-emerald-600">Database Engine</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">Leads Directory</h1>
          </div>
        </div>
        <div className="px-5 py-2 rounded-2xl bg-white/80 border border-slate-200/60 backdrop-blur-xl flex items-center gap-2 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Live Sync Enabled</span>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-[1200px] mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {campaigns.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.a
                key={c.id}
                href={c.sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`bg-white/85 backdrop-blur-xl ${c.border} rounded-[2.25rem] p-8 text-left transition-all duration-500 border flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:scale-[1.04] active:scale-[0.99] relative overflow-hidden group shadow-[0_8px_30px_rgba(0,0,0,0.02)]`}
              >
                {/* Visual Glow Layer */}
                <div 
                  className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[50px] transition-opacity duration-500 opacity-20 group-hover:opacity-40 pointer-events-none"
                  style={{ backgroundColor: c.bgGlow }}
                />
                
                {/* Top Accent Gradient Bar */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${c.gradient}`} />
                
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 backdrop-blur-xl shadow-inner`}>
                      <Icon className={`w-6 h-6 ${c.iconColor} transition-transform duration-500`} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-250/50 text-slate-600 shadow-sm`}>
                      {c.vertical}
                    </span>
                  </div>

                  <h4 className="text-xl font-black text-slate-900 leading-tight mb-3 transition-colors">
                    {c.name}
                  </h4>
                  
                  <p className="text-[12.5px] font-semibold text-slate-500 mb-10 leading-relaxed">
                    {c.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                    <span className="text-xs font-black text-slate-500 tracking-wide">
                      {c.count} Active Leads
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 text-[10.5px] font-black uppercase tracking-wider text-slate-700 group-hover:text-emerald-600 transition-colors underline decoration-2 underline-offset-4 decoration-slate-300 group-hover:decoration-emerald-500">
                    Open Sheet <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                  </span>
                </div>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
