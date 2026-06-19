"use client"
import { useState, useRef, useCallback, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, Upload, Download, Users } from "lucide-react"

type Lead = { companyName: string; email: string; city: string }

const campaigns = [
  {
    id: 'pi_attorneys',
    name: 'Personal Injury Attorneys',
    count: '300+',
    vertical: 'Legal Referral',
    description: 'DFW metro personal injury law firms and accident attorneys.',
    accent: 'text-cyan-600',
    bg: 'bg-cyan-500/5',
    border: 'border-cyan-500/15',
  },
  {
    id: 'gyms_fitness',
    name: 'Gyms & CrossFit Studios',
    count: '500+',
    vertical: 'Fitness Referral',
    description: 'CrossFit boxes, F45, OrangeTheory, and independent gyms.',
    accent: 'text-emerald-600',
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/15',
  },
  {
    id: 'realtors',
    name: 'Real Estate Agents',
    count: '3,000+',
    vertical: 'MLS Referral',
    description: 'North Texas residential real estate agents and brokerages.',
    accent: 'text-violet-600',
    bg: 'bg-violet-500/5',
    border: 'border-violet-500/15',
  },
  {
    id: 'pe_teachers',
    name: 'PE Teachers & Coaches',
    count: '1,500+',
    vertical: 'ISD B2C Patient',
    description: 'Texas ISD physical education teachers, athletic trainers, and coaches.',
    accent: 'text-amber-600',
    bg: 'bg-amber-500/5',
    border: 'border-amber-500/15',
  },
  {
    id: 'cdl_truckers',
    name: 'CDL Holders & Truckers',
    count: '5,000+',
    vertical: 'CDL B2C Patient',
    description: 'Commercial drivers, fleet operators, and trucking company owners in DFW.',
    accent: 'text-rose-600',
    bg: 'bg-rose-500/5',
    border: 'border-rose-500/15',
  },
]

export default function LeadsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0])
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [anglesApproved, setAnglesApproved] = useState(false)
  const [campaignDeployed, setCampaignDeployed] = useState(false)
  const [abTestingComplete, setAbTestingComplete] = useState(false)

  useEffect(() => {
    setAnglesApproved(localStorage.getItem("angles_approved") === "true")
    setCampaignDeployed(localStorage.getItem("campaign_deployed") === "true")
    const isTargetReached = new Date() >= new Date("2026-06-20T00:00:00")
    setAbTestingComplete(isTargetReached)
  }, [])

  const isUnlocked = anglesApproved && campaignDeployed && abTestingComplete

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    const text = await file.text()
    const rows = text.split('\n').slice(1)
    const parsed = rows.filter(r => r.trim()).map(r => {
      const cols = r.split(',')
      return { companyName: cols[0]?.trim() || '', email: cols[1]?.trim() || '', city: cols[2]?.trim() || '' }
    })
    setLeads(parsed)
    setLoading(false)
  }, [])

  const downloadCSV = useCallback(() => {
    if (leads.length === 0) return
    const header = 'Company Name,Email,City\n'
    const body = leads.map(l => `${l.companyName},${l.email},${l.city}`).join('\n')
    const blob = new Blob([header + body], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedCampaign.id}_leads.csv`
    a.click()
    URL.revokeObjectURL(url)
  }, [leads, selectedCampaign])

  return (
    <div className="min-h-screen w-full px-4 md:px-8 pt-8 pb-20 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-10 max-w-[1200px] mx-auto relative z-10">
        <div className="flex items-center gap-3">
          <Link href="/chirofactory" className="w-10 h-10 rounded-full bg-white/80 border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white transition-all shadow-sm">
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Leads Database</h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="locked_view"
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-8 md:p-12 text-slate-900 text-center max-w-[540px] mx-auto relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.04)] mt-10"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-80" />
              <div className="w-20 h-20 rounded-3xl bg-white border border-slate-200/60 flex items-center justify-center mx-auto mb-8 text-emerald-600 shadow-sm shadow-slate-900/5">
                <Users className="w-9 h-9" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 mb-3">Leads Database</h2>
              <div className="bg-slate-50/50 border border-slate-200/50 rounded-3xl p-6 text-center">
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Leads are accessible when the inbox placement and funnel testing is done. We need your approval on the copies first to validate our targeting.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked_view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-8"
            >
              <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[1.75rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] mb-2">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Upload className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">Upload New Leads</h3>
                      <p className="text-xs text-slate-500">Select a CSV file to import records directly.</p>
                    </div>
                  </div>
                  <label className="cursor-pointer px-6 py-3 rounded-xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400 hover:border-slate-300 hover:text-slate-500 transition-colors shrink-0">
                    Drag CSV here or click to browse
                    <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleUpload} />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {campaigns.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCampaign(c)}
                    className={`rounded-2xl p-4 text-left transition-all duration-200 border ${
                      selectedCampaign.id === c.id
                        ? 'bg-slate-900 text-white border-slate-800 shadow-lg'
                        : `bg-white/80 ${c.border} hover:shadow-md`
                    }`}
                  >
                    <span className={`text-[9px] font-black uppercase tracking-[0.15em] block mb-1 ${
                      selectedCampaign.id === c.id ? 'text-emerald-400' : c.accent
                    }`}>
                      {c.vertical}
                    </span>
                    <h4 className={`text-sm font-extrabold leading-tight mb-2 ${
                      selectedCampaign.id === c.id ? 'text-white' : 'text-slate-900'
                    }`}>
                      {c.name}
                    </h4>
                    <span className={`text-xs font-bold ${
                      selectedCampaign.id === c.id ? 'text-slate-300' : 'text-slate-400'
                    }`}>
                      {c.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-[1.75rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold text-slate-900">{selectedCampaign.name}</h3>
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 border border-cyan-200/60">
                        {selectedCampaign.vertical}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{selectedCampaign.description}</p>
                  </div>
                  <button
                    onClick={downloadCSV}
                    disabled={leads.length === 0}
                    className="flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl disabled:opacity-50 hover:bg-slate-800 transition-colors self-start sm:self-center"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Complete CSV
                  </button>
                </div>

                <div className="border-t border-slate-100 overflow-x-auto">
                  <div className="min-w-[600px]">
                    <div className="grid grid-cols-3 py-3 px-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      <span>Company Name</span>
                      <span>Email Address</span>
                      <span>Location / City</span>
                    </div>
                    {leads.length > 0 ? (
                      leads.slice(0, 25).map((lead, i) => (
                        <div key={i} className="grid grid-cols-3 py-3 px-2 border-t border-slate-50 text-xs text-slate-600">
                          <span className="font-semibold">{lead.companyName}</span>
                          <span>{lead.email}</span>
                          <span>{lead.city}</span>
                        </div>
                      ))
                    ) : (
                      <div className="py-12 text-center text-sm text-slate-400 font-medium">
                        No leads loaded from database.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
