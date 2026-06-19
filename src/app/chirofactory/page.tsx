"use client"
import { motion } from "framer-motion"
import { Server, Mail, Users, Compass, ChevronRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "overview",
    title: "Overview",
    subtitle: "Campaign Milestones & Timelines",
    description: "Verify the running state of the campaign, wins, challenges, and objectives along our roadmap.",
    href: "/chirofactory/readiness",
    icon: Server,
    gradient: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16,185,129,0.06)",
    actionLabel: "View Roadmap"
  },
  {
    id: "assets",
    title: "Sending Fleet",
    subtitle: "Warmed Email Accounts & Domain Routing",
    description: "Manage warmed email outreach accounts, domain redirects, safety records, and software integrations.",
    href: "/chirofactory/assets",
    icon: Mail,
    gradient: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59,130,246,0.06)",
    actionLabel: "Manage Fleet"
  },
  {
    id: "leads",
    title: "Leads Database",
    subtitle: "Standalone Contact Lists & CSV Uploader",
    description: "Access segmented patient & referral databases, track counts, and upload new leadlists via the secure importer.",
    href: "/chirofactory/leads",
    icon: Users,
    gradient: "from-purple-500 to-indigo-500",
    glowColor: "rgba(168,85,247,0.06)",
    actionLabel: "Explore Leads"
  },
  {
    id: "strategy",
    title: "Strategy & ICP",
    subtitle: "Outreach Copywriting & Response Angles",
    description: "Review calibrated outreach scripts, ICP research data, and market intelligence for each vertical.",
    href: "/chirofactory/strategy",
    icon: Compass,
    gradient: "from-orange-500 to-amber-500",
    glowColor: "rgba(249,115,22,0.06)",
    actionLabel: "View Strategy"
  },
]

export default function ChirofactoryHomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 pt-10 pb-20">
      {/* Immersive Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center flex flex-col items-center gap-6 mb-16"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="px-4 py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 shadow-sm flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-700">
            System Live & Routing Active
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 drop-shadow-sm max-w-3xl leading-[1.1]">
          Welcome,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] via-[#10B981] to-[#06b6d4]">
            Dr. Monet.
          </span>
        </h1>

        <p className="text-slate-500 text-sm font-medium max-w-md">
          Track campaign milestones, sending fleet status, and strategy vectors.
        </p>
      </motion.header>

      {/* Vertical Category Cards */}
      <div className="flex flex-col gap-6 w-full max-w-[900px]">
        {categories.map((cat, index) => {
          const IconComponent = cat.icon
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={cat.href} className="block group">
                <div
                  className="relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-[1.75rem] p-7 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${cat.glowColor} 0%, transparent 60%)` }}
                >
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.gradient}`} />

                  <div className="flex items-center gap-5">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} bg-opacity-10 flex items-center justify-center shrink-0`}>
                      <IconComponent className="w-5 h-5 text-white/90" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-black text-slate-900 tracking-tight">{cat.title}</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-2">{cat.description}</p>
                    </div>

                    {/* Action */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden md:inline-block text-xs font-bold text-slate-500 border border-slate-200 rounded-full px-4 py-2 group-hover:border-slate-300 transition-colors">
                        {cat.actionLabel}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
