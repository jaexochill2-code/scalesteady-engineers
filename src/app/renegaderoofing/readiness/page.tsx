"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, CheckCircle2, AlertCircle, Clock, Activity } from "lucide-react"

const timelinePhases = [
  {
    name: "Setup & Provisioning (W1)",
    dateRange: "JUN 5 - JUN 9",
    status: "COMPLETE",
    statusBg: "bg-slate-700 text-white",
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    items: [
      "Jun 5: Sales call & campaign alignment",
      "Jun 6: Payment processed -- team activated, assets ordered",
      "Jun 7: Domains registered on Namecheap (renegaderoofingco.best / .homes / .pro / .vip / .work)",
      "Jun 9: All 25 mailboxes provisioned in Winnr & connected to Smartlead",
    ]
  },
  {
    name: "Inbox Warmup -- 14-Day Google Observation (W2-3)",
    dateRange: "JUN 9 - JUN 19",
    status: "COMPLETE",
    statusBg: "bg-slate-700 text-white",
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    items: [
      "Jun 9: Official 14-day warmup cycle initiated across all 25 inboxes",
      "Jun 9-18: Automated peer-to-peer warmup sending, positive engagement signals daily",
      "Jun 19: Warmup concluded -- all 25 mailboxes cleared for live campaign sends",
    ]
  },
  {
    name: "Copy Approval, List Finalization & Compliance (W4)",
    dateRange: "JUN 20 - JUN 26",
    status: "COMPLETE",
    statusBg: "bg-slate-700 text-white",
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    items: [
      "Jun 20: CAN-SPAM compliance framework confirmed (custom domains, opt-out, physical address, no RESPA violations)",
      "Jun 24: Lead list finalized -- 34,854 active licensed professionals (United Realty, Keyes, Lokation and more)",
      "Jun 24: A/B testing on sequence copies completed -- subject lines and hooks validated against each ICP",
      "Jun 26: Sequence copies + lead list delivered to William for review",
    ]
  },
  {
    name: "Realtor Referral Launch (W5)",
    dateRange: "JUN 29 - JUL 3",
    status: "LAUNCHING",
    statusBg: "bg-orange-500 text-white",
    icon: <Activity className="w-4 h-4 text-orange-500" />,
    description: "B2B Real Estate Agents & Escrow Officers campaign. Targeting Broward residential agents with the 24h Escrow-Saver drone pre-inspection hook. Sending Monday-Friday only (Goal: 2,500 sends). Review every Friday."
  },
  {
    name: "Property Manager Alliance (W6)",
    dateRange: "JUL 6 - JUL 10",
    status: "PENDING",
    statusBg: "bg-slate-200 text-slate-600",
    icon: <Clock className="w-4 h-4 text-slate-400" />,
    description: "B2B Property Managers & Facility Directors campaign. Targeting Broward commercial and residential PMs with the thermal moisture scan and always-on storm backup hook. Sending Monday-Friday only (Goal: 2,500 sends). Review every Friday."
  },
  {
    name: "Insurance Adjuster Partnership (W7)",
    dateRange: "JUL 13 - JUL 17",
    status: "PENDING",
    statusBg: "bg-slate-200 text-slate-600",
    icon: <Clock className="w-4 h-4 text-slate-400" />,
    description: "B2B Public & Storm Adjusters campaign. Targeting South Florida claims coordinators with Xactimate-precise estimates and LOP acceptance. Sending Monday-Friday only (Goal: 2,500 sends). Review every Friday."
  },
  {
    name: "Industrial & Warehouse Owners (W8)",
    dateRange: "JUL 20 - JUL 24",
    status: "PENDING",
    statusBg: "bg-slate-200 text-slate-600",
    icon: <Clock className="w-4 h-4 text-slate-400" />,
    description: "Commercial flat-roof owners in Broward's industrial corridors (Dania Beach, Davie, Pompano Beach). Silicone restoration coating hook -- 50% cheaper than TPO replacement, 100% Section 179 deductible. Sending Monday-Friday only (Goal: 2,000 sends). Review every Friday."
  },
]

const highlights = [
  {
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    title: "Warmup Complete",
    text: "Full warmup cycle concluded Jun 19. All 25 inboxes passed deliverability checks and are cleared for live campaign sends."
  },
  {
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    title: "25 Outreach Mailboxes Verified",
    text: "25 renegaderoofingco inboxes across 5 Namecheap domains hosted in Winnr: SPF, DKIM, and DMARC authentication confirmed on all 5 domains. Daily capacity: 500 sends."
  },
  {
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    title: "4 ICP Databases Loaded",
    text: "Broward-segmented lead lists for Realtors (11,000+), Property Managers (600+), Insurance Adjusters (600+), and Industrial Owners are indexed and gated."
  },
]

const nextActions = [
  {
    icon: <AlertCircle className="w-4 h-4 text-orange-500" />,
    title: "Copy Approval -- Realtor Escrow-Saver Scripts",
    text: "Review and approve the 2-email Escrow-Saver sequence before the W5 Realtor Referral send begins. Spintax-formatted, under 80 words, Voss no-oriented CTA."
  },
  {
    icon: <AlertCircle className="w-4 h-4 text-orange-500" />,
    title: "Final Inbox Placement Confirmation",
    text: "Confirming seed-list placement scores reach 90%+ on Gmail and Outlook before activating sends to william@renegaderoofingco.com reply routing."
  },
]

export default function ReadinessPage() {
  return (
    <div className="min-h-screen w-full px-4 md:px-8 pt-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3">
          <Link href="/renegaderoofing" className="w-10 h-10 rounded-full bg-white/80 border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white transition-all shadow-sm">
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
            William, our sending infrastructure is fully warmed and authenticated. We have compiled a massive, hyper-targeted local database. Currently, we are in the deliverability testing phase to ensure your emails avoid spam filters entirely before launch.
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
          <div className="p-6 rounded-2xl bg-white/85 backdrop-blur-xl border border-blue-500/15 text-slate-900 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            <span className="text-[9.5px] font-black uppercase tracking-[0.2em] text-blue-600 block mb-1">Campaign Promise</span>
            <h4 className="text-lg font-black text-slate-900 tracking-tight mb-2">30,000 Total Emails</h4>
            <p className="text-[11.5px] font-semibold text-slate-500 leading-relaxed">
              A 60-day engagement cycle (including the warmup starting June 9). Includes weekly sending updates and Friday review sessions. Sending is active Monday-Friday only.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
