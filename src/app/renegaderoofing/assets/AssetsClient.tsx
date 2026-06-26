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

// 5 active Renegade Roofing Co sending domains
const allDomains = [
  "renegaderoofingco.best",
  "renegaderoofingco.homes",
  "renegaderoofingco.pro",
  "renegaderoofingco.vip",
  "renegaderoofingco.work",
]

// 5 senders per domain -- sourced from onboarding submission
const senders = ["william", "william.roberts", "wroberts", "will", "founder"]

const softwareTools = [
  { name: "Smartlead", role: "Primary Sequencer", description: "Manages automated scheduling, rotates sending across all 25 warmed inboxes, and paces warmup actions at safe daily volume.", gradient: "from-emerald-500 to-teal-500" },
  { name: "Custom Scrapers", role: "Database Extraction", description: "Extracts deep geocoded local business profiles from Broward and Palm Beach Counties based on zip codes and referral vertical definitions.", gradient: "from-blue-500 to-cyan-500" },
  { name: "Apollo.io", role: "Contact Enrichment", description: "Cross-references lead profiles to identify verified business owners, extract mobile and office numbers, and inject decision-maker titles.", gradient: "from-amber-500 to-orange-500" },
  { name: "Anymail Finder", role: "Email Pattern Solver", description: "Locates hard-to-find contacts using domain-level naming patterns and verifies deliverability status in real time.", gradient: "from-violet-500 to-purple-500" },
  { name: "Neverbounce", role: "Real-Time Verification", description: "Validates 100% of lead email addresses at upload to keep campaign bounce rates under 2% and protect domain safety.", gradient: "from-teal-500 to-emerald-500" },
  { name: "Winnr", role: "Inbox Hosting & Routing", description: "Hosts all 25 outreach mailboxes under the renegaderoofingco fleet. Handles inbound reply routing and domain redirect configuration back to renegaderoofingco.com.", gradient: "from-cyan-500 to-blue-500" },
  { name: "Namecheap", role: "Domain Registrar", description: "Registers and administers all 5 renegaderoofingco outreach domains. Nameservers are delegated to Winnr for full SPF, DKIM, and DMARC record management.", gradient: "from-rose-500 to-pink-500" },
  { name: "Smartlead Warmup", role: "Inbox Reputation Builder", description: "Runs the automated peer-to-peer warmup cycle -- sending, receiving, and positive-signaling emails on behalf of all 25 inboxes to build sender reputation before live sends.", gradient: "from-indigo-500 to-violet-500" },
]

function generateEmails() {
  const emails: { address: string; sender: string; domain: string; status: string }[] = []

  // 5 domains x 5 senders = 25 accounts
  for (const domain of allDomains) {
    for (const sender of senders) {
      emails.push({ address: `${sender}@${domain}`, sender: "William Roberts", domain, status: "Fully Warmed" })
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
          <Link href="/renegaderoofing" className="w-10 h-10 rounded-full bg-white/80 border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white transition-all shadow-sm">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {/* Domain Fleet */}
          <div className="bg-white/85 backdrop-blur-xl border border-slate-200/60 rounded-[2rem] p-6 text-slate-900 relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            <Globe className="w-8 h-8 text-emerald-600 mb-4" />
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 border border-emerald-200/60 text-[9px] font-black uppercase tracking-wider mb-3">100% Secure</span>
            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-emerald-600 mb-1">Domain Fleet</p>
            <h3 className="text-3xl font-black tracking-tight mb-1 text-slate-900">5 Domains</h3>
            <p className="text-[10px] font-extrabold text-slate-500 mb-2">Renegade Roofing Co.</p>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">All outreach traffic permanently redirects to renegaderoofingco.com, building brand authority with every send.</p>
          </div>

          {/* Sending Capacity */}
          <div className="bg-white/85 backdrop-blur-xl border border-slate-200/60 rounded-[2rem] p-6 text-slate-900 relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            <Mail className="w-8 h-8 text-cyan-600 mb-4" />
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-700 border border-cyan-200/60 text-[9px] font-black uppercase tracking-wider mb-3">Fully Warmed</span>
            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-cyan-600 mb-1">Sending Capacity</p>
            <h3 className="text-3xl font-black tracking-tight mb-1 text-slate-900">25 Inboxes</h3>
            <p className="text-[10px] font-extrabold text-slate-500 mb-2">5 domains × 5 senders</p>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">Up to 500 emails daily. All SPF, DKIM, and DMARC authentication locks fully verified on each inbox.</p>
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
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-black text-slate-900">25</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Active Email Accounts</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">5 Renegade Roofing Co. sending domains × 5 sender identities</p>

              {allDomains.map((domain) => {
                const domainEmails = allEmails.filter(e => e.domain === domain)
                return (
                  <div key={domain} className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[1.75rem] p-5 mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-slate-900">{domain}</span>
                        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border bg-emerald-500/10 text-emerald-600 border-emerald-200/60">
                          Renegade Fleet -- 5 Inboxes
                        </span>
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
                            <span className="text-[10px] text-slate-400 block">{email.sender}</span>
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
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-black text-slate-900">5</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Your Domains</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">All configured as outreach sending domains. All traffic permanently redirects to renegaderoofingco.com.</p>

              <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[1.75rem] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                {allDomains.map((domain, i) => (
                  <div key={domain} className="flex items-center justify-between py-4 border-t border-slate-50 first:border-t-0">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <span className="text-sm font-extrabold text-slate-900">{domain}</span>
                        <span className="text-[10px] text-slate-400 block">Routing Active -- https://renegaderoofingco.com</span>
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
