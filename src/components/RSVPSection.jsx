import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { assets } from '../data/content.js'
import { EASE, fadeUp, inViewOnce, stagger } from '../lib/motion.js'
import Section from './Section.jsx'
import { ArrowRight, Check } from './Icons.jsx'

/**
 * Input dengan garis bawah yang melebar dari tengah saat difokus — pengganti
 * kotak fokus bawaan browser yang terasa terlalu kaku untuk tema ini.
 */
function Field({ label, children, htmlFor }) {
  return (
    <motion.div variants={fadeUp} className="group relative">
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-sky-800">
        {label}
      </label>
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-px mx-auto h-0.5 w-0 origin-center rounded-full bg-sky-500 transition-all duration-400 group-focus-within:w-full"
      />
    </motion.div>
  )
}

const inputClass =
  'w-full rounded-xl border border-sky-200 bg-white/80 px-4 py-2.5 text-sm text-sky-900 ' +
  'placeholder:text-sky-400 outline-none transition-colors focus:border-sky-400'

/** Kelopak kecil yang berhamburan pelan setelah konfirmasi terkirim. */
function Petals() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute top-1/2 left-1/2 size-2 rounded-full bg-sky-300"
          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: Math.cos((i / 14) * Math.PI * 2) * (70 + (i % 4) * 22),
            y: Math.sin((i / 14) * Math.PI * 2) * (70 + (i % 3) * 20),
            scale: [0, 1, 0.4],
          }}
          transition={{ duration: 1.5, delay: 0.15 + i * 0.03, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

export default function RSVPSection({ onWish }) {
  const id = useId()
  const [sent, setSent] = useState(null)
  const [form, setForm] = useState({
    name: '',
    attendance: '',
    guests: '',
    message: '',
  })

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()

    // Pesan yang diisi tamu langsung ikut tampil di bagian Ucapan & Doa.
    if (form.message.trim() && form.name.trim()) {
      onWish?.({ name: form.name, message: form.message })
    }

    setSent({ ...form })
  }

  return (
    <Section id="rsvp" title="Konfirmasi Kehadiran" eyebrow="Kehadiran Anda Sangat Berarti">
      <img
        src={assets.floral.cornerA}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -top-4 -right-6 -z-10 w-32 opacity-40"
      />

      <AnimatePresence mode="wait">
        {sent ? (
          /* --- Setelah terkirim ------------------------------------------- */
          <motion.div
            key="done"
            className="glass-card relative overflow-hidden rounded-3xl px-6 py-10 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Petals />

            {/* Ceklis digambar, bukan sekadar muncul. */}
            <motion.svg
              viewBox="0 0 24 24"
              className="relative mx-auto size-16 text-sky-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <motion.circle
                cx="12"
                cy="12"
                r="10"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
              <motion.path
                d="m7.5 12.4 3.2 3.2 6-6.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6, duration: 0.5, ease: 'easeInOut' }}
              />
            </motion.svg>

            <h3 className="relative mt-5 font-serif text-2xl text-sky-900">
              Terima kasih, {sent.name || 'Sahabat'}!
            </h3>
            <p className="relative mt-2 text-sm leading-relaxed text-sky-700">
              {sent.attendance === 'tidak'
                ? 'Kami mengerti. Terima kasih atas doa dan restunya.'
                : 'Konfirmasi Anda sudah kami catat. Sampai jumpa di hari bahagia!'}
            </p>

            <button
              type="button"
              onClick={() => setSent(null)}
              className="relative mt-6 text-xs tracking-wide text-sky-600 underline underline-offset-4 transition-colors hover:text-sky-800"
            >
              Ubah konfirmasi
            </button>
          </motion.div>
        ) : (
          /* --- Formulir ---------------------------------------------------- */
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="glass-card relative space-y-5 rounded-3xl p-6"
            variants={stagger(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            exit={{ opacity: 0 }}
          >
            <Field label="Nama Lengkap" htmlFor={`${id}-name`}>
              <input
                id={`${id}-name`}
                type="text"
                required
                value={form.name}
                onChange={set('name')}
                placeholder="Nama Anda"
                autoComplete="name"
                className={inputClass}
              />
            </Field>

            <Field label="Konfirmasi Kehadiran" htmlFor={`${id}-attendance`}>
              <select
                id={`${id}-attendance`}
                required
                value={form.attendance}
                onChange={set('attendance')}
                className={`${inputClass} appearance-none pr-10`}
                /* Panah bawaan browser sangat berbeda antar sistem, jadi
                   diganti satu ikon SVG yang sama di mana-mana. */
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%237fafd1' stroke-width='1.6' stroke-linecap='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E\")",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1rem',
                }}
              >
                <option value="" disabled>
                  Pilih ...
                </option>
                <option value="hadir">Ya, saya akan hadir</option>
                <option value="ragu">Masih ragu</option>
                <option value="tidak">Maaf, tidak bisa hadir</option>
              </select>
            </Field>

            {/* Jumlah tamu tidak relevan kalau berhalangan hadir. */}
            <AnimatePresence initial={false}>
              {form.attendance !== 'tidak' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <Field label="Jumlah Tamu" htmlFor={`${id}-guests`}>
                    <input
                      id={`${id}-guests`}
                      type="number"
                      min="1"
                      max="10"
                      value={form.guests}
                      onChange={set('guests')}
                      placeholder="Contoh: 2"
                      className={inputClass}
                    />
                  </Field>
                </motion.div>
              )}
            </AnimatePresence>

            <Field label="Pesan untuk Kami (Opsional)" htmlFor={`${id}-message`}>
              <textarea
                id={`${id}-message`}
                rows={3}
                value={form.message}
                onChange={set('message')}
                placeholder="Tulis pesan ..."
                className={`${inputClass} resize-none`}
              />
              <p className="mt-1.5 text-[0.6875rem] text-sky-500">
                Pesan Anda akan tampil di bagian Ucapan &amp; Doa.
              </p>
            </Field>

            <motion.button
              variants={fadeUp}
              type="submit"
              whileHover={{ y: -3, boxShadow: 'var(--shadow-lift)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="group mx-auto flex items-center gap-2.5 rounded-full bg-sky-600 px-7 py-3 text-sm font-medium text-white shadow-[var(--shadow-soft)]"
            >
              Kirim Konfirmasi
              <span className="grid size-6 place-items-center rounded-full bg-white/25 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={14} />
              </span>
            </motion.button>

            <p className="flex items-center justify-center gap-1.5 text-center text-[0.6875rem] text-sky-500">
              <Check size={13} />
              Konfirmasi tersimpan di perangkat Anda sendiri.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </Section>
  )
}
