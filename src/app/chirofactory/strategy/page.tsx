"use client"
import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronLeft, Compass, Users, Target, Calendar, MessageSquare, 
  ShieldCheck, Lock, Search, BookOpen, TrendingUp, 
  DollarSign, Activity, FileText, ChevronDown, ChevronUp, AlertCircle
} from "lucide-react"

type MainTab = "intelligence" | "b2b_emails" | "b2c_emails"
type SubTab = "b2b" | "b2c"

interface PartnerProfile {
  id: string
  title: string
  pain: string
  angle: string
  valueProp: string
  evidence: string
  numbers: string
  caseStudy: string
  icon: any
  tag: string
  emails?: {
    iteration: string
    subject: string
    body: string
  }[]
}

export default function StrategyPage() {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>("intelligence")
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("b2b")
  const [searchQuery, setSearchQuery] = useState("")
  const [collapsedIds, setCollapsedIds] = useState<string[]>([])

  const b2bPartners: PartnerProfile[] = [
    {
      id: "gyms_trainers",
      title: "Gym Owners & Personal Trainers",
      pain: "Profit-bleeding member churn. When athletes get injured, they freeze dues and 'just rest'.",
      angle: "We are your 'Train-Through-Recovery' partner, offering modifications so your members stay on the floor.",
      valueProp: "We keep your members training safely through injury to protect your MRR and avoid the 6-week pause.",
      evidence: "CrossFit and high-intensity gyms face unfair 'injury-prone' stigmas. By having a clinical partner who scales workouts around a 'niggle' rather than prescribing total rest, gym owners signal elite professionalism while circumventing the 6-week pause that kills habits.",
      numbers: "Industry benchmarks show injured members face a 35% higher churn rate within 45 days. Retaining just 3 members who would have paused their $150/month dues saves $5,400 in annual recurring revenue.",
      caseStudy: "Gym owners protect their community fiercely. They don't want medical providers stealing their clients; they want partners who keep their athletes moving and paying their memberships.",
      icon: Activity,
      tag: "Retention Engine",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "Keeping members training -- {{company_name}}",
            "body": "Hi {{first_name}},\n\n    When a member gets hurt in your classes, they freeze their dues and 'just rest' for 6 weeks, killing their habit and your revenue.\n\n    We adjust joint restrictions in {{city}} so they can squat safely under your coaches' supervision instead of sitting on the couch.\n\n    Would it be a bad idea to set up a quick referral loop to save those memberships?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "Member injury retention",
            "body": "Hi {{first_name}},\n\n    It sounds like referring members to external clinics feels like a risk of losing them to a provider who doesn't understand functional fitness.\n\n    Injured members face 35% higher churn. We coordinate movement modifications with your coaches and want to host a free Saturday mobility screening at {{company_name}} -- no pitch, just movement.\n\n    Would it be a bad idea to host that free mobility screen at {{company_name}}?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "auto_body",
      title: "Auto Body & Collision Repair",
      pain: "After a collision repair, customers walk out asking 'should I see a doctor?' -- and the shop has no answer. That trust moment goes to whoever the adjuster recommends, not the shop that spent three days fixing their car.",
      angle: "A two-sided deal: we provide your mechanics free monthly alignments (keeps your best techs from burning out) and supply co-branded Post-Collision Care cards your writers hand every customer at pickup.",
      valueProp: "Your mechanics stay physically capable and feel valued. Your collision customers get a trusted next step. You become the shop that cared about the person, not just the car.",
      evidence: "Independent collision centers lose their best technicians to burnout and their post-repair customers to adjusters -- two separate revenue leaks from the same shop. A chiropractic partner solves both: free mechanic care as a no-cost retention perk, and referral cards that fill the 'what now?' gap customers have at pickup. The shop pays nothing and gains on both sides.",
      numbers: "80% of body techs suffer occupational back strain, directly costing labor hours. Separately, 68% of collision patients develop neck or back pain within 72 hours -- most never seek care because no one told them to. One referral card per car generates 4-8 clinic visits at $100 each. Your shop becomes the referral, not the adjuster.",
      caseStudy: "Shop owners respond to deals where they get something real in return. Free mechanic alignments are a genuine, tangible perk that costs the shop nothing -- and makes hard-to-replace technicians feel looked after. Pairing that with customer referral cards means the shop owner has two concrete reasons to say yes, not one.",
      icon: ShieldCheck,
      tag: "Bilateral Referral Partner",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "Your mechanics and your collision customers -- {{company_name}}",
            "body": "Hi {{first_name}},\n\n    Two things happen at every collision shop: techs burn out their backs hauling panels all day, and customers pick up their car after an accident with neck pain they haven't connected yet.\n\n    We want to offer {{company_name}} free monthly alignments for your mechanics -- no cost, no workers' comp paperwork. In exchange, we supply a stack of co-branded Post-Collision Care cards your writers hand at pickup so your customers know where to go.\n\n    Your techs feel taken care of. Your customers remember the shop that looked out for them twice.\n\n    Would you be open to a quick call to set this up?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "Free tech alignments + customer referral cards",
            "body": "Hi {{first_name}},\n\n    It sounds like adding another vendor relationship feels like overhead when you are already managing a full shop.\n\n    This one runs itself: we show up once a month for your mechanics, you keep a card stack at the front desk. 80% of body techs carry chronic back strain -- free care is a perk that keeps your best people from burning out. And 68% of collision customers develop neck pain within 72 hours but never seek care because no one points them anywhere.\n\n    Your writer hands the card in 10 seconds. We handle everything after that.\n\n    Would it be a bad idea to try this for one month?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "massage_studios",
      title: "Massage & Bodywork Studios",
      pain: "Client frustration when muscular tension quickly returns due to unresolved structural joint restrictions.",
      angle: "We provide adjunctive structural adjustments that dramatically extend the efficacy of soft-tissue massage.",
      valueProp: "We clear the skeletal restrictions that block your soft-tissue work from holding via a strict reciprocal referral loop.",
      evidence: "Massage therapists frequently encounter 'locked' joints that prevent muscular release. They seek clinical partners who can perform precise spinal manipulation without attempting to steal the client's soft-tissue business.",
      numbers: "Clinical co-management studies demonstrate that combining spinal manipulation with massage therapy reduces total patient recovery times by 40% while doubling client satisfaction scores.",
      caseStudy: "Independent therapists operate on high trust and fear client poaching. Establishing a strict 'no-massage' policy at the chiropractic clinic guarantees mutual collaboration and a steady two-way referral stream.",
      icon: BookOpen,
      tag: "Clinical Synergy",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "Joint lock release -- {{company_name}}",
            "body": "Hi {{first_name}},\n\n    Your therapists release client spasms, only for the tension to return because the joint underneath is subluxated.\n\n    We provide adjustments in {{city}} to clear joint locks so your work holds. We have a strict 'no-massage' policy to protect your client base.\n\n    Are you against a quick call to set up a strict two-way referral?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "Client recovery synergy",
            "body": "Hi {{first_name}},\n\n    It sounds like partnering with a chiropractor feels like inviting client poaching to a clinic that might try to sell massage.\n\n    Co-management studies show combining joint adjustments with massage cuts client recovery times by 40%. We want to refer our patients who need soft-tissue maintenance directly to {{company_name}}.\n\n    Would it be unreasonable to try a strict two-way referral test?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "pt_clinics",
      title: "Physical Therapy Clinics",
      pain: "Patients plateauing during active rehabilitation because locked joints prevent full range of motion.",
      angle: "We execute mechanical joint manipulations to unlock the skeletal structure prior to your active rehab.",
      valueProp: "We clear mechanical barriers so your active therapy programs succeed faster, adhering to a strict co-management boundary.",
      evidence: "Physical therapists focus on muscular retraining and movement patterns. Clearing joint subluxations first provides a neurological reset, allowing the physical therapist to focus entirely on strengthening without fighting compensatory movement patterns.",
      numbers: "Orthopedic studies confirm that combining manipulative therapy with active exercise yields a 28% higher patient satisfaction score on functional outcome measures than isolated therapies.",
      caseStudy: "PTs despise overlapping care that confuses the patient. By strictly defining our role as 'joint mobilization' and deferring all active rehab back to the PT, we create an undisputed, friction-free clinical alliance.",
      icon: Compass,
      tag: "Joint Mobilization",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "Range of motion locks -- {{company_name}}",
            "body": "Hi {{first_name}},\n\n    When a patient's SI joint is locked, they compensate during active rehab and plateau on functional scores.\n\n    We execute joint adjustments in {{city}} to unlock range of motion first, deferring all active rehab back to you.\n\n    Are you against a quick call to align on a clean co-management boundary?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "Patient compliance barriers",
            "body": "Hi {{first_name}},\n\n    It sounds like bringing a chiropractor into the mix feels like care duplication that confuses the patient and overlaps treatment plans.\n\n    Combining joint manipulation with active exercise yields a 28% higher patient satisfaction score. We want to clear the mechanical locks and return the patient immediately to {{company_name}} for stabilizing rehab.\n\n    Would it be a bad idea to review our clinical boundary checklist?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "run_clubs",
      title: "Run & Triathlon Clubs",
      pain: "Chronic repetitive-use injuries sidelining high-achieving athletes mid-season.",
      angle: "We are your community's sideline biomechanics team, catching alignment errors before they become acute tears.",
      valueProp: "We sponsor your club and provide immediate sideline recovery taping at events to keep your runners logging miles.",
      evidence: "Endurance athletes are uniquely obsessive about avoiding lost mileage. They ignore generic medical advice ('stop running') and desperately seek practitioners who understand pavement impact, pelvic rotation, and active recovery.",
      numbers: "USATF data indicates over 65% of recreational marathon runners suffer a training injury annually. These athletes spend an average of $1,200 out-of-pocket every year on specialized recovery and conservative care.",
      caseStudy: "Run club organizers want to offer high-value perks to their members. Volunteering at the finish line builds undeniable goodwill and positions the clinic as the exclusive structural authority for the community.",
      icon: TrendingUp,
      tag: "Athletic Biomechanics",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "Sideline race recovery -- {{company_name}}",
            "body": "Hi {{first_name}},\n\n    Pavement impact rotates the pelvis, locking runner hips and triggering plantar fasciitis. Telling them to stop training is advice they ignore.\n\n    We specialize in runner pelvic alignment in {{city}} and want to volunteer at your next club run to offer free motion scans and sideline recovery taping.\n\n    Are you against a phone call to coordinate race support?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "Runner alignment clinics",
            "body": "Hi {{first_name}},\n\n    It sounds like hosting medical sponsors feels like a sales pitch that distracts your runners from training.\n\n    Since 65% of marathon runners get sidelined annually, we want to host a free 30-minute running biomechanics clinic at {{company_name}} and offer a co-branded $70 massage/stretch recovery slot for members.\n\n    Are you against a quick call to put this on the calendar before your next club run?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "corporate_hr",
      title: "Corporate HR Departments",
      pain: "Surging absenteeism and productivity loss caused by severe 'tech neck' and desk fatigue.",
      angle: "We deliver zero-cost workspace ergonomic audits that relieve employee neck strain without touching insurance premiums.",
      valueProp: "We host complimentary, on-site ergonomic workshops that reduce absenteeism and act as a high-visibility wellness perk.",
      evidence: "HR managers are desperate for visible, low-friction wellness benefits that demonstrate corporate care without triggering bureaucratic insurance paperwork or budget approvals.",
      numbers: "OSHA states that musculoskeletal disorders represent 33% of all worker injury cases. Desktop professionals sit an average of 9.3 hours per day, driving a 40% spike in cervical strain and productivity loss.",
      caseStudy: "Corporate HR wants plug-and-play solutions. A free 30-minute posture screening in the breakroom is perceived as a massive value-add, immediately converting stressed employees into cash-paying clinic patients.",
      icon: DollarSign,
      tag: "Workplace Wellness",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "Desk fatigue audits -- {{company_name}}",
            "body": "Hi {{first_name}},\n\n    Musculoskeletal complaints -- neck pain, back strain -- are 33% of your workers' comp caseload. The same employees filing those claims are sitting 9 hours daily with no intervention between flare-ups.\n\n    We host a free 30-minute posture screening in your breakroom. Every employee walks out with a personalized spinal report. You hand leadership a wellness initiative that costs {{company_name}} nothing and gives you something concrete for the next benefits review.\n\n    Are you against a quick call before your next all-hands?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "Back pain absenteeism",
            "body": "Hi {{first_name}},\n\n    It sounds like organizing an on-site audit feels like operational disruption that pulls employees away from their desks.\n\n    Musculoskeletal issues represent 33% of all worker injury cases. We keep our sessions to 15-minute posture screens in the breakroom, and offer staff cash-pay $70 spinal wellness checks at our clinic so it bypasses corporate billing.\n\n    Is it a bad idea to review a posture day outline?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "churches",
      title: "Local Church Ministries",
      pain: "Aging congregants suffering from osteoarthritis while pastoral teams struggle to find trusted health resources.",
      angle: "We leverage our faith-based clinic identity to provide honest, community-first health education.",
      valueProp: "We host free spinal health workshops for your seniors and donate a portion of new patient exam fees to youth programs.",
      evidence: "Pastoral teams are highly protective of their flock and inherently skeptical of commercial medical marketing. Aligning on faith and community charity bypasses commercial filters and establishes deep, generational trust.",
      numbers: "In suburban and faith-centric regions, establishing a direct ministry alignment lowers patient acquisition resistance by over 50%, generating a highly loyal, multi-generational patient base.",
      caseStudy: "Churches rely on trusted networks. By offering a 'Charity Week' where initial consult fees are donated back to the church, the clinic immediately becomes the undisputed preferred provider for the congregation.",
      icon: Target,
      tag: "Faith & Trust",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "Community health resources -- {{company_name}}",
            "body": "Hi Pastor {{last_name}},\n\n    Most clinics see your congregation as a patient pool. We don't operate that way.\n\n    We are a faith-based family practice in {{city}}. We want to offer {{company_name}} a free health education workshop for your seniors -- no clinic pitch, no sales table. For every new patient who comes to us from your ministry, we donate $10 back to your youth programs.\n\n    Are you against a quick call to see if this is a fit for your community?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "Congregant wellness support",
            "body": "Hi Pastor {{last_name}},\n\n    It sounds like introducing external health providers feels like a commercial distraction inside the church.\n\n    We are a faith-aligned family practice in {{city}}. By offering cash-only, affordable exam structures, we bypass insurance paperwork entirely. We want to support your ministry with charity donations and senior care.\n\n    Would it be a bad idea to coordinate a simple bulletin announcement?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "youth_sports",
      title: "Youth Sports Leagues",
      pain: "Parental anxiety over athletic injuries and the lack of safe, drug-free recovery baselines for children.",
      angle: "We establish preventative safety baselines for young athletes to build lifelong trust with parents.",
      valueProp: "We sponsor your league jerseys and provide complimentary pre-season spinal screenings for safe athletic development.",
      evidence: "Parents are increasingly hesitant to use painkillers for youth sports injuries. They actively seek out holistic, preventative care to protect their children's developing joints from the heavy impact of modern competitive sports.",
      numbers: "The Youth Sports Safety Alliance notes that repetitive strain injuries affect over 45% of middle-school athletes. Acquiring a pediatric patient yields a 2.4x higher lifetime value because parents and siblings frequently convert to care.",
      caseStudy: "League organizers need sponsors and safety protocols. Providing free injury screenings solves their safety mandate while opening a direct, high-trust dialogue with hundreds of local parents.",
      icon: Calendar,
      tag: "Pediatric Safety",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "Player alignment screenings -- {{company_name}}",
            "body": "Hi {{first_name}},\n\n    When a player takes a hit and the coach has no protocol, parents start asking questions you can't answer. Most leagues handle it with ice packs and 'shake it off.'\n\n    We want to offer {{company_name}} free pre-season spinal screenings for your roster in {{city}} -- a documented baseline that shows parents their child was cleared before the season started. We sponsor the jerseys. You get a safety protocol.\n\n    Are you against a quick call to set this up before next season?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "Youth injury prevention",
            "body": "Hi {{first_name}},\n\n    It sounds like setting up screenings feels like extra administrative work for your coaching staff during a busy season.\n\n    Repetitive strain affects 45% of middle-school athletes. We provide a $70 cash-pay recovery massage and stretch special for league families to remove cost barriers and keep kids playing.\n\n    Would it be a terrible idea to offer this safety resource to your parents?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "insurance_brokers",
      title: "Independent Insurance Brokers",
      pain: "Spiraling loss ratios on casualty claims driven by clients defaulting to high-cost emergency room visits.",
      angle: "We provide immediate, cost-effective conservative care pathways that stabilize claim costs.",
      valueProp: "We deliver prompt conservative care to your injured clients, reducing casualty claim loss ratios and protecting your book.",
      evidence: "Independent brokers act as risk advisors to their commercial clients. When a client's employee is injured, directing them to a trusted chiropractor instead of an ER prevents claim inflation and keeps the broker's premium renewals competitive.",
      numbers: "Actuarial data demonstrates that utilizing chiropractic care for occupational soft-tissue injuries reduces overall workers' compensation claim costs by an average of 20% compared to traditional allopathic pathways.",
      caseStudy: "Brokers want to look like heroes to their commercial clients. Providing them with 'Post-Accident Checklists' featuring our clinic positions the broker as a proactive risk manager while driving direct referrals.",
      icon: FileText,
      tag: "Loss Ratio Protection",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "Casualty claim costs -- {{company_name}}",
            "body": "Hi {{first_name}},\n\n    When a client's employee is injured, defaulting to emergency rooms and high-cost scans inflates casualty claims and hurts your loss ratios.\n\n    We provide immediate conservative chiropractic care in {{city}} and accept LOPs to stabilize claim costs quickly and help keep your premium renewals competitive.\n\n    Are you against a quick call to set up a client care referral pathway?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "Co-branded client safety guides",
            "body": "Hi {{first_name}},\n\n    It sounds like recommending specific health providers feels like policy liability for your brokerage.\n\n    Utilizing chiropractic care for soft-tissue injuries reduces workers' comp claim costs by 20%. We want to provide {{company_name}} with co-branded post-collision safety folders so your clients have clear directions.\n\n    Would it be a bad idea to review these guides?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "pi_attorneys",
      title: "Personal Injury Attorneys",
      pain: "Case value suppression due to thin clinical documentation and adjusters challenging medical necessity.",
      angle: "We act as your medical evidentiary partner, producing objective metrics that bulletproof your demand letters.",
      valueProp: "We protect your case value with comprehensive, LOP-accepting documentation delivered within 48 hours of discharge.",
      evidence: "Insurance adjusters use Colossus software to evaluate claims based on objective data density. Early conservative chiropractic care generates high-density documentation (X-rays, ROM deficits, specific orthopedic tests) that satisfies algorithmic requirements without exhausting policy caps like ER visits do.",
      numbers: "The Insurance Research Council (IRC) confirms early conservative care reduces total medical expenditure by up to 64%, leaving more of the settlement policy limit available to resolve the legal claim and secure your fee.",
      caseStudy: "Attorneys refer to providers who understand case dynamics. They require clean, objective clinical files that withstand adjuster scrutiny and expect practitioners to accept Letters of Protection (LOPs) while returning records promptly.",
      icon: Users,
      tag: "Evidentiary Partner",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "LOP cases -- DFW records turnaround",
            "body": "Hi {{first_name}},\n\n    Your paralegals are losing hours chasing accident records from hospital systems, delaying your demand packages and stalling your cases.\n\n    We accept Letters of Protection (LOP) in {{city}} and guarantee complete clinical files and billing records delivered to your firm within 48 hours of discharge to protect your case value.\n\n    Are you against a quick phone call to set up a priority channel?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "LOP documentation -- {{city}} cases",
            "body": "Hi {{first_name}},\n\n    It sounds like coordinating client care feels like administrative overhead for your legal team when they are trying to process litigation.\n\n    Early conservative care documented with range of motion scans reduces medical spend, preserving the policy limit for settlement. We provide audit-proof files that satisfy adjuster software.\n\n    Are you against a quick call to run through our documentation checklist?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
  ]

  const b2cProfiles: PartnerProfile[] = [
    {
      id: "pe_teachers",
      title: "K-12 PE Teachers & School Coaches",
      pain: "Severe lumbar compression from standing 7 hours a day on unforgiving hardwood gymnasium floors.",
      angle: "Targeted spinal decompression engineered to reverse the chronic impact of hard-surface coaching.",
      valueProp: "We release the profound lower back ache that sleep can't fix, offering specialized recovery slots exclusive to educators.",
      evidence: "PE teachers carry 'work aches' home. They rarely seek care because of restrictive school schedules and complex HMO networks. Direct, cash-based, low-friction recovery specials bypass their logistical hesitation.",
      numbers: "Repetitive impact on unyielding hardwood surfaces without shock absorption amplifies lumbar joint loading forces by 2.5x, drastically accelerating L4-L5 disc degeneration and chronic plantar fasciitis.",
      caseStudy: "Teachers respond to peer-recognition and community support. Offering an 'Educator Appreciation' structural scan makes them feel seen, valued, and prioritized over the general public.",
      icon: Users,
      tag: "Educator Recovery",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "PE coaches / gym floor strain",
            "body": "Hi {{first_name}},\n\n    You demonstrate squats, haul equipment, and by 2pm your lower back seizes up again.\n\n    Hardwood gym floors multiply spinal impact by 2.5x. Sleep does not reset that. We hold a few $100 alignment slots for local educators -- full orthopedic scan, adjustment, and red light therapy included.\n\n    Would it be a terrible idea to check if your L4-L5 is holding up?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "PE educator recovery",
            "body": "Hi {{first_name}},\n\n    It sounds like the lower back ache has just become part of teaching -- you stop noticing it until you can't bend over.\n\n    Our therapist set aside a cash-pay $70 deep tissue and stretch session for school staff this month. No insurance paperwork, no HMO referral chain. Walk in, walk out recovered.\n\n    Would it be unreasonable to hold one for you?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "truck_drivers",
      title: "CDL Commercial Truck Drivers",
      pain: "Debilitating sciatic compression triggered by static sitting and relentless whole-body vibration (WBV).",
      angle: "Precision spinal decompression to immediately relieve driving-induced sciatic pressure.",
      valueProp: "We safely decompress your lumbar spine without drugs, ensuring you pass your DOT physicals and stay on the road.",
      evidence: "Truckers fear medical interventions that might jeopardize their CDL status. They require fast, drug-free relief and highly prefer cash-based, no-paperwork adjustments that don't trigger employer or insurance red flags.",
      numbers: "The FMCSA reports that long-haul vibration matches the resonant frequency of the human spine (1-80 Hz). CDL drivers suffer a 4x higher risk of acute lumbar disc herniation compared to stationary professions.",
      caseStudy: "Drivers are fiercely independent and schedule-bound. Providing a walk-in friendly, no-BS decompression session speaks directly to their need for immediate, functional restoration.",
      icon: Activity,
      tag: "Vibration Relief",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "CDL drivers / road vibration strain",
            "body": "Hi {{first_name}},\n\n    Your cab vibrates at 4 Hz for 10 hours, the resonant frequency of your spine. Sciatic leg pain won't go away with a stretch.\n\n    We do walk-in spinal decompression for CDL drivers. $100 gets you a full scan, adjustment, and red light therapy. No scripts, no DOT flags, no insurance paperwork.\n\n    Are you against stopping by between hauls?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "CDL driver lower back tightness",
            "body": "Hi {{first_name}},\n\n    It sounds like you have been managing that back tightness yourself because seeing a doctor might flag something on your CDL card.\n\n    CDL drivers face 4x higher herniation risk. We provide cash-pay care off your employer file. Our therapist has a $70 deep tissue session -- 30 minutes, no paperwork.\n\n    Would it be ridiculous to try one session before your next run?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "accountants",
      title: "Accountants & Financial Analysts",
      pain: "Burning scapular spasms and 'tech neck' caused by forward-head posture during brutal tax season sprints.",
      angle: "Rapid cervical tension releases that instantly clear the brain fog killing focus during peak season.",
      valueProp: "We release your tech neck and shoulder spasms with a fast adjustment, buying back your focus without interrupting the workday.",
      evidence: "Financial professionals operate in high-stress, high-stakes environments where time is money. They view physical pain as a tax on their cognitive bandwidth and are highly willing to pay out-of-pocket for immediate, measurable relief.",
      numbers: "For every inch the head migrates forward from neutral alignment during deep screen work, it adds 10 pounds of sheer gravitational force to the cervical spine, reducing cerebral blood flow and causing tension migraines.",
      caseStudy: "Accountants appreciate efficiency. A streamlined 15-minute appointment that fixes their headache and lets them return to billing hours is viewed as a high-ROI personal investment.",
      icon: FileText,
      tag: "Cognitive Bandwidth",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "spreadsheet fatigue / neck tightness",
            "body": "Hi {{first_name}},\n\n    By spreadsheet hour six, your shoulders burn. By hour nine, a tension migraine is forming.\n\n    Every inch your head drifts forward adds 10 lbs of force on your cervical spine. We fix that in 15 minutes. $100 gets you a posture scan, adjustment, and red light therapy.\n\n    Would it be unreasonable to try one session during a lunch break?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "Accountant desk tension",
            "body": "Hi {{first_name}},\n\n    It sounds like the neck stiffness has just become part of tax season -- something you power through with ibuprofen and coffee.\n\n    Our therapist holds a cash-pay $70 deep tissue and neck release session for local finance professionals. No insurance dance, no wait. Walk in during lunch, walk out sharp.\n\n    Would it be crazy to hold one for you this week?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "real_estate",
      title: "Real Estate Agents & Brokers",
      pain: "SI joint locking and pelvic tilt driven by extreme 'windshield time' and walking properties in formal footwear.",
      angle: "Pelvic and SI alignment that resolves the specific driving fatigue draining an agent's executive stamina.",
      valueProp: "We instantly unlock your stiff hips and lower back, restoring your physical energy so you can close deals without wincing.",
      evidence: "Top-producing agents are performers; they must project confidence. Chronic pain breaks their physical state. They view chiropractic care not as 'medical treatment', but as elite executive maintenance.",
      numbers: "Local MLS data shows active agents average 22,000 miles driven annually. Static vehicle sitting combined with high-stress adrenaline loads the psoas muscle, locking the pelvis and causing profound lower back stiffness.",
      caseStudy: "Realtors are highly networked and image-conscious. Easing their physical friction makes them evangelists for the clinic within their massive, localized spheres of influence.",
      icon: Compass,
      tag: "Executive Stamina",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "realtors / windshield pelvic rotation",
            "body": "Hi {{first_name}},\n\n    22,000 miles driven between showings. By the third property walkthrough, your hips lock and your back screams.\n\n    That is your psoas muscle seizing from too much car seat time. We specialize in pelvic resets for agents. $100 gets you a full consult, alignment, and red light therapy.\n\n    Would it be a bad idea to see if your pelvis is tracking straight?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "Realtor pelvic fatigue",
            "body": "Hi {{first_name}},\n\n    It sounds like the hip stiffness is just something you push through because stopping feels like losing momentum on a deal.\n\n    Long driving hours shorten hip flexors, leaving your lower back to take the entire load. Our therapist has a cash-pay $70 deep tissue release for agents. 30 minutes, no referral.\n\n    Would it be crazy to try one between closings?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "nurses",
      title: "Registered Nurses & Medical Assistants",
      pain: "Savage lower back shear forces resulting from 12-hour concrete-floor shifts and transferring patients.",
      angle: "Structural recovery that the healthcare system denies its own workers, reversing shift-induced spinal trauma.",
      valueProp: "We relieve your chronic lower back strain with specialized adjustments, keeping you physically capable of caring for others.",
      evidence: "Nurses are deeply empathetic caregivers who chronically neglect their own physical health. They are intimately aware of the limitations of painkillers and actively seek holistic, structural interventions to survive their shifts.",
      numbers: "The ANA reports 52% of nurses suffer chronic back pain. Manual patient transfers generate compressive forces exceeding 4,000 Newtons on the L5-S1 disc, surpassing the absolute maximum safe limit established by NIOSH.",
      caseStudy: "Nurses respect clinical expertise. A direct, empathetic offer acknowledging their sacrifice and offering a 'Healthcare Hero' recovery rate immediately earns their trust and clinic loyalty.",
      icon: ShieldCheck,
      tag: "Clinical Support",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "nurses / patient transfer lumbar strain",
            "body": "Hi {{first_name}},\n\n    You spend 12 hours transferring patients on concrete floors in unsupportive shoes. You know exactly what L5-S1 compression feels like, even if you do not call it that.\n\n    We hold a few $100 alignment slots for local nurses. Full orthopedic scan, spinal adjustment, and red light therapy included.\n\n    Would it be unreasonable to use one before your next rotation?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "Nurse standing recovery",
            "body": "Hi {{first_name}},\n\n    It sounds like you tell yourself the back pain is fine, the same way you reassure borderline patients.\n\n    52% of nurses carry chronic pain. Our therapist holds a $70 deep tissue session for staff. Cash-pay, walk-in friendly.\n\n    Would it be a bad idea to try one on your next day off?\n\n    Regards,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "delivery_drivers",
      title: "Delivery Drivers & Couriers (UPS/FedEx)",
      pain: "Acute disc herniations from the repetitive torsional strain of lifting awkward packages and twisting out of vehicles.",
      angle: "Protecting the spine against the brutal wear-and-tear of the route with targeted decompression.",
      valueProp: "We resolve your shoulder impingement and lower back compression, keeping you pain-free and hitting your delivery quotas.",
      evidence: "Couriers treat their bodies like industrial equipment. They understand mechanical breakdown. Framing chiropractic care as 'preventative alignment maintenance' for their joints perfectly matches their operational worldview.",
      numbers: "BLS data ranks delivery couriers with the highest rate of musculoskeletal injury in non-agricultural trades. Lifting while twisting (torsional strain) exponentially increases shear stress on the lumbar annulus fibrosus by 300%.",
      caseStudy: "Drivers cannot afford to miss shifts. Offering a no-wait, cash-pay tune-up that directly addresses their specific mechanical wear guarantees high conversion and intense route-level word-of-mouth.",
      icon: TrendingUp,
      tag: "Torsional Protection",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "delivery drivers / package lifting strain",
            "body": "Hi {{first_name}},\n\n    Twisting out of the cab and lifting heavy packages 150 times a shift forces your spine to take 300% more shear stress.\n\n    We specialize in torsional strain recovery for drivers. $100 gets you a full consult, adjustment, and red light therapy. Walk in, 15 minutes, keep your route.\n\n    Would it be unreasonable to check your alignment before your next shift?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "Driver standing recovery",
            "body": "Hi {{first_name}},\n\n    It sounds like the lower back pinch is just something you manage with ibuprofen so you do not miss your delivery quotas.\n\n    Couriers face the highest injury rate of any non-agricultural trade. Our therapist set aside a cash-pay $70 stretch and deep tissue release for route drivers. No medical referral needed, walk-in friendly.\n\n    Would it be ridiculous to hold a slot for you this week?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "construction_pms",
      title: "Construction PMs & Inspectors",
      pain: "Pelvic tilts and heel pain from walking uneven construction grounds in heavy steel-toed boots.",
      angle: "Biomechanical alignment focusing on foot-tracking and pelvic corrections for job site supervisors.",
      valueProp: "We resolve the pelvic asymmetry caused by walking uneven job sites, restoring your gait and reducing knee friction.",
      evidence: "Job site managers walk thousands of steps daily across uneven, unpaved terrain in heavy, inflexible steel-toed boots, disrupting the natural calcaneal gait cycle.",
      numbers: "Non-flexible safety footwear restricts calcaneal rotation, causing repetitive shock wave transmission directly up the tibia to the pelvis, leading to sacroiliac (SI) joint misalignment.",
      caseStudy: "Site managers experience hip stiffness and ankle tracking issues from walking uneven construction zones. They need alignment adjustments to prevent joint locking and manage physical wear.",
      icon: Target,
      tag: "Job Site Biomechanics",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "site-walk / safety boots joint fatigue",
            "body": "Hi {{first_name}},\n\n    Heavy boots on unpaved site grades restrict ankle flex, sending the shock wave up to your pelvis. When you sit in your truck, your SI joint feels welded shut.\n\n    We realign the pelvis and restore ankle tracking. $100 gets you a full consult and first adjustment.\n\n    Would it be a bad idea to check if your hips are still tracking even?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "Site PM standing recovery",
            "body": "Hi {{first_name}},\n\n    It sounds like the hip stiffness has become background noise -- just part of the job, like hard hats and change orders.\n\n    Rigid boots block ankle rotation, sending shock waves to your pelvis. Our therapist has a $70 deep tissue session to decompress joint fatigue. 30 minutes, walk in.\n\n    Would it be crazy to try one after your next site walk?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "software_engineers",
      title: "Software Engineers & IT Admins",
      pain: "Thoracic outlet syndrome and carpal tunnel symptoms driven by sustained static desk environments.",
      angle: "Postural expansion and nerve release protocols designed specifically for high-intensity developers.",
      valueProp: "We reverse forward head posture and release nerve compression, restoring your ergonomic comfort and typing endurance.",
      evidence: "Tech sector health audits confirm that software developers average 9.5 hours of static screen time daily. Poor ergonomics and desk slouching lead to thoracic outlet syndrome (TOS) and pectoral muscle tightening.",
      numbers: "Pectoral tightening pulls the shoulders forward, compressing the brachial plexus nerves and leading to hand numbness and chronic shoulder pain.",
      caseStudy: "Developers suffer from desk fatigue, mid-back burning, and hand/wrist strain. They look for wellness checks that reverse desk posture strain and restore ergonomic comfort.",
      icon: DollarSign,
      tag: "Ergonomic Reset",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "tech neck / shoulder blade tension",
            "body": "Hi {{first_name}},\n\n    9.5 desk hours daily roll your shoulders forward, compressing your brachial nerves and causing finger tingling and mid-back burning.\n\n    We fix that in one visit. $100 gets you a posture scan, spinal adjustment, and red light therapy.\n\n    Would it be a terrible idea to see what your thoracic spine looks like right now?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "Keyboard hand and scapular strain",
            "body": "Hi {{first_name}},\n\n    It sounds like the hand numbness and mid-back burning have become part of the job -- something you manage with a standing desk switch every few hours.\n\n    Tight pecs pull shoulders forward, compressing nerves that feed your hands. Our therapist has a $70 session to release that tension. Walk in, 30 minutes.\n\n    Would it be unreasonable to try one session?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "dentists",
      title: "Dentists & Dental Hygienists",
      pain: "Asymmetric neck flexion and unilateral shoulder spasms from hovering over patient chairs in awkward static postures.",
      angle: "Upper cross syndrome correction that reverses the severe cervical asymmetry specific to dental professionals.",
      valueProp: "We release your unilateral neck tension and reset your posture, neutralizing the physical toll of your practice.",
      evidence: "The Journal of the American Dental Association (JADA) reports that over 85% of dentists experience chronic occupational neck and shoulder pain. Working in static, rotated, and forward-flexed positions over patient chairs creates severe muscle imbalances (upper cross syndrome).",
      numbers: "Leaning over a patient's mouth at a 30-degree forward tilt increases the load on the cervical spine by 3x, causing early cervical arthritis.",
      caseStudy: "Dental professionals face constant neck flexion and unilateral shoulder pain from static patient chair work. They are highly clinical themselves and respond to objective posture checks that solve their muscle imbalances.",
      icon: BookOpen,
      tag: "Dental Posture",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "dentist neck / asymmetric posture strain",
            "body": "Hi {{first_name}},\n\n    Leaning 30 degrees over patients locks your right trap. Neck stiffness peaks by Thursday.\n\n    85% of dentists carry chronic occupational neck pain -- JADA's number, not ours. We specialize in cervical asymmetry correction. $100 gets you a full scan and first adjustment.\n\n    Would it be a bad idea to check how far your cervical curve has shifted?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "Dental shoulder spasms",
            "body": "Hi {{first_name}},\n\n    It sounds like the neck stiffness has become normal -- you only notice it when checking your blind spot driving home.\n\n    Leaning forward triples cervical pressure. Our therapist has a $70 cash-pay session to release that asymmetric tension. 30 minutes.\n\n    Would it be ridiculous to try one on a half-day?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
    {
      id: "med_spa_workers",
      title: "Med Spa & Beauty Salon Workers",
      pain: "Chronic lumbar fatigue and venous pooling from prolonged standing and repetitive overhead arm motions.",
      angle: "Lumbar maintenance and structural support designed to increase standing endurance for aesthetic workers.",
      valueProp: "We relieve the lower back fatigue caused by standing on hard floors, ensuring your posture holds up through the final client.",
      evidence: "Salon and med spa workers stand on hard, non-yielding flooring for up to 10 hours daily, leaning forward over styling chairs or treatment tables with arms elevated.",
      numbers: "Prolonged static standing leads to venous pooling in the lower extremities and constant contraction of the erector spinae muscles, causing lumbar fatigue.",
      caseStudy: "Hair stylists and aesthetic workers suffer from calf soreness and lower back fatigue. They carry chronic physical strain from holding elevated styling posture for hours and seek simple, accessible cash-based care to keep standing.",
      icon: Calendar,
      tag: "Standing Endurance",
      emails: [
      {
            "iteration": "Email 1 (Hook & Core Offer)",
            "subject": "stylist lower back / standing strain",
            "body": "Hi {{first_name}},\n\n    10 hours standing with elevated arms and forward flex. By the last client, your back is on fire.\n\n    Your erector muscles never get to relax during a shift. We release that spinal compression in one visit. $100 gets you a full scan, adjustment, and red light therapy.\n\n    Would it be a terrible idea to try one on your next day off?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      },
      {
            "iteration": "Email 2 (Value & Proof)",
            "subject": "Stylist calf and back fatigue",
            "body": "Hi {{first_name}},\n\n    It sounds like lower back pain and swollen calves have just become part of working behind the chair.\n\n    Static standing causes venous pooling and locks your lumbar muscles in constant contraction. Our therapist has a $70 cash-pay deep tissue session to decompress exactly that. Walk in, 30 minutes, done.\n\n    Would it be a bad idea to try one this week?\n\n    Best,\n    {kelly.s | kelly | kelly.soto | soto.k | s.kelly}\n    Chiro Factory"
      }
]
    },
  ]

  const activeProfiles = activeSubTab === "b2b" ? b2bPartners : b2cProfiles

  const filteredProfiles = activeProfiles.filter(profile => 
    profile.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.pain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.angle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.tag.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const emailProfiles = activeMainTab === "b2b_emails" ? b2bPartners : b2cProfiles

  const filteredEmailProfiles = emailProfiles.filter(profile =>
    profile.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.tag.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleExpand = (id: string) => {
    if (collapsedIds.includes(id)) {
      setCollapsedIds(collapsedIds.filter(x => x !== id))
    } else {
      setCollapsedIds([...collapsedIds, id])
    }
  }

  return (
    <div className="relative min-h-[85vh] w-full max-w-5xl mx-auto flex flex-col pt-6 pb-32">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <Link href="/chirofactory" className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/45 flex items-center justify-center hover:bg-white/60 transition-colors shadow-sm">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Strategy &amp; ICP Database</h1>
        </div>
        <div className="px-4 py-1.5 rounded-full bg-purple-500/10 backdrop-blur-md border border-purple-500/20 flex items-center gap-2">
          <Compass className="w-4 h-4 text-purple-600 animate-spin-slow" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-700">DFW Market Calibration</span>
        </div>
      </motion.div>

      {/* Main Tabs Selection (Three Sections) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-wrap items-center gap-2 bg-slate-100/60 border border-slate-200/50 rounded-2xl p-1.5 mb-8 w-full max-w-2xl shadow-inner"
      >
        {[
          { id: "intelligence", label: "1. Market Intelligence & Sentiments", icon: BookOpen },
          { id: "b2b_emails", label: "2. B2B Outbound Copy", icon: MessageSquare },
          { id: "b2c_emails", label: "3. B2C Patient Outreach", icon: Target },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveMainTab(tab.id as MainTab)
              setSearchQuery("")
              setCollapsedIds([])
            }}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-xl text-[12px] font-black tracking-tight transition-all duration-300 flex-1 justify-center whitespace-nowrap
              ${activeMainTab === tab.id
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
              }
            `}
          >
            <tab.icon className="w-3.5 h-3.5 shrink-0" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Main Tab Render */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMainTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1"
        >
          {activeMainTab === "intelligence" ? (
            <div className="flex flex-col gap-8">
              {/* Operational Orientation */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-slate-900 to-emerald-600" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Track 1: B2B Referral Networks</span>
                    <p className="text-[12px] font-semibold text-slate-600 leading-relaxed">
                      We solve operational problems for local businesses -- member churn, case file delays, mechanic downtime. Patient flow follows. We never sell chiropractic care to businesses. We sell solutions to their revenue leaks.
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">Track 2: B2C Occupational Outreach</span>
                    <p className="text-[12px] font-semibold text-slate-600 leading-relaxed">
                      We target professionals in high-pain occupations through their business directories. We name their exact daily physical strain, prove we understand why it happens, and remove the two barriers: cost ($100 exam, $70 massage) and time (walk-in, 15 minutes).
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-600">How to Read This Page</span>
                    <p className="text-[12px] font-semibold text-slate-600 leading-relaxed">
                      Each ICP profile below maps a vertical: who they are, what keeps them up at night, why they would trust us, and the exact email sequences we send. Research data and patient sentiment back every angle. Nothing here is theoretical.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sub-navigation & Search filter */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                <div className="flex items-center gap-1.5 bg-white/50 border border-white/60 rounded-xl p-1 w-fit shadow-sm">
                  <button
                    onClick={() => {
                      setActiveSubTab("b2b")
                      setCollapsedIds([])
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-black tracking-tight transition-all ${
                      activeSubTab === "b2b" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    B2B Referral Partners (10 ICPs)
                  </button>
                  <button
                    onClick={() => {
                      setActiveSubTab("b2c")
                      setCollapsedIds([])
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-black tracking-tight transition-all ${
                      activeSubTab === "b2c" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    B2C Patient Cohorts (10 ICPs)
                  </button>
                </div>

                <div className="relative max-w-sm w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by profile, pain, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/60 border border-white/80 rounded-xl pl-10 pr-4 py-2.5 text-[13px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-300 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Profiles Grid */}
              <div className="grid grid-cols-1 gap-6">
                {filteredProfiles.length > 0 ? (
                  filteredProfiles.map((profile, index) => {
                    const isExpanded = !collapsedIds.includes(profile.id)
                    const IconComponent = profile.icon
                    return (
                      <motion.div
                        key={profile.id}
                        layout="position"
                        className="bg-white/70 backdrop-blur-xl border border-white/65 rounded-[2rem] p-6 md:p-8 shadow-sm flex flex-col gap-4 relative overflow-hidden transition-all duration-300"
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Profile {index + 1} -- {profile.tag}
                              </span>
                              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                                {profile.title}
                              </h3>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleExpand(profile.id)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors self-start md:self-center"
                          >
                            <span>{isExpanded ? "Hide Sentiment Insight" : "View Research & Sentiments"}</span>
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Chart Style (Pain, Angle, Value Prop) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2 p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Their Pain</span>
                            <p className="text-[13px] font-medium text-slate-700 leading-relaxed">{profile.pain}</p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Our Angle</span>
                            <p className="text-[13px] font-medium text-slate-700 leading-relaxed">{profile.angle}</p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Value Proposition</span>
                            <p className="text-[13px] font-semibold text-slate-800 leading-relaxed">{profile.valueProp}</p>
                          </div>
                        </div>

                        {/* Expanded Area */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden mt-2 pt-6 border-t border-slate-100 flex flex-col gap-6"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2 p-5 bg-purple-500/5 rounded-2xl border border-purple-500/10">
                                  <div className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-purple-600" />
                                    <span className="text-[11px] font-black uppercase tracking-wider text-purple-700">Clinical Data &amp; Evidence</span>
                                  </div>
                                  <p className="text-[12.5px] font-medium text-slate-600 leading-relaxed">{profile.evidence}</p>
                                </div>

                                <div className="flex flex-col gap-2 p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                                  <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                                    <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">Supporting Numbers</span>
                                  </div>
                                  <p className="text-[12.5px] font-semibold text-slate-700 leading-relaxed">{profile.numbers}</p>
                                </div>
                              </div>

                              <div className="flex flex-col gap-2.5 p-6 bg-slate-900 text-white rounded-3xl relative overflow-hidden shadow-md">
                                <div className="absolute top-0 right-0 w-[200px] h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
                                <div className="flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4 text-purple-400" />
                                  <span className="text-[11px] font-black uppercase tracking-[0.15em] text-purple-300">DFW Target Sentiment</span>
                                </div>
                                <h4 className="text-[14px] font-black tracking-tight text-white">Qualitative ICP/Patient Sentiment</h4>
                                <p className="text-[13px] font-medium text-slate-300 leading-relaxed">{profile.caseStudy}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })
                ) : (
                  <div className="text-center py-12 bg-white/50 border border-white/60 rounded-3xl">
                    <p className="text-[13px] font-bold text-slate-400">No strategy profiles match your search criteria.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Unlocked Email Templates rendering */
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                <div className="px-4 py-2 bg-slate-900 text-white rounded-2xl text-xs font-black tracking-tight w-fit">
                  {activeMainTab === "b2b_emails" ? "B2B Outbound Campaigns (10 Referral Verticals)" : "B2C Direct Outreach (10 Patient Cohorts)"}
                </div>
                <div className="relative max-w-sm w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/60 border border-white/80 rounded-xl pl-10 pr-4 py-2.5 text-[13px] font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-300 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {filteredEmailProfiles.length > 0 ? (
                  filteredEmailProfiles.map((profile, index) => {
                    const isExpanded = !collapsedIds.includes(profile.id)
                    const IconComponent = profile.icon
                    return (
                      <motion.div
                        key={profile.id}
                        layout="position"
                        className="bg-white/70 backdrop-blur-xl border border-white/65 rounded-[2rem] p-6 md:p-8 shadow-sm flex flex-col gap-4 relative overflow-hidden transition-all duration-300"
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                                Channel {index + 1} -- {profile.tag}
                              </span>
                              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                                {profile.title}
                              </h3>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleExpand(profile.id)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors self-start md:self-center"
                          >
                            <span>{isExpanded ? "Hide Outreach Templates" : "Reveal Outreach Templates"}</span>
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Summary of logic */}
                        <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Campaign Angle</span>
                            <p className="text-[12.5px] font-medium text-slate-600 leading-normal">{profile.angle}</p>
                          </div>
                          <div className="flex-1">
                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Patient/ICP Value Proposition</span>
                            <p className="text-[12.5px] font-semibold text-slate-700 leading-normal">{profile.valueProp}</p>
                          </div>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden mt-2 pt-6 border-t border-slate-100 flex flex-col gap-6"
                            >
                              <div className="grid grid-cols-1 gap-6">
                                {profile.emails?.map((email, idx) => (
                                  <EmailCard key={idx} email={email} />
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })
                ) : (
                  <div className="text-center py-12 bg-white/50 border border-white/60 rounded-3xl">
                    <p className="text-[13px] font-bold text-slate-400">No matching templates found.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function EmailCard({ email }: { email: { iteration: string; subject: string; body: string } }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${email.subject}\n\n${email.body}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-slate-50/80 border border-slate-100 rounded-3xl p-6 flex flex-col gap-4 shadow-sm hover:border-slate-200 transition-all duration-300">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-black uppercase tracking-[0.1em] text-purple-600">
          {email.iteration}
        </span>
        <button
          onClick={handleCopy}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-sm border ${
            copied 
              ? "bg-emerald-500 border-emerald-500 text-white" 
              : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
          }`}
        >
          {copied ? (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              Copied!
            </>
          ) : (
            <>
              <MessageSquare className="w-3.5 h-3.5 text-slate-600" />
              Copy Template
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 p-3 bg-white border border-slate-100 rounded-xl">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0">Subject:</span>
          <p className="text-[13px] font-bold text-slate-800">{email.subject}</p>
        </div>
        <div className="p-4 bg-white border border-slate-100 rounded-2xl relative">
          <pre className="text-[12.5px] font-semibold text-slate-700 leading-relaxed font-sans whitespace-pre-wrap">
            {email.body}
          </pre>
        </div>
      </div>
    </div>
  )
}
