import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  CalendarClock,
  CircleCheck,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react'

const clinic = {
  doctor: 'Dr. K.G. Varshney',
  qualifications: 'MBBS, MD (Medicine), KGMC Lucknow',
  role: 'Consultant Physician',
  clinicName: 'Varshney Clinic',
  addressLine1: '11/23, Sector-3, Rajender Nagar (Near Mother Dairy)',
  addressLine2: 'Sahibabad, Ghaziabad 201005',
  timings: '10:00 AM - 12:00 PM, Tuesday to Friday',
  appointmentNote: 'Saturday/Sunday by appointment, Monday closed',
  phone: '9810590125',
  email: 'drvarshney123@gmail.com',
  mapLink: 'https://share.google/y0K5zmMxFC3L2zSBn',
  registration: 'MCI Reg No. 22918',
}

const highlights = [
  'Training in Hematology, Endocrinology and Metabolism at AIIMS, New Delhi',
  'Renal Replacement Therapy at Prince Salman Hospital, Riyadh',
  'Certificate course in Infectious Diseases, PD Hinduja Hospital, Mumbai',
  'Former CMO at Hindu Rao Hospital and former Additional MS at Kasturba Hospital, Delhi',
]

const animation = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.55, ease: 'easeOut' },
}

const MotionHeader = motion.header
const MotionSection = motion.section
const MotionDiv = motion.div
const MotionArticle = motion.article

