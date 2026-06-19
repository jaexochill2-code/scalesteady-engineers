"use client"
import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, Globe, Mail, Settings, Users, Check, CheckCircle2 } from "lucide-react"

const tabs = [
  { id: 'emails', label: 'Emails', icon: Mail },
  { id: 'domains', label: 'Domains', icon: Globe },
  { id: 'software', label: 'Software', icon: Settings },
]

const domains = [
  "chirofactory.space",
  "chirofactory.site",
  "chirofactory.rest",
  "chirofactory.online",
  "chirofactory.love",
  "chirofactory.living",
  "chirofactory.live",
  "chirofactory.fit",
  "chirofactory.click",
  "chirofactory.center",
]

const senderNames = ["s.kelly", "kelly", "kelly.soto", "soto.k", "kelly.s"]

const softwareTools = [
  { name: "Smartlead", role: "Primary Sequencer", description: "Manages automated scheduling, rotates sending across all 50 warmed inboxes, and paces warmup actions.", gradient: "from-emerald-500 to-teal-500" },
  { name: "Custom Scrapers", role: "Database Extraction", description: "Extracts deep geocoded local business profiles based on zip codes and chiropractic search definitions.", gradient: "from-blue-500 to-cyan-500" },
  { name: "Apollo.io", role: "Contact Enrichment", description: "Cross-references lead profiles to identify verified business owners, extract mobile/office numbers, and inject titles.", gradient: "from-amber-500 to-orange-500" },
  { name: "Anymail Finder", role: "Email Pattern Solver", description: "Locates hard-to-find contacts using domain-level naming patterns and verifies deliverability status in real time.", gradient: "from-violet-500 to-purple-500" },
  { name: "Neverbounce", role: "Real-Time Verification", description: "Validates 100% of lead email addresses at upload to keep campaign bounce rates under 2% and protect domain safety.", gradient: "from-teal-500 to-emerald-500" },
  { name: "Winnr Redirects", role: "Domain Traffic Router", description: "Configures custom domain redirects, permanently forwarding landing page visits back to your main site.", gradient: "from-cyan-500 to-blue-500" },
  { name: "Namecheap DNS", role: "Fleet Domain Manager", description: "Administers authoritative domain name settings and verifies SPF/DKIM/DMARC safety locks are fully configured.", gradient: "from-rose-500 to-pink-500" },
  { name: "Zoho Workspace", role: "Inbound Inbox Hosting", description: "Hosts the administrative inbound email boxes, routing prospect replies to our centralized management dashboard.", gradient: "from-indigo-500 to-violet-500" },
]

function generateEmails() {
  const emails: { address: string; sender: string; domain: string; status: string }[] = []
  for (const domain of domains) {
    for (const sender of senderNames) {
      emails.push({
        address: `${sender}@${domain}`,
        sender: "Kelly Soto",
        domain,
        status: "Fully Warmed",
      })
    }
  }
  return emails
}

