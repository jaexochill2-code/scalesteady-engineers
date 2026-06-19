"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, CheckCircle2, AlertCircle, Clock, Activity } from "lucide-react"

const timelinePhases = [
  {
    name: "Setup, Warmup & Testing (W1-4)",
    dateRange: "MAY 30 - JUN 24",
    status: "ACTIVE FOCUS",
    statusBg: "bg-emerald-500 text-white",
    icon: <Activity className="w-4 h-4 text-orange-500" />,
    items: [
      "Days 1-2: Provisioning (May 30 - May 31)",
      "Days 3-14: Account Warming (Jun 1 - Jun 12)",
      "Days 15-21: Safety & Copy Approvals (Jun 13 - Jun 19)",
      "Days 22-26: Funnel & Deliverability Testing (Jun 20 - Jun 24)",
    ]
  },
  {
    name: "B2B Phase 1 (W5)",
    dateRange: "JUN 25 - JUL 1",
    status: "PENDING",
    statusBg: "bg-slate-200 text-slate-600",
    icon: <Clock className="w-4 h-4 text-slate-400" />,
    description: "Personal Injury Attorneys campaign. Sending Monday-Friday only (Goal: 2,500 sent). Review every Friday."
  },
  {
    name: "B2C Phase 1 (W6)",
    dateRange: "JUL 2 - JUL 8",
    status: "PENDING",
    statusBg: "bg-slate-200 text-slate-600",
    icon: <Clock className="w-4 h-4 text-slate-400" />,
    description: "PE Teachers & Sports Coaches campaign. Sending Monday-Friday only (Goal: 2,500 sent). Review every Friday."
  },
  {
    name: "B2B Phase 2 (W7)",
    dateRange: "JUL 9 - JUL 15",
    status: "PENDING",
    statusBg: "bg-slate-200 text-slate-600",
    icon: <Clock className="w-4 h-4 text-slate-400" />,
    description: "Gym & CrossFit Owners campaign. Sending Monday-Friday only (Goal: 2,500 sent). Review every Friday."
  },
]

const highlights = [
  {
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    title: "Domain Redirects Configured",
    text: "10 custom domains are permanently linked to redirect traffic to your main website."
  },
  {
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    title: "Safety Verification Locked",
    text: "Standard delivery and safety records are fully secured across all 50 email accounts."
  },
  {
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    title: "Segmented Leads Database Sync",
    text: "10,000+ local DFW attorneys, fitness owners, PE teachers, and drivers are loaded and ready."
  },
]

const nextActions = [
  {
    icon: <AlertCircle className="w-4 h-4 text-orange-500" />,
    title: "Deliverability & Funnel Tests",
    text: "Running check dispatches to guarantee high inbox placement and confirm lead capture flows."
  },
  {
    icon: <AlertCircle className="w-4 h-4 text-orange-500" />,
    title: "Copy Approvals on Outreach Scripts",
    text: "Finalizing and reviewing email angles for Personal Injury Attorneys and Gym Owners."
  },
]

export default function ReadinessPage() {
  return (
    <div className="min-h-screen w-full px-4 md:px-8 pt-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3">
          <Link href="/chirofactory" className="w-10 h-10 rounded-full bg-white/80 border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white transition-all shadow-sm">
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Campaign Overview</h1>
        </div>
        <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">System Live & Routing Active</span>
        </div>
      </div>

      {/* Two Column Layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1200px] mx-auto"
      >
        {/* Left: Campaign Status */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />

          <div className="mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 block mb-2">Campaign Status</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Where We Are Today</h2>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mb-8">
            Dr. Monet, our sending infrastructure is fully warmed and authenticated. We have compiled a massive, hyper-targeted local database. Currently, we are in the deliverability testing phase to ensure your emails avoid spam filters entirely before launch.
          </p>

          {/* Highlights */}
          <div className="mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-4">Recent Highlights & Wins</span>
            <div className="flex flex-col gap-4">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">{h.icon}</div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">{h.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{h.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Actions */}
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-4">Next Action Items & Focus</span>
            <div className="flex flex-col gap-4">
              {nextActions.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">{a.icon}</div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">{a.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Campaign Timeline */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />

            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 block mb-2">Campaign Timeline</span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Launch Roadmap</h2>
            </div>

            {/* Vertical Timeline */}
            <div className="flex flex-col gap-6 relative">
              <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-slate-200/60" />

              {timelinePhases.map((phase, i) => (
                <div key={i} className="flex items-start gap-4 relative">
                  <div className="shrink-0 mt-1 relative z-10">{phase.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="text-sm font-extrabold text-slate-900">{phase.name}</h4>
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${phase.statusBg}`}>
                        {phase.status}
                      </span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{phase.dateRange}</p>
                    {phase.items && (
                      <ul className="text-xs text-slate-500 leading-relaxed">
                        {phase.items.map((item, j) => (
                          <li key={j} className="leading-relaxed">- {item}</li>
                        ))}
                      </ul>
                    )}
                    {phase.description && (
                      <p className="text-xs text-slate-500 leading-relaxed">{phase.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Promise Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#071b38] to-slate-950 text-white border border-blue-500/20 shadow-sm">
            <span className="text-[9.5px] font-black uppercase tracking-[0.2em] text-blue-400 block mb-1">Campaign Promise</span>
            <h4 className="text-lg font-black tracking-tight mb-2">30,000 Total Emails</h4>
            <p className="text-[11.5px] font-semibold text-slate-300 leading-relaxed">
              A 90-day engagement cycle (including the warmup starting May 30). Includes weekly sending updates and Friday review sessions. Sending is active Monday-Friday only.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