function App() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [imageAvailable, setImageAvailable] = useState(true)

  const isValid = useMemo(() => {
    return form.name.trim() && form.phone.trim() && form.message.trim()
  }, [form])

  const submitViaMail = (e) => {
    e.preventDefault()
    if (!isValid) return

    const subject = encodeURIComponent(`Consultation request from ${form.name}`)
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        `Email: ${form.email || 'Not provided'}`,
        '',
        'Message:',
        form.message,
      ].join('\n'),
    )

    window.location.href = `mailto:${clinic.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6 lg:px-8">
      <MotionHeader
        {...animation}
        className="glass sticky top-4 z-30 mb-8 rounded-2xl border border-white/60 px-4 py-3 shadow-[0_8px_32px_rgba(15,23,42,0.06)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="brand-font text-sm font-bold uppercase tracking-[0.18em] text-[#0b3b89]">
              {clinic.clinicName}
            </p>
            <h1 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">{clinic.doctor}</h1>
          </div>
          <a
            href={`tel:${clinic.phone}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#0b3b89] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0a3276]"
          >
            <Phone size={16} /> Call Now
          </a>
        </div>
      </MotionHeader>

      <main className="space-y-9">
        <section className="grid gap-6 lg:grid-cols-[1.12fr,0.88fr] lg:items-stretch">
          <MotionDiv
            {...animation}
            className="glass rounded-3xl border border-white/70 p-6 shadow-[0_14px_45px_rgba(15,23,42,0.08)] sm:p-8"
          >
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#0b3b89]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#0b3b89]">
              <Stethoscope size={14} /> Trusted Internal Medicine Care
            </p>
            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Evidence-based care with decades of clinical and academic experience.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-700 sm:text-base">
              Personalized consultation for fever, infections, diabetes, thyroid disorders, blood pressure,
              and long-term adult medical management in a calm neighborhood clinic setting.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">Timings</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{clinic.timings}</p>
                <p className="mt-1 text-xs text-slate-600">{clinic.appointmentNote}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">Location</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{clinic.addressLine1}</p>
                <p className="text-xs text-slate-600">{clinic.addressLine2}</p>
              </div>
            </div>
          </MotionDiv>

          <MotionDiv
            {...animation}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="hero-image-shell floating min-h-[320px] border border-white/70 shadow-[0_20px_40px_rgba(2,6,23,0.16)]"
          >
            {imageAvailable ? (
              <img
                src="/clinic-exterior.jpg"
                alt="Varshney Clinic Exterior"
                className="h-100 w-full object-cover"
                onError={() => setImageAvailable(false)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 p-8 text-center">
                <div>
                  <p className="brand-font text-xl font-extrabold text-slate-800">Clinic Exterior Photo</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Add your image as <code>public/clinic-exterior.jpg</code>
                  </p>
                </div>
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/88 p-3 text-sm shadow-md backdrop-blur">
              <p className="font-bold text-slate-900">Now available at {clinic.clinicName}</p>
              <p className="text-slate-700">{clinic.addressLine2}</p>
            </div>
          </MotionDiv>
        </section>

        <MotionSection
          {...animation}
          className="grid gap-4 md:grid-cols-3"
        >
          <a
            href={`tel:${clinic.phone}`}
            className="glass rounded-2xl border border-white/70 p-5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Phone className="text-[#0b3b89]" size={20} />
            <h3 className="mt-2 font-bold text-slate-900">Call Clinic</h3>
            <p className="text-sm text-slate-700">+91 {clinic.phone}</p>
          </a>
          <a
            href={`mailto:${clinic.email}`}
            className="glass rounded-2xl border border-white/70 p-5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Mail className="text-[#0b3b89]" size={20} />
            <h3 className="mt-2 font-bold text-slate-900">Email</h3>
            <p className="break-all text-sm text-slate-700">{clinic.email}</p>
          </a>
          <a
            href={clinic.mapLink}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-2xl border border-white/70 p-5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <MapPin className="text-[#0b3b89]" size={20} />
            <h3 className="mt-2 font-bold text-slate-900">Open Maps</h3>
            <p className="text-sm text-slate-700">Navigate to clinic location</p>
          </a>
        </MotionSection>

        <section className="grid gap-6 lg:grid-cols-2">
          <MotionArticle
            {...animation}
            className="glass rounded-3xl border border-white/70 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.08)]"
          >
            <h3 className="text-2xl font-extrabold text-slate-900">Doctor Profile</h3>
            <p className="mt-3 text-slate-700">
              <span className="font-semibold">{clinic.doctor}</span> - {clinic.qualifications}
            </p>
            <p className="text-slate-700">{clinic.role}</p>
            <p className="mt-1 text-slate-700">{clinic.registration}</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Retired Professor, Teerthanker Mahaveer Medical College, Moradabad.
            </p>
          </MotionArticle>

          <MotionArticle
            {...animation}
            transition={{ delay: 0.08, duration: 0.55 }}
            className="glass rounded-3xl border border-white/70 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.08)]"
          >
            <h3 className="text-2xl font-extrabold text-slate-900">Attainments & Experience</h3>
            <ul className="mt-4 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                  <CircleCheck className="mt-0.5 shrink-0 text-emerald-600" size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </MotionArticle>
        </section>

        <MotionSection
          {...animation}
          className="grid gap-6 rounded-3xl bg-gradient-to-r from-[#0b3b89] to-[#1f4fb4] p-6 text-white shadow-[0_16px_45px_rgba(11,59,137,0.35)] sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <CalendarClock size={19} />
              <p className="mt-2 text-sm font-semibold">Flexible Appointments</p>
              <p className="text-xs text-blue-100">Weekend slots by appointment</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <ShieldCheck size={19} />
              <p className="mt-2 text-sm font-semibold">Patient-First Consults</p>
              <p className="text-xs text-blue-100">Care focused on clear diagnosis</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <MapPin size={19} />
              <p className="mt-2 text-sm font-semibold">Easy Local Access</p>
              <p className="text-xs text-blue-100">Rajender Nagar, Sahibabad</p>
            </div>
          </div>
        </MotionSection>

        <MotionSection
          {...animation}
          id="contact"
          className="glass rounded-3xl border border-white/70 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.08)] sm:p-8"
        >
          <h3 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Contact Us</h3>
          <p className="mt-2 text-sm text-slate-600">
            Fill this form and it will open your email with all details pre-filled to send directly to the clinic.
          </p>

          <form onSubmit={submitViaMail} className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Full Name *
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none transition focus:border-[#0b3b89] focus:ring-2 focus:ring-[#0b3b89]/20"
              />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Phone Number *
              <input
                required
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none transition focus:border-[#0b3b89] focus:ring-2 focus:ring-[#0b3b89]/20"
              />
            </label>
            <label className="text-sm font-medium text-slate-700 md:col-span-2">
              Email (optional)
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none transition focus:border-[#0b3b89] focus:ring-2 focus:ring-[#0b3b89]/20"
              />
            </label>
            <label className="text-sm font-medium text-slate-700 md:col-span-2">
              Message *
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none transition focus:border-[#0b3b89] focus:ring-2 focus:ring-[#0b3b89]/20"
              />
            </label>
            <div className="md:col-span-2 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={!isValid}
                className="rounded-full bg-[#0b3b89] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0a3276] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send Enquiry
              </button>
              <a
                href={`tel:${clinic.phone}`}
                className="rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Call Instead
              </a>
            </div>
          </form>
        </MotionSection>
      </main>
    </div>
  )
}

export default App