export default function AssetsClient() {
  const [activeTab, setActiveTab] = useState('emails')
  const allEmails = generateEmails()

  return (
    <div className="min-h-screen w-full px-4 md:px-8 pt-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3">
          <Link href="/chirofactory" className="w-10 h-10 rounded-full bg-white/80 border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white transition-all shadow-sm">
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Your Assets</h1>
        </div>
        <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">Everything is Running</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto">
        {/* Hero Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-gradient-to-br from-slate-900 via-[#0d1f3c] to-slate-950 rounded-2xl p-6 text-white relative overflow-hidden">
            <Globe className="w-8 h-8 text-white/60 mb-4" />
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-wider mb-3">100% Secure</span>
            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-emerald-400 mb-1">Domain Fleet</p>
            <h3 className="text-3xl font-black tracking-tight mb-2">10 Domains</h3>
            <p className="text-xs text-slate-300 leading-relaxed">All connected and configured. Permanent redirections active to protect and build your main brand authority.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-900 via-[#0d1f3c] to-slate-950 rounded-2xl p-6 text-white relative overflow-hidden">
            <Mail className="w-8 h-8 text-white/60 mb-4" />
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 text-[9px] font-black uppercase tracking-wider mb-3">Fully Warmed</span>
            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-cyan-400 mb-1">Sending Capacity</p>
            <h3 className="text-3xl font-black tracking-tight mb-2">50 Inboxes</h3>
            <p className="text-xs text-slate-300 leading-relaxed">Sending up to 1,000 emails daily. All safety filters, SPF, DKIM, and DMARC locks are fully authenticated.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-900 via-[#0d1f3c] to-slate-950 rounded-2xl p-6 text-white relative overflow-hidden">
            {activeTab === 'software' ? (
              <>
                <Settings className="w-8 h-8 text-white/60 mb-4" />
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-[9px] font-black uppercase tracking-wider mb-3">System Active</span>
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-amber-400 mb-1">Infrastructure Setup</p>
                <h3 className="text-3xl font-black tracking-tight mb-2">8 Core Tools</h3>
                <p className="text-xs text-slate-300 leading-relaxed">All sending platforms, targeted list scrapers, enrichment databases, and DNS fleet managers are configured and covered.</p>
              </>
            ) : (
              <>
                <Users className="w-8 h-8 text-white/60 mb-4" />
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-400 text-[9px] font-black uppercase tracking-wider mb-3">DFW Segmented</span>
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-purple-400 mb-1">Database Scope</p>
                <h3 className="text-3xl font-black tracking-tight mb-2">10,000+ Leads</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Segmented by referral channels (Gyms, Attorneys, PE Teachers, CDL Holders) ready for patient-generation outreach.</p>
              </>
            )}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-white/60 backdrop-blur-sm border border-slate-200/40 rounded-xl p-1 w-fit mb-8">
          {tabs.map((tab) => {
            const TabIcon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'emails' && (
            <motion.div key="emails" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-black text-slate-900">50</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Active Email Accounts</span>
              </div>

              {domains.map((domain) => {
                const domainEmails = allEmails.filter(e => e.domain === domain)
                return (
                  <div key={domain} className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[1.75rem] p-5 mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-slate-900">{domain}</span>
                        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-200/60">5 Inboxes Active</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-600 text-white flex items-center gap-1"><Check className="w-2.5 h-2.5" /> SPF</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-600 text-white flex items-center gap-1"><Check className="w-2.5 h-2.5" /> DKIM</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-600 text-white flex items-center gap-1"><Check className="w-2.5 h-2.5" /> DMARC</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-900 text-white">Auto Warmup</span>
                      </div>
                    </div>
                    {domainEmails.map((email, i) => (
                      <div key={i} className="flex items-center justify-between py-2.5 border-t border-slate-50 first:border-t-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <Mail className="w-3.5 h-3.5 text-emerald-600" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900">{email.address}</span>
                            <span className="text-[10px] text-slate-400 block">Kelly Soto</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Warming Complete
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">100% Ready</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </motion.div>
          )}

          {activeTab === 'domains' && (
            <motion.div key="domains" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-black text-slate-900">10</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Your Domains</span>
              </div>

              <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[1.75rem] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                {domains.map((domain, i) => (
                  <div key={domain} className="flex items-center justify-between py-4 border-t border-slate-50 first:border-t-0">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <span className="text-sm font-extrabold text-slate-900">{domain}</span>
                        <span className="text-[10px] text-slate-400 block">Domain Traffic Routing Active -- https://chirofactory.com</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-600 text-white flex items-center gap-1"><Check className="w-2.5 h-2.5" /> SPF Secure</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-600 text-white flex items-center gap-1"><Check className="w-2.5 h-2.5" /> DKIM Sign</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-600 text-white flex items-center gap-1"><Check className="w-2.5 h-2.5" /> DMARC Lock</span>
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Delivery Configured</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'software' && (
            <motion.div key="software" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-black text-slate-900">8</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Active Tools</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {softwareTools.map((sw) => (
                  <div key={sw.name} className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[1.75rem] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${sw.gradient}`} />
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-base font-extrabold text-slate-900">{sw.name}</h4>
                        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-emerald-600 mt-0.5">{sw.role}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-600 text-white flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" /> Setup Complete
                        </span>
                        <span className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 px-2.5 py-0.5 rounded-md text-[9px] font-extrabold tracking-wide uppercase">
                          Paid by ScaleSteady
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{sw.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
