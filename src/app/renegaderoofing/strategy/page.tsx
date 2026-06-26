"use client"
import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronLeft, Compass, Users, Target, MessageSquare, 
  ShieldCheck, Search, ChevronDown, ChevronUp, Copy, Check
} from "lucide-react"

type MainTab = "intelligence" | "realtor" | "pm" | "adjuster" | "industrial"

interface EmailVariant {
  label: string
  tag: string
  subject: string
  body: string
}

interface IcpProfile {
  id: string
  title: string
  pain: string
  angle: string
  valueProp: string
  evidence: string
  numbers: string
  credentials: string
  icon: any
  tag: string
  variantA: EmailVariant
  variantB: EmailVariant
  followUp: EmailVariant
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors"
    >
      {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

export default function StrategyPage() {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>("intelligence")
  const [searchQuery, setSearchQuery] = useState("")
  const [collapsedIds, setCollapsedIds] = useState<string[]>([])

  const icpProfiles: IcpProfile[] = [
    {
      id: "realtors",
      title: "Real Estate Agents & Escrow Officers",
      pain: "Escrow kills at the finish line. A home inspector flags an aging shingle roof, the underwriter pulls coverage, and the buyer panics -- the deal dies and the commission disappears.",
      angle: "Position as a transaction-saving asset, not a contractor pitch. The Escrow-Saver: free 24-hour drone scan + certified second-bid that gives the agent ammunition to keep the deal alive.",
      valueProp: "William holds both a FL Certified Roofing Contractor license (CCC1328895) AND a Certified General Contractor license (CGC1514572). That dual credential means he can legally run wind-mitigation inspections in-house -- something most roofers cannot do, eliminating the 3rd-party inspector delay that kills closing timelines.",
      evidence: "Over 35% of Broward escrows stall or collapse due to roof objections (source: FL real estate transaction data, 2024). Agents who have a 24-hour certified inspector in their pocket close faster and lose fewer commissions to last-minute roof disputes.",
      numbers: "Broward County had 42,000+ residential property transactions in 2023. With ~35% facing roof-related friction, that is 14,000+ deals where a fast, credentialed roofer is the difference between a commission and a clawback.",
      credentials: "FL CRC (CCC1328895) + FL GC (CGC1514572) -- licensed, bonded & insured: $3M GL + Workers' Comp. In-house wind-mitigation inspections. Deerfield Beach, FL office -- active local permits, pullable on DBPR.",
      icon: Target,
      tag: "Transaction Insurance",
      variantA: {
        label: "Variant A -- The Escrow-Saver Hook",
        tag: "Lead with the transaction risk angle",
        subject: "Roof objection killed a deal recently?",
        body: `Hi {{first_name}},

Broward escrows collapse on roof objections more than anything else -- inspector flags old shingles, underwriter pulls coverage, buyer backs out.

As both a licensed roofer and GC in {{city}}, I run drone scans and certified second-bids within 24 hours when a contract is on the line.

Not a pitch -- transaction insurance for the moment you need it.

Would it be a bad idea to keep a direct line to a 24-hour backup inspector?

William Roberts
Owner | Renegade Roofing Co.
(954) 336-8538
FL Lic # CCC1328895 / CGC1514572`
      },
      variantB: {
        label: "Variant B -- The Wind-Mit Differentiator",
        tag: "Lead with the in-house wind-mit credential angle",
        subject: "In-house wind mitigation -- {{city}} agents",
        body: `Hi {{first_name}},

Most roofers in {{city}} can't legally sign off on wind-mitigation reports -- they have to outsource it, adding days to your closing timeline.

We hold both a roofing and a GC license, so we run wind-mits in-house. Same-day turnaround.

When an underwriter pushes back on a roof, we're the call that gets the deal back on track.

Are you against having that number in your back pocket?

William Roberts
Owner | Renegade Roofing Co.
(954) 336-8538
FL Lic # CCC1328895 / CGC1514572`
      },
      followUp: {
        label: "Follow-Up -- 4-5 Days Later",
        tag: "Reference the friction, prove local trust",
        subject: "Roofer + GC license -- Broward deals",
        body: `Hi {{first_name}},

Quick follow-up -- one credential worth knowing: we hold a GC license alongside our roofing license. That means wind-mits are done in-house, same day. No third-party delay when a deal is on the line.

We've worked in Broward for years -- active local permits on DBPR, $3M GL, COI on request.

If a roof objection has cost you a deal before, we're the number to have on file.

Would it be a bad idea to keep us in your vendor contacts?

William Roberts
Owner | Renegade Roofing Co.
(954) 336-8538
FL Lic # CCC1328895 / CGC1514572`
      }
    },
    {
      id: "property_managers",
      title: "Commercial Property Managers & HOAs",
      pain: "Their primary roofer ghosts them after a named storm when every other PM in Broward is calling the same contractor. Water gets into units, tenants scream, ownership asks questions, and the PM owns the liability.",
      angle: "Not a replacement vendor pitch -- a storm-response second-bid partner. The offer is a free drone thermal moisture scan + 5-year CapEx forecast they can hand directly to ownership. Diagnostic, not a sales call.",
      valueProp: "Free drone thermal-imaging roof scan + no-obligation 5-year CapEx budget report: moisture map + repair-vs-restore-vs-replace cost forecast the PM can hand straight to ownership as a planning asset.",
      evidence: "Named storms trigger severe post-event backup. Primary roofers take 7+ days to respond during peak demand. A 2-hour emergency storm response guarantee prevents catastrophic water infiltration and the mold litigation that follows.",
      numbers: "Commercial roof leaks cost US businesses $1B+ annually in property damage and business interruption. In South Florida, Q3 storm season creates 4-8x the normal service demand -- and that's when primary vendor relationships fail.",
      credentials: "FL CRC (CCC1328895) + FL GC (CGC1514572). $3M GL + Workers' Comp. Deerfield Beach, FL -- here year-round, not a storm chaser. Active local permits on DBPR. Multi-building occupied HOA re-roofs in Broward, completed with zero disruption.",
      icon: Users,
      tag: "Asset Protection",
      variantA: {
        label: "Variant A -- The Storm-Response Gap",
        tag: "Lead with the post-storm vendor failure scenario",
        subject: "Backup roofer when yours is backed up",
        body: `Hi {{first_name}},

After a named storm hits Broward, every PM calls the same contractor. Primary vendors go dark for 7+ days while water sits in units.

We act as a storm-response backup for local PMs -- 2-hour emergency response, guaranteed. We don't replace your roofer.

We'll also run a free drone thermal scan and deliver a no-obligation 5-year CapEx forecast you can hand to ownership.

Would it be a bad idea to have a verified backup on file?

William Roberts
Owner | Renegade Roofing Co.
(954) 336-8538
FL Lic # CCC1328895 / CGC1514572`
      },
      variantB: {
        label: "Variant B -- The CapEx Planning Angle",
        tag: "Lead with the ownership-ready diagnostic report",
        subject: "Free 5-year roof CapEx report -- Broward PMs",
        body: `Hi {{first_name}},

When ownership asks about deferred roof maintenance in Q3/Q4, the PMs who hand them a thermal moisture map with a cost forecast look prepared. Everyone else is guessing.

We run free drone thermal scans for Broward PMs -- no-obligation 5-year budget report delivered within 48 hours. A full occupied HOA re-roof in Broward, completed with zero tenant disruption.

Are you against a free scan before Q4?

William Roberts
Owner | Renegade Roofing Co.
(954) 336-8538
FL Lic # CCC1328895 / CGC1514572`
      },
      followUp: {
        label: "Follow-Up -- 4-5 Days Later",
        tag: "Soft proof + re-anchor the low-risk offer",
        subject: "Thermal scan -- 2 hours, no obligation",
        body: `Hi {{first_name}},

The thermal scan offer is still open.

For context: We are a licensed roofing contractor and general contractor out of Deerfield Beach. $3M GL, Workers' Comp, COI on request. Active local permits -- not an out-of-state storm chaser.

The scan takes under 2 hours. You get a moisture map + cost-tiered forecast to file or send to ownership as-is. No contractor relationship required.

Would it be a bad idea to get the data before storm season?

William Roberts
Owner | Renegade Roofing Co.
(954) 336-8538
FL Lic # CCC1328895 / CGC1514572`
      }
    },
    {
      id: "adjusters",
      title: "Insurance Adjusters & Claims Estimators",
      pain: "Contractor field reports that are missing line items, lack Xactimate-aligned documentation, and force the adjuster to do the scope work themselves -- adding days to claim resolution and weakening their supplement position.",
      angle: "Position William as a technical documentation partner, not a contractor pitching jobs. The value is in the speed and precision of the file -- Xactimate-ready scopes, complete photo sheets, and LOP acceptance that eliminates carrier friction.",
      valueProp: "Dual CRC (CCC1328895) and GC (CGC1514572) licenses mean field reports carry double legal weight in carrier disputes. Xactimate-precise scope + complete photo documentation within 48 hours of inspection. Full LOP acceptance.",
      evidence: "Detailed, Xactimate-aligned estimates reduce claim disputes by 40% and accelerate settlement timelines. PAs who work with documentation-proficient contractors spend less time on supplements and more time closing files.",
      numbers: "Florida had 1.2M+ insurance claims filed in 2022-2023 post-Ian and post-Idalia. Broward County properties face ongoing exposure to TS/hurricane-force wind and hail. Contractors who speak the Xactimate language are a scarce resource.",
      credentials: "FL CRC (CCC1328895) + FL GC (CGC1514572). LOP accepted. 10-year workmanship warranty + up to 20-Year NDL manufacturer warranties on TPO/coating systems. $3M GL + Workers' Comp. COI on request.",
      icon: ShieldCheck,
      tag: "Claims Partnership",
      variantA: {
        label: "Variant A -- The Documentation Speed Angle",
        tag: "Lead with the 48-hour deliverable",
        subject: "Xactimate scope + photo sheet in 48 hours",
        body: `Hi {{first_name}},

Getting a clean Xactimate estimate and full photo documentation from a Broward roofer usually takes a week and three follow-up calls.

We deliver adjuster-ready scope + timestamped photo sheets within 48 hours of inspection. We accept LOPs and hold both a roofing and GC license -- so our field reports carry double the legal weight in carrier disputes.

Are you against a priority channel for your next Broward storm file?

William Roberts
Owner | Renegade Roofing Co.
(954) 336-8538
FL Lic # CCC1328895 / CGC1514572`
      },
      variantB: {
        label: "Variant B -- The Dual-License Technical Authority",
        tag: "Lead with the legal weight / supplement strength angle",
        subject: "GC-signed roofing scopes -- Broward claims",
        body: `Hi {{first_name}},

Most Broward roofers can't certify wind-mitigation or sign structural scope documentation -- they don't hold a GC license.

We carry both licenses. Our scopes are GC-certified -- harder to dispute, cleaner for supplements, less time spent chasing corrections.

LOPs accepted. Xactimate-aligned photo files within 48 hours.

Would it be a bad idea to try us on your next open Broward file?

William Roberts
Owner | Renegade Roofing Co.
(954) 336-8538
FL Lic # CCC1328895 / CGC1514572`
      },
      followUp: {
        label: "Follow-Up -- 4-5 Days Later",
        tag: "If-incurred expertise hook + one-file offer",
        subject: "If-incurred items -- Broward roofing files",
        body: `Hi {{first_name}},

One thing that separates our documentation: we capture if-incurred line items -- code upgrades, complex flashings, permit costs -- that most roofers miss on the front end and force supplementals on later.

We'd like to handle one file for you to show the process. Full photo sheet, Xactimate-aligned scope, LOP accepted, 48 hours from site inspection.

Are you against putting us on one open Broward file to see the difference?

William Roberts
Owner | Renegade Roofing Co.
(954) 336-8538
FL Lic # CCC1328895 / CGC1514572`
      }
    },
    {
      id: "industrial_owners",
      title: "Industrial & Warehouse Owners",
      pain: "A full TPO tear-off and re-roof on a commercial flat roof is a six-figure capital expenditure that disrupts warehouse operations, doesn't qualify for an immediate tax deduction, and takes weeks. Owners delay until a failure forces their hand.",
      angle: "Silicone restoration as a CapEx optimization play, not a maintenance pitch. 50-60% cheaper than tear-off, qualifies as maintenance under Section 179 (100% deductible year one), and installs with zero operational disruption.",
      valueProp: "Free thermal moisture scan to verify if the roof qualifies for restoration (vs. replacement). If it qualifies: 20-Year NDL manufacturer warranty, $0 tear-off disruption, and a Section 179-eligible write-off the owner's CPA can use immediately.",
      evidence: "Silicone roof coatings create a seamless waterproof membrane that resists ponding water and UV degradation -- the two primary failure modes for Broward flat roofs. Where the deck is structurally sound, restoration is universally the financially superior option.",
      numbers: "Silicone restoration costs 50-60% less than full TPO tear-off. Under Section 179 (2024), business owners can deduct 100% of qualifying roof restoration costs in year one instead of depreciating over 39 years -- a meaningful cash-flow difference on a $50-150K project.",
      credentials: "Commercial specialists: TPO (60-mil & 80-mil), EPDM, modified bitumen, silicone restoration, standing-seam & metal retrofit. FL CRC (CCC1328895) + FL GC (CGC1514572). 20-Year NDL manufacturer warranties. $3M GL + Workers' Comp. Deerfield Beach, FL -- active local permits.",
      icon: Compass,
      tag: "CapEx Optimization",
      variantA: {
        label: "Variant A -- The Section 179 Tax Angle",
        tag: "Lead with the fiscal-year deduction hook",
        subject: "Flat roof write-off before Q4 closes",
        body: `Hi {{first_name}},

If your building has a flat roof that's aging but structurally intact, there's a tax window worth knowing before Q4.

Silicone restoration qualifies as maintenance under Section 179 -- 100% deductible in year one instead of 39-year depreciation. It runs 50-60% less than full TPO tear-off and carries a 20-Year NDL manufacturer warranty.

We run free thermal scans to confirm eligibility before anything else.

Would it be a bad idea to get the scan data before year-end?

William Roberts
Owner | Renegade Roofing Co.
(954) 336-8538
FL Lic # CCC1328895 / CGC1514572`
      },
      variantB: {
        label: "Variant B -- The Operational Continuity Angle",
        tag: "Lead with zero-disruption vs. tear-off pain",
        subject: "No tear-off, no disruption -- Broward flat roofs",
        body: `Hi {{first_name}},

Full TPO tear-off means weeks of disruption to warehouse operations and a six-figure CapEx hit that depreciates over 39 years.

Silicone restoration installs over the existing system -- zero tear-off, zero operational downtime. 20-Year NDL manufacturer warranty. Qualifies for 100% Section 179 deduction this fiscal year.

We run free thermal scans to confirm if your roof qualifies. If it doesn't, we tell you that upfront.

Are you against a free scan?

William Roberts
Owner | Renegade Roofing Co.
(954) 336-8538
FL Lic # CCC1328895 / CGC1514572`
      },
      followUp: {
        label: "Follow-Up -- 4-5 Days Later",
        tag: "Anchor the financial math + re-offer the free scan",
        subject: "The math on restoration vs. replacement",
        body: `Hi {{first_name}},

One number worth running by your CPA: an $80K restoration deducted 100% in year one vs. a $150K replacement depreciated over 39 years. The cash-flow difference is significant.

We've completed commercial systems across Broward -- TPO, EPDM, silicone, metal retrofit -- active local permits, 20-Year NDL manufacturer warranty.

Free thermal scan, under 2 hours. We confirm eligibility before you commit to anything.

Would it be a bad idea to have the data before your next ownership conversation?

William Roberts
Owner | Renegade Roofing Co.
(954) 336-8538
FL Lic # CCC1328895 / CGC1514572`
      }
    }
  ]

  const toggleCollapse = (id: string) => {
    setCollapsedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const filteredProfiles = icpProfiles.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.pain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tag.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const tabs: { id: MainTab; label: string }[] = [
    { id: "intelligence", label: "Market Intelligence" },
    { id: "realtor", label: "Realtor Sequence" },
    { id: "pm", label: "PM Sequence" },
    { id: "adjuster", label: "Adjuster Sequence" },
    { id: "industrial", label: "Industrial Sequence" },
  ]

  const emailTabMap: Record<string, IcpProfile> = {
    realtor: icpProfiles[0],
    pm: icpProfiles[1],
    adjuster: icpProfiles[2],
    industrial: icpProfiles[3],
  }

  return (
    <div className="min-h-screen w-full px-4 md:px-8 pt-8 pb-20 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-10 max-w-[1200px] mx-auto relative z-10">
        <div className="flex items-center gap-3">
          <Link href="/renegaderoofing" className="w-10 h-10 rounded-full bg-white/80 border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white transition-all shadow-sm">
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Strategy & ICP</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mt-0.5">4 ICPs -- 2 variants + 1 follow-up each</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Navigation Tabs - scrollable on mobile */}
        <div className="overflow-x-auto pb-2 mb-10">
          <div className="flex bg-slate-100/80 backdrop-blur-md p-1 rounded-2xl w-fit min-w-full md:min-w-0 border border-slate-200/40 gap-0.5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveMainTab(tab.id)}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                  activeMainTab === tab.id ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeMainTab === "intelligence" && (
            <motion.div
              key="intelligence"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8"
            >
              {/* Search bar */}
              <div className="relative max-w-[480px] mx-auto w-full">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by segment, pain point, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 text-xs font-semibold bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 transition-colors shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProfiles.map((profile) => {
                  const Icon = profile.icon
                  const isCollapsed = collapsedIds.includes(profile.id)
                  return (
                    <div
                      key={profile.id}
                      className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-[2rem] p-7 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-hidden"
                    >
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">{profile.title}</h3>
                            <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 border border-emerald-200/60 mt-1 inline-block">
                              {profile.tag}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleCollapse(profile.id)}
                          className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {!isCollapsed && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-5 overflow-hidden border-t border-slate-100 pt-5"
                          >
                            <div>
                              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Primary Pain Point</span>
                              <p className="text-xs font-semibold leading-relaxed text-slate-700">{profile.pain}</p>
                            </div>
                            <div>
                              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Outreach Angle</span>
                              <p className="text-xs font-semibold leading-relaxed text-slate-700">{profile.angle}</p>
                            </div>
                            <div>
                              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Core Offer</span>
                              <p className="text-xs font-semibold leading-relaxed text-slate-700">{profile.valueProp}</p>
                            </div>
                            <div>
                              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Market Grounding</span>
                              <p className="text-xs font-medium leading-relaxed text-slate-500">{profile.evidence}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                              <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/40">
                                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Market Data</span>
                                <p className="text-xs font-extrabold text-slate-800 leading-snug">{profile.numbers}</p>
                              </div>
                              <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/40">
                                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">William's Credentials</span>
                                <p className="text-xs font-extrabold text-slate-800 leading-snug">{profile.credentials}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>


            </motion.div>
          )}

          {(activeMainTab === "realtor" || activeMainTab === "pm" || activeMainTab === "adjuster" || activeMainTab === "industrial") && (
            <motion.div
              key={activeMainTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6 max-w-[860px] mx-auto"
            >
              {(() => {
                const profile = emailTabMap[activeMainTab]
                const variants = [profile.variantA, profile.variantB, profile.followUp]
                return (
                  <>
                    {/* ICP Header */}
                    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-[2rem] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                          <profile.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="text-lg font-extrabold text-slate-900">{profile.title}</h2>
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 border border-emerald-200/60 mt-0.5 inline-block">{profile.tag}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-4">{profile.pain}</p>
                      <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/40">
                        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">Sequence Structure</p>
                        <p className="text-xs font-semibold text-slate-700">2 independent Variant A/B openers William can A/B test -- then 1 follow-up sequence (sent D+4 regardless of which variant was used). No breakup email.</p>
                      </div>
                    </div>

                    {/* Email Variants */}
                    {variants.map((email, idx) => (
                      <div key={idx} className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-[2rem] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                        <div className="flex items-center justify-between mb-5">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md block w-fit mb-1">
                              {email.label}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400">{email.tag}</span>
                          </div>
                          <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-100/60 px-2.5 py-1 rounded-md">
                            {idx < 2 ? "Approved" : "Follow-Up"}
                          </span>
                        </div>

                        <div className="mb-5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Subject Line</span>
                            <CopyButton text={email.subject} />
                          </div>
                          <p className="text-sm font-mono font-bold text-slate-900 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200/40">{email.subject}</p>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Email Body</span>
                            <CopyButton text={email.body} />
                          </div>
                          <pre className="text-xs font-mono text-slate-700 whitespace-pre-wrap leading-relaxed bg-slate-50 border border-slate-200/30 rounded-xl p-5 overflow-x-auto">
                            {email.body}
                          </pre>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-[9px] text-slate-400 font-bold">Word count: ~{email.body.split(/\s+/).filter(w => w.length > 0).length} words</span>
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                              email.body.split(/\s+/).filter(w => w.length > 0).length <= 90
                                ? "bg-emerald-100 text-emerald-700" 
                                : "bg-amber-100 text-amber-700"
                            }`}>
                              {email.body.split(/\s+/).filter(w => w.length > 0).length <= 90 ? "Within benchmark" : "Review length"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
